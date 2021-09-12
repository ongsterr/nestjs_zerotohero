import { registerAs } from '@nestjs/config'

export const devConfig = registerAs('dev', () => ({
  database: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    autoLoadEntities: true,
    logging: true,
    synchronize: true,
  },
  auth: {
    jwt: {
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 3600,
      },
    },
  },
}))

export const prodConfig = registerAs('prod', () => ({}))
