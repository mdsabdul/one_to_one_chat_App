var express = require('express');
var router = express.Router();
const User = require("../models/userschema")
const passport = require("passport")
const localStretegy = require("passport-local")
passport.use(new localStretegy(User.authenticate()))
/* GET home page. */
router.get('/', isLoggedIn, function (req, res, next) {
  const user = req.user
  res.render('index', { user });
});
router.get('/register', function (req, res, next) {
  res.render("register", { user: req.user });
});
router.post('/register', async function (req, res, next) {
  try {
    const { username, profileimage, password } = req.body
    await User.register({ username, profileimage }, password)
    res.redirect("/");
  } catch (error) {
    res.send(error)
  }
});

router.get("/login", function (req, res, next) {
  res.render("login")
})
router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login"
}
)
)

router.get("/getOnlineUser" ,isLoggedIn , async function(req,res,next){
  // const onlineUser= req.onlineUser
  const loggedInUser = req.user
  const onlineUsers = await User.find({
    socketId:{$ne: ""},
    _id:{$ne: loggedInUser._id}
  })

  res.status(200).json({onlineUsers})
})


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect("/login")
  }
}

module.exports = router;