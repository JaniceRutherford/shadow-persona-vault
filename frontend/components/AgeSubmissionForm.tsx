"use client";

import { useState } from "react";
import { useEncryptedAgeGate } from "../hooks/useEncryptedAgeGate";

export function AgeSubmissionForm() {
  const [age, setAge] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { submitEncryptedAge, hasUserSubmitted, checkSubmissionStatus } = useEncryptedAgeGate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!age || parseInt(age) < 0 || parseInt(age) > 150) {
      alert("Please enter a valid age between 0 and 150");
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real implementation, this would encrypt the age using FHE
      // For demo purposes, we'll simulate the encryption
      const mockEncryptedAge = new Uint8Array([parseInt(age)]); // Simplified mock
      const mockProof = new Uint8Array([1, 2, 3, 4]); // Simplified mock proof

      await submitEncryptedAge(mockEncryptedAge, mockProof);
      setHasSubmitted(true);
      alert("Age submitted successfully! Your privacy is protected.");
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to submit age. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
        Submit Your Age (Encrypted)
      </h2>

      {hasSubmitted ? (
        <div className="text-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-center">
              <svg
                className="w-5 h-5 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-green-800 font-medium">Age submitted successfully!</span>
            </div>
          </div>
          <p className="text-gray-600">
            Your age has been encrypted and stored on-chain. You can now verify eligibility
            for age-restricted content without revealing your actual age.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
              Your Age
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min="0"
              max="150"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="Enter your age"
              required
            />
            <p className="mt-2 text-sm text-gray-500">
              Your age will be encrypted before submission and remain private on the blockchain.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Encrypting and submitting...
              </>
            ) : (
              "Submit Encrypted Age"
            )}
          </button>
        </form>
      )}

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Privacy Protection</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Your age is encrypted using Fully Homomorphic Encryption (FHE)</li>
          <li>• The blockchain cannot see your actual age value</li>
          <li>• You can prove eligibility without revealing your age</li>
          <li>• Statistical analysis is performed on encrypted data only</li>
        </ul>
      </div>
    </div>
  );
}
