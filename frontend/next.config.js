require("dotenv").config();

module.exports = {
  reactStrictMode: true,
  future: {
    webpack5: true,
  },
  env: {
    SCHEMA_URI: process.env.SCHEMA_URI,
    DEBUG: process.env.NODE_ENV !== "production",
  },
};
