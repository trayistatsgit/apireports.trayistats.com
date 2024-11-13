const CryptoJS = require("crypto-js");

const encryptData = async (data) => {
    try {
        const secrectKey = "Algo_&^%$#_algo";
        const ciphertext = CryptoJS.AES.encrypt(data, secrectKey).toString();
        return ciphertext
    } catch ( error ) {
        throw error
    }

}

const decryptData = async (data) => {
    try {
        const secrectKey = "Algo_&^%$#_algo";
        const bytes = CryptoJS.AES.decrypt(data, secrectKey);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
    } catch (error) {
        throw error

    }
}

module.exports = {
    encryptData,
    decryptData
}