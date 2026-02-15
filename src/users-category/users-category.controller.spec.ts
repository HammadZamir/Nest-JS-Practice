import { Test, TestingModule } from '@nestjs/testing';
import { UsersCategoryController } from './users-category.controller';

describe('UsersCategoryController', () => {
  let controller: UsersCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersCategoryController],
    }).compile();

    controller = module.get<UsersCategoryController>(UsersCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
