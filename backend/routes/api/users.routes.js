var router = require("express").Router();

const User = require("../../models/users.model");


router.post("/", async (req, res) => {
    try {
      let user;
      user = new User(req.body);
      await user.save();
      res.send(user);
    }catch (error) {
      console.log(error);
      res.status(500).send("No se ha creado el usuario");
    }
})

router.get('/', async (req, res) => {
    try {
      const users = await User.find({});
      if (!users) {
        res.status(404).json({ msg: "No existen usuarios" });
      }
      res.json(users.map((users) => users.toListJSONFor()));
    } catch (error) {
      console.log(error);
      res.status(500).send("Hubo un error en usuarios");
    }
  });

  router.get('/:username', async (req, res, next) => {
      await User.findOne({ username: req.params.username })
    .then(function (User) {
      if (!User) {
        return res.sendStatus(404);
      }
      res.json(User);
      return next();
    })
    .catch(next);
  });

module.exports = router;