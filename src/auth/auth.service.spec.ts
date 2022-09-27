import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should vaildate correct credentials', async () => {
    const result = await service.validateUser('john', 'changeme');
    expect(result.username).toEqual('john');
  });

  it('should invalidate incorrect credentials', async () => {
    const result = await service.validateUser('azim', 'changeme');
    expect(result).toBeNull();
  });
});
