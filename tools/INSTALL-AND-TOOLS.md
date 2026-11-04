# ARE Academy — installable app (iPhone, iPad, desktop)

A free, offline-capable study app for the ARE 5.0. Everything is in this folder; there is no server, database or subscription.

## What's inside

| File | Purpose |
|---|---|
| `index.html` | The whole app (lessons, questions, exams, notes, videos, tutor) |
| `manifest.webmanifest`, `icons/` | Lets iPhone/iPad add it to the home screen as an app |
| `sw.js` | Service worker: caches the app so it works offline |
| `tools/render_video.py` | Optional: turn a video-lesson storyboard into an MP4 on your computer |

## 1. Put it online for free (pick one, about 5 minutes)

A home-screen app needs an `https://` address. All three options below are free with no credit card; limits were checked in November 2026 and are far above what one person needs (the app is under 1 MB).

**Option A: Cloudflare Pages (no Git needed)**
1. Create a free account at <https://dash.cloudflare.com/sign-up>.
2. Workers & Pages → Create → Pages → **Upload assets**.
3. Name the project (e.g. `are-academy`), drag in **this whole folder**, and deploy.
4. Your app is at `https://are-academy.pages.dev`.
Free plan: 500 deployments a month, up to 20,000 files, 25 MiB per file.

**Option B: GitHub Pages**
1. Create a free GitHub account and a new **public** repository (Pages on private repositories needs a paid plan).
2. Upload the contents of this folder (Add file → Upload files).
3. Settings → Pages → Deploy from branch → `main` / root → Save.
4. Your app is at `https://<username>.github.io/<repo>/`.
Limits: 1 GB site, about 100 GB/month of bandwidth (soft limit).
Your study progress is **not** in the repository; it stays on your devices. The repository only holds the app.

**Option C: Netlify Drop**: drag the folder onto <https://app.netlify.com/drop> and claim the site with a free account.

## 2. Install on iPhone and iPad

1. Open your app address in **Safari**.
2. Tap **Share** → **Add to Home Screen** → **Add**.
3. Launch ARE Academy from the home screen. It opens full-screen, works in portrait and landscape, and keeps working offline.

No Apple Developer account is needed.

## 3. Your progress

- Saved automatically on each device in **IndexedDB**, with a copy in local storage. The app asks the browser to protect it from automatic clearing.
- A **snapshot** is kept automatically once a day (the last 10), and before every import, reset or sync. Restore one under *Backup & data*.
- **Move progress between iPhone and iPad:**
  - *Backup file*: Backup & data → **Share backup to another device** (AirDrop, Files or iCloud Drive) → on the other device, **Import**. You're asked to confirm before anything is replaced.
  - *Automatic, optional*: Settings → Sync → **GitHub Gist**. Make a free GitHub token with only the `gist` permission. Progress is stored in a secret gist you own and merged across devices.
- Note: iOS keeps a home-screen app's storage separate from Safari's. Install first, then study in the installed app.

## 4. AI tutor (optional, free)

The tutor and AI-written video scripts need one of these. All other features work without AI.

- **Google Gemini API (free tier)**: create a key at <https://aistudio.google.com/apikey> and paste it in Settings → AI tutor. Free-tier limits are per project and shown in AI Studio. Google may use free-tier prompts to improve its products.
- **Ollama** on your Mac/PC (free, private): install from <https://ollama.com>, run `ollama pull llama3.2`, then start it with `OLLAMA_ORIGINS=* ollama serve`. Set the base URL to `http://localhost:11434/v1`. This works from the same computer.
- **Claude**: available automatically when you open ARE Academy as an artifact inside claude.ai or the Claude app (uses your Claude plan). It isn't available in this self-hosted copy.

Keys are stored only on the device where you enter them and are never included in backups.

## 5. Making MP4 video files (optional)

Videos play live in the app using your device's voices. To make an MP4:

```bash
pip install playwright && python -m playwright install chromium
# FFmpeg: https://ffmpeg.org/download.html  (macOS: brew install ffmpeg)
# Optional natural voice:
pip install piper-tts && python -m piper.download_voices en_US-lessac-medium
python tools/render_video.py storyboard.json --voice en_US-lessac-medium.onnx
```

Export the storyboard from AI Video Studio → **Export**. Without Piper, the script uses macOS `say` or FFmpeg's built-in voice.
Licences: Playwright (Apache-2.0), FFmpeg (LGPL/GPL), Piper (GPL-3.0; check each voice's licence before redistributing videos).

## Updating

Replace the files on your host with a newer package. The app picks up the update the next time it's opened online, and your progress isn't touched.
