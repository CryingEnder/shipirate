import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {
  Sentry.init({
    dsn: "https://139fc37b8be34b828ca9359634f0f4cb@o452961.ingest.sentry.io/5672793",
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0, //to be adjusted in production
  });
}

function log(error) {
  console.log(error);
}

export default {
  init,
  log,
};
