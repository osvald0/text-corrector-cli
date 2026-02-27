export const APP_NAME = "tc";
export const DEFAULT_TONE = "neutral";
export const DEFAULT_MODEL = "gpt-4.1-mini";

export const SYSTEM_PROMPT =
  "You are a professional text corrector. Detect the input language automatically, then correct grammar, spelling, punctuation, and clarity in that same language while preserving original meaning. Do not translate unless explicitly requested. Output only the corrected text without explanations.";

export const ERROR_MESSAGES = {
  missingApiKey: "Missing API key. Set OPENAI_API_KEY or provide --api-key.",
  emptyResponse: "Model returned an empty response.",
  authFailed: "Authentication failed. Set OPENAI_API_KEY or pass --api-key.",
  rateLimited: "Rate limit reached. Please retry in a moment.",
  missingInput:
    "No input text provided. Pass text as an argument or via stdin.",
  unknown: "Unknown error occurred.",
};
