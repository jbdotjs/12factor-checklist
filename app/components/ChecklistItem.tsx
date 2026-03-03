'use client';

import { useState } from 'react';
import { Factor } from '../data/twelve-factor';

interface ChecklistItemProps {
  factor: Factor;
  isChecked: boolean;
  onToggle: () => void;
}

export function ChecklistItem({ factor, isChecked, onToggle }: ChecklistItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all hover:shadow-md">
      <div className="flex items-start p-4 bg-white dark:bg-gray-800">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onToggle}
          className="mt-1 h-5 w-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
        />
        <div className="ml-4 flex-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {factor.number}. {factor.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {factor.description}
              </p>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-4 text-emerald-600 dark:text-emerald-400 hover:text-amber-600 dark:hover:text-amber-400 text-sm font-medium"
            >
              {isExpanded ? 'Hide' : 'Show'} Examples
            </button>
          </div>
          {isExpanded && (
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sub-factor examples:
                </p>
                <ul className="list-disc list-inside space-y-1 marker:text-emerald-500">
                {factor.examples.map((example, idx) => (
                  <li key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
