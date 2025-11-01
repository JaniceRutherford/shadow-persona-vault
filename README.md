# Shadow Persona Vault

A confidential persona verification system built with FHEVM (Fully Homomorphic Encryption Virtual Machine) that enables age verification while maintaining privacy.

## 🚀 Live Demo

**Vercel Deployment**: https://pro10-five.vercel.app/

## 📹 Demo Video

[View Demo Video](private.mp4)

## 🏗️ Architecture

This project implements an encrypted age gate system where:
- Users can submit their age in encrypted form
- Age verification happens on-chain without revealing the actual age
- Statistical analysis can be performed on aggregated encrypted data
- All operations maintain privacy through FHEVM encryption

## 📋 Features

- **Encrypted Age Submission**: Submit age data that remains encrypted on-chain
- **Privacy-Preserving Verification**: Verify age thresholds without decrypting sensitive data
- **Statistical Aggregation**: Compute statistics on encrypted data
- **Secure Frontend**: React/Next.js interface with MetaMask integration

## 🛠️ Tech Stack

- **Smart Contracts**: Solidity with FHEVM
- **Frontend**: Next.js, React, TypeScript
- **Encryption**: Zama FHEVM
- **Testing**: Hardhat, Chai
- **Deployment**: Hardhat, Vercel

## 📄 Smart Contracts

### EncryptedAgeGate Contract

**Testnet Deployment (Sepolia)**:
- **Contract Address**: `0xefcb07c83Fd14eDA3a2134110Fc3Fe689636b1B2`
- **Network**: Ethereum Sepolia Testnet

**Key Functions**:
- `submitEncryptedAge()`: Submit encrypted age data
- `verifyAge()`: Verify if age meets minimum requirements
- `getEncryptedStats()`: Retrieve encrypted statistical data
- `decryptStats()`: Decrypt statistical results (authorized users only)

## 🔧 Setup & Installation

### Prerequisites
- Node.js >= 18
- npm or yarn
- MetaMask wallet

### Installation
```bash
# Install dependencies
npm install

# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Start local development
npm run dev
```

### Deployment
```bash
# Deploy to Sepolia testnet
npx hardhat run scripts/deploy.ts --network sepolia

# Deploy frontend to Vercel
npm run build
npm run start
```

## 🔒 Security Features

- **Fully Homomorphic Encryption**: Data remains encrypted during computation
- **Zero-Knowledge Proofs**: Age verification without revealing actual values
- **Access Control**: Granular permissions for decryption operations
- **Audit Trail**: Transparent transaction history on blockchain

## 📊 Usage

1. **Connect Wallet**: Connect your MetaMask wallet to the application
2. **Submit Age**: Enter your age (encrypted client-side)
3. **Verify Access**: System verifies eligibility without exposing your age
4. **View Statistics**: Authorized users can view aggregated statistics

## 🤝 Contributing

This project uses collaborative development practices with conventional commits.

### Commit Convention
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation updates
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

## 📚 Documentation

For more information about FHEVM and homomorphic encryption:
- [FHEVM Documentation](https://docs.zama.ai/fhevm)
- [Zama Developer Portal](https://docs.zama.ai/)
- [Solidity FHE Library](https://docs.zama.ai/fhevm/fhe-library)

## 📄 License

MIT License - see LICENSE file for details.
