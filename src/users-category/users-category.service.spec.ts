import { Test, TestingModule } from '@nestjs/testing';
import { UsersCategoryService } from './users-category.service';

describe('UsersCategoryService', () => {
  let service: UsersCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersCategoryService],
    }).compile();

    service = module.get<UsersCategoryService>(UsersCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
