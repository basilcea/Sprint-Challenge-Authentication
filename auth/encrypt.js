const bcrypt = require('bcryptjs');
const crypted = {
    hashPassword(password) {
      return bcrypt.hashSync(password, 12);
    },
    comparePassword(password, hashPassword) {
      return bcrypt.compareSync(password, hashPassword);
    }
  };
  module.exports = crypted