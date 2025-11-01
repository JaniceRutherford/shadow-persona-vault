"use client";

import { useState } from "react";
import { AgeSubmissionForm } from "../components/AgeSubmissionForm";
import { StatsDisplay } from "../components/StatsDisplay";
import { useFHEVM } from "../hooks/useFHEVM";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"submit" | "stats">("submit");
  const { isConnected, connectWallet } = useFHEVM();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Shadow Persona Vault
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Confidential age verification powered by FHEVM. Submit your age privately
            and verify eligibility without revealing sensitive information.
          </p>
        </div>

        {/* Wallet Connection */}
        {!isConnected && (
          <div className="text-center mb-8">
            <button
              onClick={connectWallet}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Connect Wallet
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        {isConnected && (
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-1">
              <button
                onClick={() => setActiveTab("submit")}
                className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
                  activeTab === "submit"
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Submit Age
              </button>
              <button
                onClick={() => setActiveTab("stats")}
                className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
                  activeTab === "stats"
                    ? "bg-indigo-600 text-white"
                    : "text-gray-900"
                }`}
              >
                View Statistics
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        {isConnected && (
          <div className="max-w-2xl mx-auto">
            {activeTab === "submit" ? <AgeSubmissionForm /> : <StatsDisplay />}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Built with FHEVM • Privacy-preserving age verification</p>
        </div>
      </div>
    </div>
  );
}
