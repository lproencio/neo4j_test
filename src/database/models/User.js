const instance = require("../index.js");

const User = instance.model("User", {
  id: {
    type: "uuid",
    primary: true,
  },
  name: {
    type: "string",
  },
  cpf: { type: "string", unique: "true", required: true, length: 11 },
  email: { type: "email", unique: "true", required: true },
  phone: { type: "string" },
  is_active: { type: "boolean", default: true },
  created_at: { type: "datetime" },
  updated_at: { type: "datetime" },
});

module.exports = User;
