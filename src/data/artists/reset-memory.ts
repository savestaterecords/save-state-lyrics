import type {Artist} from "../../types/Artist.ts";
import stillLife from "../releases/reset-memory/still-life.ts";
import ameTokei from "../releases/reset-memory/ame-tokei.ts";
import auroraBorealis from "../releases/reset-memory/aurora-borealis.ts";
import ifAllElseFails from "../releases/reset-memory/if-all-else-fails.ts";
import yurameku from "../releases/reset-memory/yurameku.ts";


const resetMemory: Artist = {
    slug: "reset-memory",
    name: "reset memory",
    releases: [
        // albums
        stillLife,

        // singles
        ameTokei,
        auroraBorealis,
        ifAllElseFails,
        yurameku,
    ],
}

export default resetMemory