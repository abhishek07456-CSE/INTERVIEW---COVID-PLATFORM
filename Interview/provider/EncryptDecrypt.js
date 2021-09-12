var bcrypt = require('bcrypt');
var saltRounds = 10;
const encrypt = (text)  => {
    return bcrypt.hashSync(text, saltRounds);
}
const compareHash = (text , hash) => {
    return bcrypt.compareSync(text, hash);
}
module.exports = {
    encrypt,
    compareHash
}
