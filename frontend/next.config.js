require("dotenv").config();

module.exports = {
  reactStrictMode: true,
  env: {
    SCHEMA_URI: process.env.SCHEMA_URI,
    DEBUG: process.env.NODE_ENV !== "production",
  },
};
