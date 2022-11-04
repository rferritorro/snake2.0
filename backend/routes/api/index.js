var router = require("express").Router();

router.use("/users", require("./users.routes"))
router.use("/highscore_normal", require("./highscore_normal.routes"))
router.use("/highscore_avant", require("./highscore_avant.routes"))
router.use("/highscore_pro", require("./highscore_pro.routes"))

router.use(function (err, req, res, next) {
    if (err.name === "ValidationError") {
      return res.status(422).json({
        errors: Object.keys(err.errors).reduce(function (errors, key) {
          errors[key] = err.errors[key].message;
  
          return errors;
        }, {}),
      });
    }
  
    return next(err);
});

module.exports = router;