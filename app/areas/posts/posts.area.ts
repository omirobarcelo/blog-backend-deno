import { Area } from '../../../deps.ts';
import { PostsController } from './posts.controller.ts';

@Area({
  controllers: [PostsController]
})
export class PostsArea {}
