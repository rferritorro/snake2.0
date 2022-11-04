var router = require("express").Router();

const HighscoreNormal = require("../../models/highscore_normal.model");


router.post("/", async (req, res) => {
    try {
      let highscore_normal;
      highscore_normal = new HighscoreNormal(req.body);
      await highscore_normal.save();
      res.send(highscore_normal);
    }catch (error) {
      console.log(error);
      res.status(500).send("No se ha creado el usuario");
    }
})

router.get("/:ref_user/:score", async (req, res) => {
  try {
    const highscore_normal = await HighscoreNormal.updateOne({ref_user:req.params.ref_user},{$set: {score:req.params.score}})
    res.json(highscore_normal);
  }catch (error) {
    console.log(error);
    res.status(500).send("No se ha creado el usuario");
  }
})

router.get('/', async (req, res) => {
    try {
      const highscore_normal = await HighscoreNormal.find().sort({score:-1});
      if (!highscore_normal) {
        res.status(404).json({ msg: "No existen usuarios" });
      }
      res.json(highscore_normal.map((highscore_normal) => highscore_normal.toListJSONFor()));
    } catch (error) {
      console.log(error);
      res.status(500).send("Hubo un error en usuarios");
    }
  });

  router.get('/:ref_user', async (req, res, next) => {
    await HighscoreNormal.findOne({ ref_user: req.params.ref_user })
  .then(function (HighscoreNormal) {
    if (!HighscoreNormal) {
      return res.sendStatus(404);
    }
    res.json(HighscoreNormal);
    return next();
  })
  .catch(next);
});

module.exports = router;