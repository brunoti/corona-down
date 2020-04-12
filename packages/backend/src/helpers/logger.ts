import * as moment from 'moment';

const isTesting = () => process.env.NODE_ENV === 'test';

const logText = (text: string): string[] => [`[${moment().format('Y-MM-DD H:mm:ss')}]`, text];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const makeLogger = (logger: (...message: any[]) => void) => (...items: Array<string>) => items.map(logText)
  .forEach(t => !isTesting() && logger(...t));

export const logger = {
  info: makeLogger(console.log),
  error: makeLogger(console.error),
};
 
