var authenticator = require('authenticator');

var formattedKey = authenticator.generateKey();


const generateSecret = () => {
    return formattedKey;
}
const generateToken = () => {
    const token = authenticator.generateToken(formattedKey);
    return token;
}

const verifyToken = (token) => {
    const isVerified = authenticator.verifyToken(formattedKey, token);
    return isVerified;
}

const generateQrUri = () => {
    return authenticator.generateTotpUri(formattedKey, null, "MFA Test");
}

module.exports = {
    generateToken,
    verifyToken,
    generateSecret,
    generateQrUri
}