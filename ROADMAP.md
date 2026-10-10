# MineQuest 3D — Five-phase roadmap and live progress

Updated: 2026-10-10. This document is the source of truth for story-by-story development. **Statuses change only after a GitHub commit and relevant verification.** This is not an automated live dashboard: progress is updated during subsequent development sessions.

## Progress snapshot
- Phase 1: **In progress** — playable prototype, movement fix reported working by player; full regression testing outstanding.
- Phase 2: **Not started**
- Phase 3: **Not started**
- Phase 4: **Not started**
- Phase 5: **Not started**
- Current story: **MQ-101** Playwright smoke test script committed; execution and movement assertions still pending. Next: test actual coordinate changes and jumping.
- Latest known code improvement: day/night cycle committed; needs browser verification.
- Play: https://aitoolshubsaas-prog.github.io/MineQuest-3D/
- Source: https://github.com/aitoolshubsaas-prog/MineQuest-3D

## Definition of done
Each story needs implementation committed to GitHub, a browser smoke test where feasible, no regressions in WASD/Space/mining/building, and a short user test when interaction is important. Keep Backspace/Delete as pause/unlock; do not require Escape. Preserve the existing playable game and saves where possible.

## Phase 1 — Reliable playable foundation
- [x] **MQ-100** Repair WASD collision movement (user reported movement working; no automated verification).
- [ ] **MQ-101** Add repeatable browser tests: WASD in four directions, Space jump, Shift sprint, Backspace/Delete pause, mouse lock.
- [ ] **MQ-102** Test/fix left-hold mining, right-click placement, inventory changes, and tools 6–9.
- [ ] **MQ-103** Test saving/reloading and fix persistence failures; display clear errors.
- [ ] **MQ-104** Verify day/night visuals and improve performance on ordinary laptops.
**Player acceptance:** move, jump, mine, place, save, reload, and pause successfully.

## Phase 2 — World exploration and resources
- [ ] **MQ-201** Chunk-based terrain with efficient rendering and safe spawn area.
- [ ] **MQ-202** Caves and underground ore distribution (coal, iron and rare ore).
- [ ] **MQ-203** Distinct trees, hills and simple biomes.
- [ ] **MQ-204** Better block textures, mining particles, selection outline and ambient lighting.
- [ ] **MQ-205** Persist edited chunks; ensure old worlds migrate or remain available.
**Player acceptance:** explore, find a cave, mine ore and return home without losing edits.

## Phase 3 — Crafting, inventory and building
- [ ] **MQ-301** Inventory UI with stack counts, hotbar selection and drag/drop.
- [ ] **MQ-302** Crafting recipes for planks, sticks, pickaxes, axes and shovels.
- [ ] **MQ-303** Tool durability, tiered mining and item drops.
- [ ] **MQ-304** Building pieces: doors, windows, stairs, torches and storage.
- [ ] **MQ-305** Save/load crafted items and structures.
**Player acceptance:** gather wood, craft tools, build and save a furnished house.

## Phase 4 — Survival, enemies and bosses
- [ ] **MQ-401** Health, damage feedback, respawn and optional peaceful mode.
- [ ] **MQ-402** Zombies, creepers and demons with fair AI, spawn rules and attacks.
- [ ] **MQ-403** Combat hit detection, weapon cooldowns and drops.
- [ ] **MQ-404** Boss encounter with telegraphed attacks, rewards and win condition.
- [ ] **MQ-405** Balance difficulty and regression-test survival mechanics.
**Player acceptance:** survive a night, fight enemies and defeat a boss.

## Phase 5 — Multiplayer, hosting and polish
- [ ] **MQ-501** Deploy Node/WebSocket backend separately from GitHub Pages.
- [ ] **MQ-502** Server-authoritative shared block edits and player positions.
- [ ] **MQ-503** Durable hosted world storage, backups and reconnection.
- [ ] **MQ-504** Multiplayer safety: rate limits, input validation and room management.
- [ ] **MQ-505** Polish menus, onboarding, accessibility, performance and release tests.
**Player acceptance:** two browsers join the same world, see edits and retain progress after restart.

## Open-source research and licensing
Candidate public projects to **review**, not yet audited or copied:
- https://github.com/thundree/minicraft-threejs — potential ideas for terrain and lighting.
- https://github.com/BurnyCoder/minecraft-clone — potential ideas for blocks and first-person controls.
- https://github.com/fernforge-arcade/minecraft-clone — potential ideas for world generation and gameplay.
- https://github.com/PrismarineJS/prismarine-viewer — voxel rendering architecture reference.
Before reusing any code or assets: inspect current repository, license, dependencies, attribution requirements, compatibility and security; record exact source URL and commit. Never copy incompatible or unlicensed code or proprietary Minecraft assets. A repository appearing public does not by itself grant reuse permission.

## Progress log
| Date | Story | Status | Evidence / follow-up |
| --- | --- | --- | --- |
| 2026-10-10 | MQ-100 | Player-reported working | WASD fix committed earlier; user said movement seems to work. |
| 2026-10-10 | MQ-104 (partial) | Implemented, unverified | Day/night code committed; visual browser test pending. |
| 2026-10-10 | Planning | Completed | Five-phase roadmap and story tracker created. |\n| 2026-10-10 | MQ-101 | In progress | Added tests/movement.spec.cjs (commit a1cb58c); browser execution not yet verified. |

## Development protocol
Work one story at a time. For each story: research compatible sources, implement, commit, test, update checkbox and progress log with commit/test evidence, then request player verification when necessary. Do not mark stories done on code review alone. Development happens during active sessions, not continuously while the chat is idle.
