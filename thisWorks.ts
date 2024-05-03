import { initLogger } from "braintrust";

import dotenv from "dotenv";

dotenv.config();

// Logs will be displayed in the Dashboard as expected.

const logger = initLogger({
  projectName: "Testing checkLogger",
  apiKey: process.env.BRAINTRUST_API_KEY,
});

export async function checkLogger(): Promise<string> {
  return logger.traced(
    async (span) => {
      try {
        span.log({ input: "Should Log", output: "This works as expected!" });
        return "Done";
      } catch (error: any) {
        return "Error";
      }
    },
    {
      name: "checkLogger", // #Feedback: This is the name of the Span inside of a Trace. This shows up in Logs. The docstring for the traced function should better explain this.
    }
  );
}
