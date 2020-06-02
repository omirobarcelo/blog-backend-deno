import { blue, cyan, white, yellow } from '../../deps.ts';
import { Context, HttpError, Middleware, MiddlewareTarget } from '../../deps.ts';
import { Logger } from '../common/utils/logger.ts';

@Middleware(new RegExp('/'))
export class Log implements MiddlewareTarget<unknown> {
  onPreRequest(context: Context<unknown>) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  onPostRequest(context: Context<unknown>) {
    return new Promise((resolve, reject) => {
      const printMethod = `${yellow('[')}${white(context.request.method)}${yellow(']')}`;
      const status = context.response.error
        ? (context.response.error as HttpError).httpCode || 500
        : context.response.status
        ? context.response.status
        : 200;
      const printStatus = cyan(status.toString(10));
      const httpVersion = cyan(context.request.serverRequest.proto);
      const localAddr = context.request.serverRequest.conn.localAddr as any;
      const ip = cyan(`${localAddr?.hostname}:${localAddr?.port}`);
      const endpoint = `[${white('route:')} ${blue(context.request.url)}]`;
      Logger.log(`${printMethod} ${printStatus} ${white('|')} ${httpVersion} ${white('|')} ${ip} ${endpoint}`);
      resolve();
    });
  }
}
