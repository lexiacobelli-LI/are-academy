# ARE Academy

Personal ARE 5.0 study app, deployed to Cloudflare Workers (`fragrant-dew-8189`).

- `public/`: the deployed site (one-file app, service worker, manifest, icons)
- `tools/render_video.py`: optional local MP4 renderer for video-lesson storyboards
- `source/`: build sources (`python3 source/build.py` writes the app)
- `wrangler.jsonc`: Cloudflare config; Cloudflare's Git integration runs `npx wrangler deploy` on every push to `main`

Study progress is stored on each device, never in this repository.
