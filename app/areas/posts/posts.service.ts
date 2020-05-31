import { join, normalize } from '../../../deps.ts';
import { readJson } from '../../../deps.ts';
import { Response, serveFile } from '../../../deps.ts';
import { Post } from './interfaces/post.interface.ts';

export class PostsService {
  private CWD = '.';

  constructor() {
    this.CWD = Deno.cwd();
  }

  /**
   * Reads JSON with available posts
   */
  async getPosts(): Promise<Post[]> {
    return readJson(`${this.CWD}/post_list.json`) as Promise<Post[]>;
  }

  /**
   * Serves the requested post
   * @param id 
   * @param req Request that serves the file
   */
  async getPost(id: string, req: any): Promise<Response> {
    const postLocations = (await readJson(`${this.CWD}/post_loc.json`)) as { [id: string]: string };
    return serveFile(req, normalize(join(this.CWD, postLocations[id])));
  }
}
