#!/usr/bin/env node

import { Command } from "commander";
import {
  APP_NAME,
  DEFAULT_MODEL,
  DEFAULT_TONE,
  ERROR_MESSAGES,
  correctText,
  formatCliError,
  resolveInputText
} from "../src/index.js";

const program = new Command();

program
  .name(APP_NAME)
  .description("Correct and polish text using ChatGPT")
  .argument("[text...]", "Text to correct (or pipe via stdin)")
  .option("-t, --tone <tone>", "Target tone (e.g. formal, casual, friendly)", DEFAULT_TONE)
  .option("-m, --model <model>", "OpenAI model", DEFAULT_MODEL)
  .option("-k, --api-key <key>", "OpenAI API key (fallback: OPENAI_API_KEY)")
  .option("--json", "Output JSON instead of plain text", false)
  .addHelpText(
    "after",
    `
Examples:
  $ tc "i has a meeting tomorrow at 9am"
  $ echo "can u review this" | tc --tone professional
`
  )
  .action(async (textParts, options) => {
    try {
      const inputText = await resolveInputText(textParts);

      if (!inputText) {
        console.error(ERROR_MESSAGES.missingInput);
        program.help({ error: true });
      }

      const corrected = await correctText({
        text: inputText,
        tone: options.tone,
        model: options.model,
        apiKey: options.apiKey
      });

      if (options.json) {
        process.stdout.write(`${JSON.stringify({ corrected, tone: options.tone }, null, 2)}\n`);
        return;
      }

      process.stdout.write(`${corrected}\n`);
    } catch (error) {
      console.error(formatCliError(error));
      process.exit(1);
    }
  });

await program.parseAsync(process.argv);
