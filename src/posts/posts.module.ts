import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { Post, PostSchema } from 'src/schemas/Post.schema';
import { User, UserSchema } from 'src/schemas/User.schema';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
