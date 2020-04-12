import { config } from 'dotenv';

config();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const env = (key: string, _default?: any): any => {
  const result = process.env[key];

  if (!Number.isNaN(Number(result))) {
    return Number(result);
  }

  if (result === 'false') {
    return false;
  }

  if (result === 'true') {
    return true;
  }

  return result === undefined ? _default : result;
};

export { env };
