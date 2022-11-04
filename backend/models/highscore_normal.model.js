const mongoose = require("mongoose");

const HighscoreNormalSchema = mongoose.Schema({
    ref_user: {
        type: String,
    },
    score: {
        type: Number,
    }
});

HighscoreNormalSchema.methods.toListJSONFor = function () {
  return {
    ref_user: this.ref_user,
    score: this.score,
  };
};

module.exports = mongoose.model("HighscoreNormal", HighscoreNormalSchema);


