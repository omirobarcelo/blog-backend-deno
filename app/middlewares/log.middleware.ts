import { blue, cyan, white, yellow } from '../../deps.ts';
import { Context, Middleware, MiddlewareTarget } from '../../deps.ts';

@Middleware(new RegExp('/'))
export class Log implements MiddlewareTarget<unknown> {
  onPreRequest(context: Context<unknown>) {
    return new Promise((resolve, reject) => {
      const printMethod = `${yellow('[')}${white(context.request.method)}${yellow(']')}`;
      // const printStatus = cyan(res.status);
      const httpVersion = cyan(context.request.serverRequest.proto);
      const localAddr = context.request.serverRequest.conn.localAddr as any;
      const ip = cyan(`${localAddr?.hostname}:${localAddr?.port}`);
      const endpoint = `[${white('route:')} ${blue(context.request.url)}]`;
      console.log(
        `${printMethod} ${white('|')} ${httpVersion} ${white('|')} ${ip} ${endpoint}`
      );
      resolve();
    });
  }

  onPostRequest(context: Context<unknown>) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
}
