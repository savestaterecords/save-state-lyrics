import { createServer } from "vite"

const vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
})

const { resolveUpcoming } = await vite.ssrLoadModule("/src/utils/resolveUpcoming.ts")
const { default: upcoming } = await vite.ssrLoadModule("/src/data/upcoming.ts")

console.log("upcoming input:", upcoming)
const resolved = resolveUpcoming(upcoming)
console.log("resolved:", resolved)

await vite.close()
