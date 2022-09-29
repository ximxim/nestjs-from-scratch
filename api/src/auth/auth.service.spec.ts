import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        JwtModule.registerAsync({
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            return {
              secret: configService.get('JWT_SECRET'),
              signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
            };
          },
        }),
      ],
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
