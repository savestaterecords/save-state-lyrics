import type {Artist} from "../../types/Artist.ts";
import deliveranceDemo from "../releases/XROSZ/deliverance-demo.ts";
import elegy from "../releases/XROSZ/elegy.ts";
import yesterday from "../releases/XROSZ/yesterday.ts";
import judgement from "../releases/XROSZ/judgement.ts";

const xrosz: Artist = {
    slug: "xrosz",
    name: "XROSZ",
    releases: [deliveranceDemo, elegy, yesterday, judgement],
}

export default xrosz