const mongoose = require("mongoose");

const HighscoreProSchema = mongoose.Schema({
    ref_user: {
        type: String,
    },
    score: {
        type: Number,
    }
});

HighscoreProSchema.methods.toListJSONFor = function () {
  return {
    ref_user: this.ref_user,
    score: this.score,
  };
};

module.exports = mongoose.model("HighscorePro", HighscoreProSchema);


