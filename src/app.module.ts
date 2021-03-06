import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TasksModule } from './tasks/tasks.module'
import { AuthModule } from './auth/auth.module'

import { ConfigModule, ConfigService } from '@nestjs/config'
import { configValidationSchema } from './config/config.schema'
import { devConfig, prodConfig } from './config/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.stage.${process.env.STAGE}`,
      isGlobal: true,
      load: [process.env.STAGE === 'prod' ? prodConfig : devConfig],
      validationSchema: configValidationSchema,
    }),
    TasksModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get('STAGE') === 'prod'
        return {
          ssl: isProduction,
          extra: {
            ssl: isProduction ? { rejectUnauthorized: false } : null,
          },
          ...configService.get(`${process.env.STAGE}.database`),
        }
      },
    }),
    AuthModule,
  ],
})
export class AppModule {}
