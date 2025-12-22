'use client';

import { useState } from 'react';
import { ChecklistItem } from './components/ChecklistItem';
import { BadgeGenerator } from './components/BadgeGenerator';
import { twelveFactor } from './data/twelve-factor';

export default function Home() {
  const [appName, setAppName] = useState('');
  const [stack, setStack] = useState('');
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const handleCheckToggle = (index: number) => {
    setCheckedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const score = Object.values(checkedItems).filter(Boolean).length;
  const totalItems = twelveFactor.length;
  const percentage = totalItems > 0 ? Math.round((score / totalItems) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            12 Factor App Checklist
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Evaluate your application against the twelve-factor methodology
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 mb-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Application Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  App Name
                </label>
                <input
                  type="text"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  placeholder="My Awesome App"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tech Stack
                </label>
                <input
                  type="text"
                  value={stack}
                  onChange={(e) => setStack(e.target.value)}
                  placeholder="Node.js, React, PostgreSQL"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Checklist
              </h2>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {score}/{totalItems}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {percentage}% Complete
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {twelveFactor.map((item, index) => (
                <ChecklistItem
                  key={index}
                  factor={item}
                  isChecked={checkedItems[index] || false}
                  onToggle={() => handleCheckToggle(index)}
                />
              ))}
            </div>
          </div>

          <BadgeGenerator
            appName={appName || 'Your App'}
            stack={stack || 'Your Stack'}
            score={score}
            total={totalItems}
            percentage={percentage}
          />
        </div>

        <footer className="text-center text-gray-600 dark:text-gray-400 mt-8">
          <p>
            Based on{' '}
            <a
              href="https://12factor.net"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              The Twelve-Factor App
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
