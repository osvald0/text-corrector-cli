# text-corrector-cli

A tiny terminal CLI that takes text input and returns a corrected version using ChatGPT.

## Features

- Corrects grammar, spelling, punctuation, and wording.
- Detects input language automatically and corrects in the same language.
- Optional `--tone` flag (`formal`, `casual`, `friendly`, etc.).
- Accepts text as argument or from stdin.
- Plain text output or JSON output.

## Install (macOS/Linux)

### 1) Clone and enter the project

```bash
git clone <your-repo-url>
cd text-corrector-cli
```

### 2) Install dependencies

```bash
npm install
```

### 3) Set your OpenAI API key

```bash
export OPENAI_API_KEY="your_api_key_here"
```

To persist it in your shell:

```bash
# macOS (zsh)
echo 'export OPENAI_API_KEY="your_api_key_here"' >> ~/.zshrc
source ~/.zshrc

# Linux (bash)
echo 'export OPENAI_API_KEY="your_api_key_here"' >> ~/.bashrc
source ~/.bashrc
```

### 4) Make the command available globally

```bash
npm link
```

Now you can run:

```bash
ft "can u send me the report today"
```

## Run without global install

```bash
node bin/text-corrector.js "i has a meeting tomorrow at 9am"
```

## Uninstall global command

If you installed with `npm link`, remove global links with:

```bash
npm unlink -g text-corrector-cli
```

## Usage

You can use either command:

- `ft` (short alias)
- `text-corrector` (full name)

### Tone

```bash
ft "please check this note" --tone formal
```

### Stdin

```bash
echo "hey team can u review this" | ft --tone professional
```

### JSON

```bash
ft "i am writing to ask for update" --tone concise --json
```

## Options

- `-t, --tone <tone>`: target writing tone (default: `neutral`)
- `-m, --model <model>`: OpenAI model (default: `gpt-4.1-mini`)
- `-k, --api-key <key>`: API key override
- `--json`: return JSON object
