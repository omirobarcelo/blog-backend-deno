import { App, CorsBuilder } from '../deps.ts';
import { Log } from './middlewares/log.middleware.ts';
import { PostsArea } from './areas/posts/posts.area.ts';

const app = new App({
  areas: [PostsArea],
  middlewares: [Log]
});

app.useCors(
  new CorsBuilder()
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .WithHeaders(['Origin', 'X-Requested-With', 'Authorization', 'Content-Type', 'Accept'].join(','))
);

app.useStatic({
  root: `${Deno.cwd()}/public`
});

app.listen();