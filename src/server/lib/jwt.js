import "server-only";

import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_EXPIRY = "7d";

const jsonWebToken = {
    sign(data) {
        return jwt.sign(data, JWT_SECRET_KEY, {expiresIn: JWT_EXPIRY});
    },

    verify(token) {
        return jwt.verify(token, JWT_SECRET_KEY);
    },

    decode(token) {
        return jwt.decode(token);
    }
}

export default jsonWebToken;