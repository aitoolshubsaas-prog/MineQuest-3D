# MineQuest 3D — Deployment Plan

## Phase 1: Playable GitHub Pages website
- Host the browser-based 3D client on GitHub Pages at https://aitoolshubsaas-prog.github.io/MineQuest-3D/.
- Ensure an index.html entry point exists, with textures and assets loading over HTTPS.
- Test WASD, Space jump, mouse look, hold-left-click mining, right-click placement, pickaxe, axe, shovel, sword, and Backspace/Delete pause.
- Enable Pages in repository Settings → Pages → Deploy from a branch → main → /(root), then verify the live URL.
- Use local browser storage for single-player world changes; do not claim multiplayer works on Pages alone.

## Phase 2: Server-based multiplayer
- Deploy the Node.js/WebSocket backend to a host that runs persistent processes.
- Connect the GitHub Pages client to a secure wss:// endpoint.
- Synchronize block changes and players, validate actions server-side, and add durable cloud storage.
- Test reconnects, save/load, latency, and multiplayer interactions.

## Project principles
- Keep the same MineQuest-3D GitHub repository as the source of truth.
- Do not require downloading HTML files to play.
- Keep Minecraft-inspired controls, textured terrain, trees, enemies and bosses.
- Provide a public play link only after deployment and a successful load check.

Status: Deployment plan documented. GitHub Pages publication and live gameplay verification remain separate steps.
