const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
    ref: {
        type: Number,
    },
    username: {
        type: String,
    },
    password: {
        type: Number,
    }
});

UsersSchema.methods.toListJSONFor = function () {
  return {
    ref: this.ref,
    username: this.username,
    password: this.password,
  };
};

module.exports = mongoose.model("User", UsersSchema);


