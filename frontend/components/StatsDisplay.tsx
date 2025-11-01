"use client";

import { useState, useEffect } from "react";
import { useEncryptedAgeGate } from "../hooks/useEncryptedAgeGate";

export function StatsDisplay() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getEncryptedStats } = useEncryptedAgeGate();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setIsLoading(true);
      const statsData = await getEncryptedStats();
      setStats(statsData);
    } catch (error) {
      console.error("Failed to load stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatEncryptedValue = (value: any) => {
    // In a real implementation, this would decrypt the value
    // For demo purposes, we'll show placeholder text
    return "[Encrypted]";
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading encrypted statistics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
        Encrypted Statistics
      </h2>

      {stats ? (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Users</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {formatEncryptedValue(stats.totalUsers)}
                  </p>
                </div>
                <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path>
                </svg>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Average Age</p>
                  <p className="text-2xl font-bold text-green-900">
                    {formatEncryptedValue(stats.averageAge)}
                  </p>
                </div>
                <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Minimum Age</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {formatEncryptedValue(stats.minAge)}
                  </p>
                </div>
                <svg className="w-8 h-8 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">Maximum Age</p>
                  <p className="text-2xl font-bold text-orange-900">
                    {formatEncryptedValue(stats.maxAge)}
                  </p>
                </div>
                <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
              </svg>
              <div>
                <h3 className="text-sm font-medium text-yellow-800 mb-1">Privacy-First Analytics</h3>
                <p className="text-sm text-yellow-700">
                  All statistics shown above are computed directly on encrypted data using Fully Homomorphic Encryption.
                  Individual user data remains completely private while allowing aggregate analysis.
                </p>
              </div>
            </div>
          </div>

          {/* Refresh Button */}
          <div className="text-center">
            <button
              onClick={loadStats}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center mx-auto"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"></path>
              </svg>
              Refresh Statistics
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <p>Unable to load statistics. Please try again later.</p>
        </div>
      )}
    </div>
  );
}
