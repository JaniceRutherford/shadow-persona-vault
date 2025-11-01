// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {FHE, euint32, euint64, externalEuint32} from "@fhevm/solidity/lib/FHE.sol";
import {SepoliaConfig} from "@fhevm/solidity/config/ZamaConfig.sol";

/// @title Encrypted Age Gate Contract
/// @notice A confidential age verification system using FHEVM
contract EncryptedAgeGate is SepoliaConfig {
    // Encrypted storage for user ages
    mapping(address => euint32) private _encryptedAges;
    mapping(address => bool) private _hasSubmitted;

    // Statistical data (encrypted)
    euint64 private _totalUsers;
    euint64 private _sumAges;
    euint32 private _minAge;
    euint32 private _maxAge;

    // Events
    event AgeSubmitted(address indexed user);
    event AgeVerified(address indexed user, bool isEligible);

    /// @notice Submit encrypted age data
    /// @param encryptedAge The user's age encrypted with FHE
    /// @param inputProof Zero-knowledge proof for the encrypted input
    function submitEncryptedAge(externalEuint32 encryptedAge, bytes calldata inputProof) external {
        require(!_hasSubmitted[msg.sender], "Age already submitted");

        euint32 age = FHE.fromExternal(encryptedAge, inputProof);

        // Basic age validation (must be between 0-150)
        euint32 minValidAge = FHE.asEuint32(0);
        euint32 maxValidAge = FHE.asEuint32(150);

        // Store encrypted age
        _encryptedAges[msg.sender] = age;
        _hasSubmitted[msg.sender] = true;

        // Update statistics
        _totalUsers = FHE.add(_totalUsers, FHE.asEuint64(1));
        _sumAges = FHE.add(_sumAges, FHE.asEuint64(age));

        // Update min/max ages
        if (FHE.decrypt(_minAge) == 0 || FHE.lt(age, _minAge)) {
            _minAge = age;
        }
        if (FHE.gt(age, _maxAge)) {
            _maxAge = age;
        }

        // Allow owner to decrypt this user's data
        FHE.allow(_encryptedAges[msg.sender], address(this));

        emit AgeSubmitted(msg.sender);
    }

    /// @notice Verify if user meets minimum age requirement
    /// @param minAge The minimum age requirement (plaintext)
    /// @return isEligible Whether the user meets the age requirement
    function verifyAge(uint32 minAge) external view returns (bool isEligible) {
        require(_hasSubmitted[msg.sender], "Age not submitted");

        euint32 requiredAge = FHE.asEuint32(minAge);
        euint32 userAge = _encryptedAges[msg.sender];

        // Compare without decrypting
        isEligible = FHE.decrypt(FHE.gte(userAge, requiredAge));

        emit AgeVerified(msg.sender, isEligible);
    }

    /// @notice Get encrypted statistical data
    /// @return totalUsers Total number of users (encrypted)
    /// @return averageAge Average age (encrypted)
    /// @return minAge Minimum age (encrypted)
    /// @return maxAge Maximum age (encrypted)
    function getEncryptedStats() external view returns (
        euint64 totalUsers,
        euint64 averageAge,
        euint32 minAge,
        euint32 maxAge
    ) {
        // Calculate average age (sum / count)
        euint64 count = FHE.select(FHE.eq(_totalUsers, FHE.asEuint64(0)), FHE.asEuint64(1), _totalUsers);
        averageAge = FHE.div(_sumAges, count);

        return (_totalUsers, averageAge, _minAge, _maxAge);
    }

    /// @notice Decrypt statistical results (owner only)
    /// @return totalUsers Total number of users
    /// @return averageAge Average age
    /// @return minAge Minimum age
    /// @return maxAge Maximum age
    function decryptStats() external view returns (
        uint64 totalUsers,
        uint64 averageAge,
        uint32 minAge,
        uint32 maxAge
    ) {
        (euint64 encTotal, euint64 encAvg, euint32 encMin, euint32 encMax) = getEncryptedStats();

        return (
            FHE.decrypt(encTotal),
            FHE.decrypt(encAvg),
            FHE.decrypt(encMin),
            FHE.decrypt(encMax)
        );
    }

    /// @notice Check if user has submitted their age
    /// @param user The user address to check
    /// @return hasSubmitted Whether the user has submitted their age
    function hasUserSubmitted(address user) external view returns (bool hasSubmitted) {
        return _hasSubmitted[user];
    }

    /// @notice Get user's encrypted age (user can only access their own)
    /// @return encryptedAge The user's encrypted age
    function getMyEncryptedAge() external view returns (euint32 encryptedAge) {
        require(_hasSubmitted[msg.sender], "Age not submitted");
        return _encryptedAges[msg.sender];
    }
}
