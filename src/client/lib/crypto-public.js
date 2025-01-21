import CryptoJS from "crypto-js";

const CRYPTO_PUBLIC_KEY = process.env.NEXT_PUBLIC_CRYPTO_PUBLIC_KEY;

const cryptoPublic = {
    encryptText (data) {
        return CryptoJS.AES.encrypt(data, CRYPTO_PUBLIC_KEY).toString();
    },

    decryptText (data) {
        const bytes  = CryptoJS.AES.decrypt(data, CRYPTO_PUBLIC_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    },

    encryptObject (data) {
        return CryptoJS.AES.encrypt(JSON.stringify(data), CRYPTO_PUBLIC_KEY).toString();
    },

    decryptObject (data) {
        const bytes  = CryptoJS.AES.decrypt(data, CRYPTO_PUBLIC_KEY);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
}

export default cryptoPublic;