import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://5d0f5b45dde876545c1a7c590f17b85e@o4508183610261504.ingest.us.sentry.io/4508183621730304",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // ...

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
