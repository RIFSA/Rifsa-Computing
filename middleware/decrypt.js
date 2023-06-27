// Import CryptoJS library
import CryptoJS from 'crypto-js';

export const Decrypt = (encryptedData) => {
    // Set your encryption parameters (should match the ones used for encryption)
    const key = process.env.ACCESS_TOKEN_SECRET;
    const iv = '16';

    // Decrypt the data
    const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
        iv: iv
    }).toString(CryptoJS.enc.Utf8);
    return decrypted;
}

export const DecodeBase64 = (encryptedData) => {
    const decodedBuffer = Buffer.from(encryptedData, 'base64');
    const decodedString = decodedBuffer.toString('utf8');
    return decodedString;
}