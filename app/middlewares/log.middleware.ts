import { blue, cyan, white, yellow } from '../../deps.ts';
import { Middleware, MiddlewareTarget } from '../../deps.ts';

@Middleware(new RegExp('/'))
export class Log implements MiddlewareTarget {
  onPreRequest(req: any, res: any) {
    return new Promise((resolve, reject) => {
      const printMethod = `${yellow('[')}${white(req.method)}${yellow(']')}`;
      // const printStatus = cyan(res.status);
      const httpVersion = cyan(req.proto);
      const ip = cyan(`${req.conn.localAddr.hostname}:${req.conn.localAddr.port}`);
      const endpoint = `[${white('route:')} ${blue(req.url)}]`;
      console.log(
        `${printMethod} ${white('|')} ${httpVersion} ${white('|')} ${ip} ${endpoint}`
      );
      resolve();
    });
  }

  onPostRequest(req: any, res: any) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
}
