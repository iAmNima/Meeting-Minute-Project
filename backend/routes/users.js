const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let User = require("../models/User.model");
const auth = require("../middleware/auth");
const { authenticate } = require("ldap-authentication");

//------------------- show all user -----------------//
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

//------------------- add user -----------------//
router.post("/add", async (req, res) => {
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let email = req.body.email;
  let password = req.body.password;
  let mobile = req.body.mobile;

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = new User({
    firstname,
    lastname,
    email,
    password: passwordHash,
    mobile,
  });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//------------------- login user -----------------//
router.post("/login", async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;

    //----------validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all field have been entered." });

    const user = await User.findOne({ email: email });

    //----------user exit
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this Email hase been registered." });

    //---------match password
    let isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "invalid credential." });

    //---------tokenb for give id of users
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        mobile: user.mobile,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//------------------- Delete -----------------//
router.delete("/delete", auth, async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.user);
    res.json(deleteUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//------------------- Token Is Valied or not -----------------//

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//------------------- find user by Id -----------------//
router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json(user);
});

router.post("/auth", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    console.log("function started.");
    let options = {
      ldapOpts: {
        url: "ldap://ldap.technikum-wien.at", //url is currect!
        //tlsOptions: { rejectUnauthorized: false },
      },
      userDn: "uid=" + username + ",ou=people,dc=technikum-wien,dc=at",
      userPassword: password,
      userSearchBase: "ou=people,dc=technikum-wien,dc=at",
      usernameAttribute: "uid",
      username: username,
      // starttls: false,
    };
    let user = await authenticate(options);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
