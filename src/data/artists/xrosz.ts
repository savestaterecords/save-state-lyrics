import type {Artist} from "../../types/Artist.ts";
import deliveranceDemo from "../releases/XROSZ/deliverance-demo.ts";
import elegy from "../releases/XROSZ/elegy.ts";

const xrosz: Artist = {
    slug: "xrosz",
    name: "XROSZ",
    releases: [deliveranceDemo, elegy],
}

export default xrosz