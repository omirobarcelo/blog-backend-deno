import { readJson } from '../../../deps.ts';
import { serveFile } from '../../../deps.ts';
import { Controller, Get, Param, Req, ServerRequest } from '../../../deps.ts';
import { PostsService } from './posts.service.ts';

interface Doc {
  id: string;
  name: string;
}

@Controller('/posts')
export class PostsController {
  constructor(private service: PostsService) {}

  @Get()
  async list() {
    const CWD = Deno.cwd();
    console.log(CWD);
    const docs = (await readJson(`${CWD}/doc_list.json`)) as Doc[];
    console.log(docs);
    return docs;
  }

  @Get('/:id')
  async blogPost(@Param('id') id: string, @Req() req: ServerRequest) {
    console.log(id);
    const CWD = Deno.cwd();
    // return req.respond(await serveFile(req as any, `${CWD}/docs/${id}.html`));
    const res = await serveFile(req as any, `${CWD}/docs/${id}.html`);
    res.headers?.set('Access-Control-Allow-Origin', '*');
    return req.respond(res);
  }
}
