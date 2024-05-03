import { initLogger, traced } from "braintrust";

import dotenv from "dotenv";

dotenv.config();

// No Logs will be displayed in the Dashboard.

initLogger({
  projectName: "Testing checkLogger",
  apiKey: process.env.BRAINTRUST_API_KEY,
});

export async function checkLoggerFails(): Promise<string> {
  return traced(
    async (span) => {
      try {
        span.log({ input: "Should Log", output: "But doesn't" });
        return "Fails";
      } catch (error: any) {
        return "Error";
      }
    },
    {
      name: "checkLoggerFails",
    }
  );
}
