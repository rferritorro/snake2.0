var router = require("express").Router();

const HighscoreAvant = require("../../models/highscore_avant.model");


router.post("/", async (req, res) => {
    try {
      let highscore_avant;
      highscore_avant = new HighscoreAvant(req.body);
      await highscore_avant.save();
      res.send(highscore_avant);
    }catch (error) {
      console.log(error);
      res.status(500).send("No se ha creado el usuario");
    }
})

router.get('/', async (req, res) => {
    try {
      const highscore_avant = await HighscoreAvant.find().sort({score:-1});
      if (!highscore_avant) {
        res.status(404).json({ msg: "No existen usuarios" });
      }
      res.json(highscore_avant.map((highscore_avant) => highscore_avant.toListJSONFor()));
    } catch (error) {
      console.log(error);
      res.status(500).send("Hubo un error en usuarios");
    }
  });

  router.get("/:ref_user/:score", async (req, res) => {
    try {
      const highscore_avant = await HighscoreAvant.updateOne({ref_user:req.params.ref_user},{$set: {score:req.params.score}})
      res.json(highscore_avant);
    }catch (error) {
      console.log(error);
      res.status(500).send("No se ha creado el usuario");
    }
  })

  router.get('/:ref_user', async (req, res, next) => {
    await HighscoreAvant.findOne({ ref_user: req.params.ref_user })
  .then(function (HighscoreAvant) {
    if (!HighscoreAvant) {
      return res.sendStatus(404);
    }
    res.json(HighscoreAvant);
    return next();
  })
  .catch(next);
});

module.exports = router;