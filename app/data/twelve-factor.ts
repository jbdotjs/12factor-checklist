export interface Factor {
  number: number;
  title: string;
  description: string;
  examples: string[];
}

export const twelveFactor: Factor[] = [
  {
    number: 1,
    title: 'Codebase',
    description: 'One codebase tracked in revision control, many deploys',
    examples: [
      'Single Git repository for the app',
      'Multiple environments (dev, staging, prod) from same codebase',
      'No code duplication across environments',
      'Example: deploy the same main branch commit SHA to staging and production'
    ]
  },
  {
    number: 2,
    title: 'Dependencies',
    description: 'Explicitly declare and isolate dependencies',
    examples: [
      'package.json, requirements.txt, or Gemfile present',
      'No reliance on system-wide packages',
      'Dependency isolation (virtual environments, containers)',
      'Example: pin versions in package-lock.json and install with npm ci'
    ]
  },
  {
    number: 3,
    title: 'Config',
    description: 'Store config in the environment',
    examples: [
      'Environment variables for configuration',
      'No hardcoded credentials or API keys',
      'Config varies between environments',
      'Example: use DATABASE_URL and API_KEY from env vars in every environment'
    ]
  },
  {
    number: 4,
    title: 'Backing Services',
    description: 'Treat backing services as attached resources',
    examples: [
      'Database, cache, message queue treated as resources',
      'Can swap services via config without code changes',
      'Services accessed via URLs or credentials in environment',
      'Example: switch from local Redis to hosted Redis by changing REDIS_URL'
    ]
  },
  {
    number: 5,
    title: 'Build, Release, Run',
    description: 'Strictly separate build and run stages',
    examples: [
      'CI/CD pipeline with distinct stages',
      'Immutable releases with unique IDs',
      'Cannot modify code at runtime',
      'Example: build once in CI, tag release artifact, then run artifact unchanged'
    ]
  },
  {
    number: 6,
    title: 'Processes',
    description: 'Execute the app as one or more stateless processes',
    examples: [
      'No local state stored between requests',
      'Sessions stored in external datastore (Redis, DB)',
      'Processes are disposable and can be killed/started anytime',
      'Example: keep cart/session state in PostgreSQL or Redis, never in memory only'
    ]
  },
  {
    number: 7,
    title: 'Port Binding',
    description: 'Export services via port binding',
    examples: [
      'Self-contained web server (not relying on Apache/Nginx injection)',
      'App binds to a port and listens for requests',
      'Port specified via environment variable',
      'Example: Node server listens on process.env.PORT for Heroku/Render/Fly'
    ]
  },
  {
    number: 8,
    title: 'Concurrency',
    description: 'Scale out via the process model',
    examples: [
      'Horizontal scaling by adding more processes',
      'Different process types for different workloads (web, worker)',
      'Process manager handles process distribution',
      'Example: run 4 web replicas and 2 worker replicas behind the same release'
    ]
  },
  {
    number: 9,
    title: 'Disposability',
    description: 'Maximize robustness with fast startup and graceful shutdown',
    examples: [
      'Quick startup time (seconds, not minutes)',
      'Graceful shutdown on SIGTERM',
      'Can handle sudden process death',
      'Example: close open HTTP connections and stop consuming queue jobs on SIGTERM'
    ]
  },
  {
    number: 10,
    title: 'Dev/Prod Parity',
    description: 'Keep development, staging, and production as similar as possible',
    examples: [
      'Same backing services in all environments',
      'Same dependencies and versions everywhere',
      'Minimal time gap between dev and production deploys',
      'Example: run Docker Compose in dev with the same Postgres/Redis versions as prod'
    ]
  },
  {
    number: 11,
    title: 'Logs',
    description: 'Treat logs as event streams',
    examples: [
      'App writes logs to stdout/stderr',
      'No log file management in the app',
      'Log aggregation handled by execution environment',
      'Example: stream stdout to CloudWatch, Datadog, or ELK via platform collectors'
    ]
  },
  {
    number: 12,
    title: 'Admin Processes',
    description: 'Run admin/management tasks as one-off processes',
    examples: [
      'Database migrations run as separate processes',
      'Admin scripts use same codebase and config',
      'One-off tasks run in identical environment as regular processes',
      'Example: run `npm run migrate` in a one-off release command container'
    ]
  }
];
