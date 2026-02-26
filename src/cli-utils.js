import { ERROR_MESSAGES } from "./constants.js";

export async function resolveInputText(textParts) {
  const argumentText = normalizeTextParts(textParts);

  if (argumentText) {
    return argumentText;
  }

  return readStdinIfPiped();
}

export function formatCliError(error) {
  if (error?.status === 401) {
    return ERROR_MESSAGES.authFailed;
  }

  if (error?.status === 429) {
    return ERROR_MESSAGES.rateLimited;
  }

  if (error?.message) {
    return `Error: ${error.message}`;
  }

  return ERROR_MESSAGES.unknown;
}

function normalizeTextParts(textParts) {
  if (!Array.isArray(textParts)) {
    return "";
  }
  return textParts.join(" ").trim();
}

function readStdinIfPiped() {
  return new Promise((resolve, reject) => {
    if (process.stdin.isTTY) {
      resolve("");
      return;
    }

    let data = "";

    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => {
      data += chunk;
    });
    process.stdin.on("end", () => resolve(data.trim()));
    process.stdin.on("error", reject);
  });
}
