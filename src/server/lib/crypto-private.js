import "server-only";

import CryptoJS from "crypto-js";
import bcrypt from "bcrypt";

const CRYPTO_PRIVATE_KEY = process.env.CRYPTO_PRIVATE_KEY;
const CRYPTO_SALT = process.env.CRYPTO_SALT;

const CRYPTO_PRIVATE = {
    encryptText(data) {
        return CryptoJS.AES.encrypt(data, CRYPTO_PRIVATE_KEY).toString();
    },

    decryptText(data) {
        const bytes = CryptoJS.AES.decrypt(data, CRYPTO_PRIVATE_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    },

    encryptObject(data) {
        return CryptoJS.AES.encrypt(JSON.stringify(data), CRYPTO_PRIVATE_KEY).toString();
    },

    decryptObject(data) {
        const bytes = CryptoJS.AES.decrypt(data, CRYPTO_PRIVATE_KEY);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    },

    encryptPassword(data) {
        return bcrypt.hash(data, CRYPTO_SALT);
    },

    comparePassword(data, encryptedData) {
        return bcrypt.compareSync(data, encryptedData);
    },
}

export default CRYPTO_PRIVATE;