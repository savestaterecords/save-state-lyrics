import type {Artist} from "../../types/Artist.ts";
import stillLife from "../releases/reset-memory/still-life.ts";
import ameTokei from "../releases/reset-memory/ame-tokei.ts";

const resetMemory: Artist = {
    slug: "reset-memory",
    name: "reset memory",
    releases: [ameTokei, stillLife],
}

export default resetMemory