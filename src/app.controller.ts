import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, UserModel } from './entity/user.entity';
import {
  Between,
  Equal,
  ILike,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';
import { ProfileModel } from './entity/profile.entity';
import { PostModel } from './entity/post.entity';
import { TagModel } from './entity/tag.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
  ) {}

  @Post('users')
  postUser() {
    return this.userRepository.save({});
  }

  @Get('users')
  getUsers() {
    return this.userRepository.find({
      // 어떤 프로퍼티를 선택할지 결정 (default: 모든 프로퍼티)
      // 만약 select을 정의하면, 정의된 프로퍼티만 가져온다
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        version: true,
        email: true,
        profile: {
          id: true,
        },
      },
      /** typeorm utilies */
      where: {
        // id: Not(3) // 아닌 경우
        // id: LessThan(4) // 적은 경우
        // id: LessThanOrEqual(4) // 적거나 같은 경우
        // id: MoreThan(3) // 많은 경우
        // id: MoreThanOrEqual(3) // 많거나 같은 경우
        // id: Equal(3), // 같은 경우
        // email: Like('%%AI0') // 유사값 (대소문자 구분)
        // email: ILike('%%AI0') // 유사값 (대소문자 구분 X)
        // id: Between(3, 4) // 사이값
        // id: In([1, 3]) // 해당되는 값
        // id: IsNull() // null인 값
      },

      // 필터링 조건 (AND: 객체, OR: 배열)
      // where: [
      //   {
      //     id: 1,
      //   },
      //   {
      //     version: 1,
      //   },
      // ],
      // where: {
      //   id: 1,
      //   version: 1,
      // },

      // 관계를 가져옴
      relations: {
        profile: true,
      },
      // 정렬 (ASC: 오름차순, DESC: 내림차순)
      order: {
        id: 'DESC',
      },
      // 처음 몇개를 제외할지 (default: 0)
      skip: 0,
      // 몇개를 가져올지 (default: 0)
      take: 0,
    });
  }

  @Patch('users/:id')
  async patchUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: +id,
      },
    });
    return this.userRepository.save({
      ...user,
      email: user.email + '0',
    });
  }

  @Delete('user/profile/:id')
  async deleteProfile(@Param('id') id: string) {
    await this.profileRepository.delete(+id);
  }

  @Post('user/profile')
  async createUserAndProfile() {
    const user = await this.userRepository.save({
      email: 'test@codefactory.ai',
      profile: {
        profileImg: 'asd.jpg',
      },
    });

    // const profile = await this.profileRepository.save({
    //   profileImg: 'asd.jpg',
    //   user,
    // });

    return user;
  }

  @Post('user/post')
  async createUserAndPosts() {
    const user = await this.userRepository.save({
      email: 'postuser@codefactory.ai',
    });

    await this.postRepository.save({
      author: user,
      title: 'post 1',
    });

    await this.postRepository.save({
      author: user,
      title: 'post 2',
    });

    return user;
  }

  @Post('posts/tags')
  async createPostsTags() {
    const post1 = await this.postRepository.save({
      title: 'NestJS Lecture',
    });
    const post2 = await this.postRepository.save({
      title: 'Programming Lecture',
    });

    const tag1 = await this.tagRepository.save({
      name: 'Javascript',
      posts: [post1, post2],
    });
    const tag2 = await this.tagRepository.save({
      name: 'Typescript',
      posts: [post1],
    });

    const post3 = await this.postRepository.save({
      title: 'NextJS Lecture',
      tags: [tag1, tag2],
    });

    return true;
  }

  @Get('posts')
  getPosts() {
    return this.postRepository.find({
      relations: {
        tags: true,
      },
    });
  }

  @Get('tags')
  getTags() {
    return this.tagRepository.find({
      relations: {
        posts: true,
      },
    });
  }
}
