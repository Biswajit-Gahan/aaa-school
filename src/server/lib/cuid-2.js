import "server-only";

import {init} from "@paralleldrive/cuid2";

const CUID_2_SECRET_KEY = process.env.CUID_2_SECRET_KEY;

const createId = init({
    random: Math.random,
    length: 25,
    fingerprint: CUID_2_SECRET_KEY,
})

const cuid2 = {
    id: createId
}

export default cuid2;