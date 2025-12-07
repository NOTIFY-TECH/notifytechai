# CSS Diagnostics Fixes

## Tasks
- [x] Reorder properties in `.flip-card-inner`: Move `-webkit-backface-visibility` before `backface-visibility` (Already in correct order)
- [x] Remove unsupported `-webkit-overflow-scrolling` from `.scroll-snap-x`
- [x] Reorder properties in `.glass`: Move `-webkit-backdrop-filter` before `backdrop-filter` (Already in correct order)
- [x] Reorder properties in `.glass-strong`: Move `-webkit-backdrop-filter` before `backdrop-filter` (Already in correct order)

## Notes
- Unknown @tailwind and @apply errors may require VSCode restart to recognize custom data.
- After fixes, verify diagnostics are resolved.
