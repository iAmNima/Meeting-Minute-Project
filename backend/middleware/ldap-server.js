const { authenticate } = require("ldap-authentication");

async function auth() {
  console.log("function started.");
  let options = {
    ldapOpts: {
      url: "ldap://ldap.technikum-wien.at", //url is currect!
      //tlsOptions: { rejectUnauthorized: false },
    },
    userDn: "uid=if18b016,ou=people,dc=technikum-wien,dc=at",
    userPassword: "nB213213213",
    userSearchBase: "ou=people,dc=technikum-wien,dc=at",
    usernameAttribute: "uid",
    username: "if18b016",
    // starttls: false,
  };

  let user = await authenticate(options);
  console.log(user);
}

module.exports = auth;
