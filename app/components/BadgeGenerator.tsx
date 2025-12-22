'use client';

interface BadgeGeneratorProps {
  appName: string;
  stack: string;
  score: number;
  total: number;
  percentage: number;
}

export function BadgeGenerator({ appName, stack, score, total, percentage }: BadgeGeneratorProps) {
  const getGradeColor = (percentage: number): string => {
    if (percentage >= 90) return '#10b981'; // green
    if (percentage >= 75) return '#3b82f6'; // blue
    if (percentage >= 60) return '#f59e0b'; // amber
    if (percentage >= 40) return '#f97316'; // orange
    return '#ef4444'; // red
  };

  const getGradeLabel = (percentage: number): string => {
    if (percentage >= 90) return 'EXCELLENT';
    if (percentage >= 75) return 'GREAT';
    if (percentage >= 60) return 'GOOD';
    if (percentage >= 40) return 'FAIR';
    return 'NEEDS WORK';
  };

  const gradeColor = getGradeColor(percentage);
  const gradeLabel = getGradeLabel(percentage);

  const generateSVG = () => {
    // Truncate long names
    const displayName = appName.length > 25 ? appName.substring(0, 22) + '...' : appName;
    const displayStack = stack.length > 30 ? stack.substring(0, 27) + '...' : stack;

    return `<svg width="500" height="300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
    <filter id="shadow">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="500" height="300" fill="url(#bgGradient)" rx="15"/>

  <!-- Decorative circles -->
  <circle cx="450" cy="50" r="60" fill="white" opacity="0.1"/>
  <circle cx="50" cy="250" r="40" fill="white" opacity="0.1"/>
  <circle cx="420" cy="270" r="30" fill="white" opacity="0.15"/>

  <!-- Content container -->
  <rect x="20" y="20" width="460" height="260" fill="white" rx="10" opacity="0.95"/>

  <!-- Header -->
  <text x="250" y="50" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="#1f2937">
    12 FACTOR APP CERTIFIED
  </text>

  <!-- Score Circle -->
  <circle cx="250" cy="130" r="50" fill="${gradeColor}" filter="url(#shadow)"/>
  <text x="250" y="125" font-family="Arial, sans-serif" font-size="32" font-weight="bold" text-anchor="middle" fill="white">
    ${percentage}%
  </text>
  <text x="250" y="145" font-family="Arial, sans-serif" font-size="12" text-anchor="middle" fill="white">
    ${score}/${total}
  </text>

  <!-- Grade Label -->
  <text x="250" y="200" font-family="Arial, sans-serif" font-size="18" font-weight="bold" text-anchor="middle" fill="${gradeColor}">
    ${gradeLabel}
  </text>

  <!-- App Name -->
  <text x="250" y="230" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="#374151">
    ${displayName}
  </text>

  <!-- Stack -->
  <text x="250" y="250" font-family="Arial, sans-serif" font-size="12" text-anchor="middle" fill="#6b7280">
    ${displayStack}
  </text>

  <!-- Footer -->
  <text x="250" y="275" font-family="Arial, sans-serif" font-size="10" text-anchor="middle" fill="#9ca3af">
    Generated at 12factor-checklist
  </text>
</svg>`;
  };

  const downloadBadge = () => {
    const svg = generateSVG();
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${appName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_12factor_badge.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const copyBadgeMarkdown = () => {
    const markdown = `![12 Factor App Score](data:image/svg+xml;base64,${btoa(generateSVG())})`;
    navigator.clipboard.writeText(markdown);
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        Your Badge
      </h2>

      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-4">
        <div
          className="flex justify-center mb-4"
          dangerouslySetInnerHTML={{ __html: generateSVG() }}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={downloadBadge}
          className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Badge
        </button>
        <button
          onClick={copyBadgeMarkdown}
          className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy Markdown
        </button>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
        Download your badge or copy the markdown to showcase your 12 Factor App compliance!
      </p>
    </div>
  );
}
