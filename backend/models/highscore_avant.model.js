const mongoose = require("mongoose");

const HighscoreAvantSchema = mongoose.Schema({
    ref_user: {
        type: String,
    },
    score: {
        type: Number,
    }
});

HighscoreAvantSchema.methods.toListJSONFor = function () {
  return {
    ref_user: this.ref_user,
    score: this.score,
  };
};

module.exports = mongoose.model("HighscoreAvant", HighscoreAvantSchema);


