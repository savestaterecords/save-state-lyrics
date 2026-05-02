import type {Artist} from "../../types/Artist.ts";
import deliveranceDemo from "../releases/XROSZ/deliverance-demo.ts";
import elegy from "../releases/XROSZ/elegy.ts";
import yesterday from "../releases/XROSZ/yesterday.ts";

const xrosz: Artist = {
    slug: "xrosz",
    name: "XROSZ",
    releases: [deliveranceDemo, elegy, yesterday],
}

export default xrosz