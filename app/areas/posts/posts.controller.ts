import { Controller, Get, Param, Req, ServerRequest } from '../../../deps.ts';
import { PostsService } from './posts.service.ts';
import { Post } from './interfaces/post.interface.ts';

@Controller('/posts')
export class PostsController {
  constructor(private _service: PostsService) {}

  @Get()
  async list(): Promise<Post[]> {
    return this._service.getPosts();
  }

  @Get('/:id')
  async blogPost(@Param('id') id: string, @Req() req: ServerRequest) {
    const res = await this._service.getPost(id, req);
    // TODO when serving frontend, check if this line is still necessary or it's done automatically by the CorsBuilder
    res.headers?.set('Access-Control-Allow-Origin', '*');
    return req.respond(res);
  }
}
