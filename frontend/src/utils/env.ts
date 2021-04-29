import getConfig from "next/config";
import isServer from "./isServer";

const env = (key: string, defaultValue: string): string => {
  if (isServer()) {
    return process.env[key] || defaultValue;
  }

  const { publicRuntimeConfig } = getConfig();

  return publicRuntimeConfig[key] || defaultValue;
};

export default env;
