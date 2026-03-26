# Šiprum (Shiprum) | Linguistic Command Hub

Šiprum (Gothic: *Stitch*) is a unified desktop environment for advanced linguistic research, polyglot immersion, and lexical acquisition. It serves as a central frame for the "Panglossia" ecosystem, integrating specialized tools for chat, vocabulary management, phonetics, and syntax analysis.

![Šiprum Interface](icon.png)

## Core Features

- **Sōkjan Hub**: A unified search and exploration portal.
    - **Cross-App Search**: Query Panglossia, Wordhord, Fonetik, and Struktur from a single interface.
    - **DeepL Integration**: High-precision neural translation.
    - **Sources Manager**: Native support for PDF, EPUB, Images, and Audiovisual content.
- **Academic Trajectory**: Visual dashboard tracking your progress across multiple languages.
- **Linguistic Immersion**: seamless embedding of specialized sub-apps within a premium, dark-mode environment inspired by Google Stitch.

## The Ecosystem

1. **Panglossia**: AI-driven conversation partner with strict lexicographical roles.
2. **Wordhord**: Personal lexicon and spaced-repetition vocabulary system.
3. **Fonetik**: IPA transcription and phonological analysis tool.
4. **Struktur**: Syntactic parsing and grammar visualization.

---

## Installation

### Linux (Ubuntu/Debian)
1. Install Dependencies:
   ```bash
   sudo apt update && sudo apt install nodejs npm python3 python3-pip vlc
   ```
2. Clone and Install:
   ```bash
   git clone https://github.com/invasiveSquirrel/Shiprum.git
   cd Shiprum
   npm install
   ```
3. Run:
   ```bash
   npm start
   ```

### macOS
1. Install Homebrew if not already present: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
2. Install Node and VLC:
   ```bash
   brew install node vlc
   ```
3. Clone and Run:
   ```bash
   git clone https://github.com/invasiveSquirrel/Shiprum.git
   cd Shiprum
   npm install
   npm start
   ```

### Windows
1. Download and install [Node.js](https://nodejs.org/).
2. Download and install [VLC Media Player](https://www.videolan.org/vlc/).
3. Clone the repository using Git Bash or Download ZIP.
4. Run in CMD/PowerShell:
   ```cmd
   npm install
   npm start
   ```

---

## API & Configuration

The ecosystem relies on the **Google Gemini API** for LLM capabilities and **DeepL** for translation.

1. **Obtain Gemini Key**: Visit [Google AI Studio](https://aistudio.google.com/) and generate an API key.
2. **Setup**:
   - Create a `.env` file in the `Shiprum` root.
   - Add: `GOOGLE_API_KEY=your_key_here`
   - Also place the key in `wordhord/wordhord_api.txt` and `panglossia/panglossia_api.txt` if using standalone.

---

## Development

Šiprum uses **Electron** with **React**, **Vite**, and **TailwindCSS**. Sub-apps are served locally and integrated via `<webview>` for maximum isolation and performance.

Designed by the Šiprum Team. 2026.
