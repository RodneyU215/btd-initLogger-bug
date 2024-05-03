import { Eval } from "braintrust";
import { Factuality } from "autoevals";
import "dotenv/config";

import { checkLogger } from "./thisWorks";
import { checkLoggerFails } from "./thisDoesntWork";

const exactMatch = (args: { input; output; expected? }) => {
  return {
    name: "Exact match",
    score: args.output === args.expected ? 1 : 0,
  };
};

Eval("Testing checkLogger", { // #Feedback: The first param of Eval is the projectName. That's what this variable should be called instead of "name".
  data: () => {
    return [
      {
        input: "",
        expected: "Done",
      },
    ];
  },
  task: checkLogger,
  scores: [exactMatch, Factuality], // TODO: Factuality fails because it cannot find an openAI api key. That's odd because it shouldn't need it.
});

Eval("Testing checkLogger", {
  data: () => {
    return [
      {
        input: "",
        expected: "Fails",
      },
    ];
  },
  task: checkLoggerFails, // TODO: This fails to log the trace.
  scores: [exactMatch],
});