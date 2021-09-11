import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersRepository } from './users.repository'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([UsersRepository]),
  ], // dependency injection for users repository
  providers: [AuthService, JwtStrategy], // Makes JwtStrategy available within the module
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule], // AuthModule to export 2 things - allow any other modules that import this module to access this auth mechanism
})
export class AuthModule {}
