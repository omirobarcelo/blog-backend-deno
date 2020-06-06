import { App, Content, Context, CorsBuilder, HttpError } from '../deps.ts';
import { Log } from './middlewares/log.middleware.ts';
import { PostsArea } from './areas/posts/posts.area.ts';
import { Logger } from './common/utils/logger.ts';

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

// Global error handler
app.error((context: Context<any>, error: Error) => {
  Logger.error(error.message, error.stack, 'App');
  context.response.result = Content('Unexpected Server Error', (error as HttpError).httpCode || 500);
  context.response.setImmediately();
});

const PORT = Deno.env.get('PORT') || '8000';
app.listen(`:${PORT}`);
