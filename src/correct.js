import OpenAI from "openai";
import {
  DEFAULT_MODEL,
  DEFAULT_TONE,
  ERROR_MESSAGES,
  SYSTEM_PROMPT,
} from "./constants.js";

export async function correctText({
  text,
  tone = DEFAULT_TONE,
  model = DEFAULT_MODEL,
  apiKey,
}) {
  const key = resolveApiKey(apiKey);

  if (!key) {
    throw new Error(ERROR_MESSAGES.missingApiKey);
  }

  const client = new OpenAI({ apiKey: key });

  const response = await client.responses.create({
    model,
    input: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: `Tone: ${tone}\n\nText:\n${text}`,
      },
    ],
  });

  const output = extractOutputText(response);

  if (!output) {
    throw new Error(ERROR_MESSAGES.emptyResponse);
  }

  return output;
}

function resolveApiKey(apiKey) {
  return apiKey || process.env.OPENAI_API_KEY;
}

function extractOutputText(response) {
  return (response.output_text || "").trim();
}
