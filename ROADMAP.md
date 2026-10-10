# MineQuest 3D — Five-phase roadmap and live progress

Updated: 2026-10-10. This document is the source of truth for story-by-story development. **Statuses change only after a GitHub commit and relevant verification.** This is not an automated live dashboard: progress is updated during subsequent development sessions.

## Progress snapshot
- Phase 1: **In progress** — playable prototype, movement fix reported working by player; full regression testing outstanding.
- Phase 2: **Not started**
- Phase 3: **Not started**
- Phase 4: **Not started**
- Phase 5: **Not started**
- Current stories: **MQ-101** automated browser assertions committed, execution pending; **MQ-103** local block persistence implemented, browser reload verification pending.
- Latest known code improvement: day/night cycle committed; needs browser verification.
- Play: https://aitoolshubsaas-prog.github.io/MineQuest-3D/
- Source: https://github.com/aitoolshubsaas-prog/MineQuest-3D

## Definition of done
Each story needs implementation committed to GitHub, a browser smoke test where feasible, no regressions in WASD/Space/mining/building, and a short user test when interaction is important. Keep Backspace/Delete as pause/unlock; do not require Escape. Preserve the existing playable game and saves where possible.

## Phase 1 — Reliable playable foundation
- [x] **MQ-100** Repair WASD collision movement (user reported movement working; no automated verification).
  - **Story description:** Correct first-person collision and keyboard movement so W/A/S/D reliably move the player without passing through solid blocks. Acceptance: the player confirms movement works and regression tests eventually verify all four directions.
- [ ] **MQ-101** Add repeatable browser tests: WASD in four directions, Space jump, Shift sprint, Backspace/Delete pause, mouse lock.
  - **Story description:** Build repeatable Playwright browser checks for actual position changes on W/A/S/D, upward motion on Space, faster Shift movement, pointer-lock entry, and pause/unlock with Backspace or Delete. Acceptance: tests run successfully against the deployed game.
- [ ] **MQ-102** Test/fix left-hold mining, right-click placement, inventory changes, and tools 6–9.
  - **Story description:** Check continuous left-click mining, right-click block placement, inventory increases/decreases, and tool selection for pickaxe, axe, shovel and sword. Fix wrong targeting, incorrect mining speeds and placement inside the player. Acceptance: all actions work without breaking movement.
- [ ] **MQ-103** Test saving/reloading and fix persistence failures; display clear errors. Local block edits now auto-save to localStorage, but browser reload verification remains pending.
  - **Story description:** Store placed and mined blocks so a refresh restores the same world, including removed blocks. Handle unavailable or corrupted browser storage clearly. Acceptance: player changes persist after a browser restart; cloud syncing is not part of this story.
- [ ] **MQ-104** Verify day/night visuals and improve performance on ordinary laptops.
  - **Story description:** Verify the sky and lighting shift smoothly through day and night, then profile expensive rendering and raycasting. Reduce stutter while keeping gameplay unchanged. Acceptance: the scene remains playable on a typical laptop.
**Player acceptance:** move, jump, mine, place, save, reload, and pause successfully.

## Phase 2 — World exploration and resources
- [ ] **MQ-201** Chunk-based terrain with efficient rendering and safe spawn area.
  - **Story description:** Split the map into manageable terrain chunks, load nearby chunks as the player explores, and render blocks more efficiently. Ensure players spawn above solid ground. Acceptance: moving between chunks does not cause visible holes or crashes.
- [ ] **MQ-202** Caves and underground ore distribution (coal, iron and rare ore).
  - **Story description:** Generate explorable underground cave spaces and distribute coal, iron and rare ores at suitable depths. Acceptance: players can locate a cave and mine recognizable ore deposits.
- [ ] **MQ-203** Distinct trees, hills and simple biomes.
  - **Story description:** Add distinct terrain regions, hills and tree varieties while preserving navigable paths. Acceptance: exploration reveals noticeably different environments rather than repeated flat terrain.
- [ ] **MQ-204** Better block textures, mining particles, selection outline and ambient lighting.
  - **Story description:** Improve the visual readability of blocks with textures, a highlighted targeted block, mining feedback and atmospheric lighting. Acceptance: players can clearly tell what they are aiming at and when a block is breaking.
- [ ] **MQ-205** Persist edited chunks; ensure old worlds migrate or remain available.
  - **Story description:** Save world edits by chunk and reload them consistently, including compatibility with earlier local saves. Acceptance: returning to explored areas preserves builds and mined tunnels.
**Player acceptance:** explore, find a cave, mine ore and return home without losing edits.

## Phase 3 — Crafting, inventory and building
- [ ] **MQ-301** Inventory UI with stack counts, hotbar selection and drag/drop.
  - **Story description:** Create an inventory screen showing item icons, stack quantities, selectable hotbar slots and drag/drop item movement. Acceptance: moving items between inventory and hotbar changes what can be used in-game.
- [ ] **MQ-302** Crafting recipes for planks, sticks, pickaxes, axes and shovels.
  - **Story description:** Introduce a crafting system with clear recipes for planks, sticks and starter tools, consuming ingredients only when crafting succeeds. Acceptance: players can turn gathered wood into a usable tool.
- [ ] **MQ-303** Tool durability, tiered mining and item drops.
  - **Story description:** Give tools durability and appropriate mining strengths; make mined blocks drop collectible items. Acceptance: tool tier changes mining behavior and inventory accurately reflects drops and wear.
