import * as Sentry from "@sentry/react";
import { APP_VERSION, IS_DEV, SENTRY_DSN } from "./const/env";

export const initSentry = () => {
  if (!SENTRY_DSN) {
    // eslint-disable-next-line no-console
    console.warn("Sentry DSN not provided, skipping Sentry initialization");
    return;
  }

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: IS_DEV ? "development" : "production",
    release: APP_VERSION,
    debug: IS_DEV,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
      Sentry.feedbackIntegration({
        colorScheme: "system",
        isNameRequired: true,
        isEmailRequired: true,
        autoInject: false,
      }),
    ],
    // Performance monitoring
    tracesSampleRate: IS_DEV ? 1.0 : 0.1,
    // Session replay
    replaysSessionSampleRate: IS_DEV ? 1.0 : 0.1,
    // Replay on error
    replaysOnErrorSampleRate: 1.0,
    // Ignore localhost and development URLs
    beforeSend(event) {
      if (IS_DEV && event.request?.url?.includes("localhost")) {
        return null;
      }
      return event;
    },
  });
};

export { Sentry };
