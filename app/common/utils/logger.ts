import { green, red, yellow } from '../../../deps.ts';

export class Logger {
  context: string | undefined;
  // @ts-ignore
  log: (msg: string, context?: string) => void;
  // @ts-ignore
  error: (errorMsg: string, errorTrace?: string, context?: string) => void;
  static log: (msg: string, context?: string) => void;
  static error: (errorMsg: string, errorTrace?: string, context?: string) => void;

  constructor(context?: string) {
    this.context = context;
  }
}

const _print = (context: string | undefined, msg: string, isError = false) => {
  const printError = `${isError ? red('[ERROR] ') : ''}`;
  const localeStringOptions = {
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    day: '2-digit',
    month: '2-digit'
  };
  const timestamp = `${green(new Date(Date.now()).toLocaleString(undefined, localeStringOptions))} `;
  const printContext = context ? yellow(`[${context}] `) : '';
  console.log(`${printError}${timestamp}${printContext}${msg}`);
};

Logger.log = (msg: string, context?: string) => {
  _print(context, msg);
};

Logger.prototype.log = function (msg: string, context?: string) {
  const finalCon = context ? context : this.context;
  Logger.log(msg, finalCon);
};

Logger.error = (errorMsg: string, errorTrace?: string, context?: string) => {
  const msg = `${errorMsg}${errorTrace ? ' ' + errorTrace : ''}`;
  _print(context, msg, true);
};

Logger.prototype.error = function (errorMsg: string, errorTrace?: string, context?: string) {
  const finalCon = context ? context : this.context;
  Logger.error(errorMsg, errorTrace, finalCon);
};