- [ ] **MQ-304** Building pieces: doors, windows, stairs, torches and storage.
  - **Story description:** Add interactive building components such as doors, windows, stairs, torches and storage containers. Acceptance: players can place and use each piece in a house.
- [ ] **MQ-305** Save/load crafted items and structures.
  - **Story description:** Persist inventory, crafted tools, durability, storage contents and placed structures across reloads. Acceptance: a crafted and furnished house remains intact when the game reopens.
**Player acceptance:** gather wood, craft tools, build and save a furnished house.

## Phase 4 — Survival, enemies and bosses
- [ ] **MQ-401** Health, damage feedback, respawn and optional peaceful mode.
  - **Story description:** Introduce health, readable damage indicators, respawning and a peaceful-mode option. Acceptance: players understand when they take damage and can recover after defeat.
- [ ] **MQ-402** Zombies, creepers and demons with fair AI, spawn rules and attacks.
  - **Story description:** Add enemies with distinct behavior and fair spawn rules, including zombies, creepers and demons. Acceptance: enemies approach or attack predictably and do not spawn unfairly on top of the player.
- [ ] **MQ-403** Combat hit detection, weapon cooldowns and drops.
  - **Story description:** Implement accurate sword hit detection, attack cooldowns, enemy health and appropriate loot drops. Acceptance: combat feedback matches hits and enemies can be defeated consistently.
- [ ] **MQ-404** Boss encounter with telegraphed attacks, rewards and win condition.
  - **Story description:** Design a boss fight with visible warning cues, multiple attack patterns and a reward for victory. Acceptance: the player can learn the fight and finish it without unavoidable damage.
- [ ] **MQ-405** Balance difficulty and regression-test survival mechanics.
  - **Story description:** Tune enemy difficulty, damage, healing and rewards, and run regression checks for the survival loop. Acceptance: a new player can survive a night with reasonable preparation.
**Player acceptance:** survive a night, fight enemies and defeat a boss.

## Phase 5 — Multiplayer, hosting and polish
- [ ] **MQ-501** Deploy Node/WebSocket backend separately from GitHub Pages.
  - **Story description:** Build and deploy a separate Node.js/WebSocket service because GitHub Pages cannot run persistent backend processes. Acceptance: the published client establishes a secure connection to a live backend.
- [ ] **MQ-502** Server-authoritative shared block edits and player positions.
  - **Story description:** Move shared player positions and block edits to server-validated state and broadcast changes between connected clients. Acceptance: two players see each other's actions in the same world.
- [ ] **MQ-503** Durable hosted world storage, backups and reconnection.
  - **Story description:** Store shared worlds durably on the server, back up edits and restore sessions after temporary disconnects. Acceptance: multiplayer builds survive a server restart.
- [ ] **MQ-504** Multiplayer safety: rate limits, input validation and room management.
  - **Story description:** Validate network messages, limit abusive requests, isolate rooms and prevent accidental cross-world edits. Acceptance: malformed or excessive client traffic does not corrupt shared worlds.
- [ ] **MQ-505** Polish menus, onboarding, accessibility, performance and release tests.
  - **Story description:** Refine the start menu, control guidance, accessibility, loading feedback and performance; run a release checklist across supported browsers. Acceptance: new players can enter, play and understand the game without instructions from the developer.
**Player acceptance:** two browsers join the same world, see edits and retain progress after restart.

## Open-source research and licensing
Candidate public projects to **review**, not yet audited or copied:
- https://github.com/thundree/minicraft-threejs — potential ideas for terrain and lighting.
- https://github.com/BurnyCoder/minecraft-clone — potential ideas for blocks and first-person controls.
- https://github.com/fernforge-arcade/minecraft-clone — potential ideas for world generation and gameplay.
- https://github.com/PrismarineJS/prismarine-viewer — voxel rendering architecture reference.
Before reusing any code or assets: inspect current repository, license, dependencies, attribution requirements, compatibility and security; record exact source URL and commit. Never copy incompatible or unlicensed code or proprietary Minecraft assets. A repository appearing public does not by itself grant reuse permission.

## Progress log
Story descriptions and acceptance conditions are listed directly under each story above. The log below records changes and verification evidence.
| Date | Story | Status | Evidence / follow-up |
| --- | --- | --- | --- |
| 2026-10-10 | MQ-100 | Player-reported working | WASD fix committed earlier; user said movement seems to work. |
| 2026-10-10 | MQ-104 (partial) | Implemented, unverified | Day/night code committed; visual browser test pending. |
| 2026-10-10 | Planning | Completed | Five-phase roadmap and story tracker created. |
| 2026-10-10 | MQ-101 | In progress | Added diagnostics (2acc82a) and stronger Playwright assertions (06a1a66). Browser execution not yet verified; sandbox cannot resolve deployed host. |
| 2026-10-10 | MQ-103 | In progress | Block changes now auto-save to browser localStorage and reload on next visit (51e3ca6). Browser verification pending; saves are per-browser, not server-based. |

## Development protocol
Work one story at a time. For each story: research compatible sources, implement, commit, test, update checkbox and progress log with commit/test evidence, then request player verification when necessary. Do not mark stories done on code review alone. Development happens during active sessions, not continuously while the chat is idle.
