var router = require("express").Router();

const HighscorePro = require("../../models/highscore_pro.model");


router.post("/", async (req, res) => {
    try {
      let highscore_pro;
      highscore_pro = new HighscorePro(req.body);
      await highscore_pro.save();
      res.send(highscore_pro);
    }catch (error) {
      console.log(error);
      res.status(500).send("No se ha creado el usuario");
    }
})

router.get('/', async (req, res) => {
    try {
      const highscore_pro = await HighscorePro.find().sort({score:-1});
      if (!highscore_pro) {
        res.status(404).json({ msg: "No existen usuarios" });
      }
      res.json(highscore_pro.map((highscore_pro) => highscore_pro.toListJSONFor()));
    } catch (error) {
      console.log(error);
      res.status(500).send("Hubo un error en usuarios");
    }
  });

  router.get("/:ref_user/:score", async (req, res) => {
    try {
      const highscore_pro = await HighscorePro.updateOne({ref_user:req.params.ref_user},{$set: {score:req.params.score}})
      res.json(highscore_pro);
    }catch (error) {
      console.log(error);
      res.status(500).send("No se ha creado el usuario");
    }
  })

  router.get('/:ref_user', async (req, res, next) => {
    await HighscorePro.findOne({ ref_user: req.params.ref_user })
  .then(function (HighscorePro) {
    if (!HighscorePro) {
      return res.sendStatus(404);
    }
    res.json(HighscorePro);
    return next();
  })
  .catch(next);
});
module.exports = router;