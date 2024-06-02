import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { APP_GUARD } from '@nestjs/core'
import * as path from 'path'
import { PostsModule } from './posts/posts.module'
import { getConfig } from './utils/config'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { JwtStrategy } from './auth/jwt/jwt.strategy'
import { JwtGuard } from './auth/jwt/jwt.guard'


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [getConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService): TypeOrmModuleOptions {
        const mysql = config.get('databases.mysql')
        return {
          type: 'mysql',
          host: mysql.host,
          port: mysql.port,
          username: mysql.user,
          password: mysql.password,
          database: mysql.database,
          entities: [path.join(__dirname, '/**/*.entity{.ts,.js}')],
          synchronize: true
        }
      }
    }),
    AuthModule,
    PostsModule,
    UsersModule],
  controllers: [],
  providers: [
    {
    provide: APP_GUARD,
    useClass: JwtGuard
  },
    JwtStrategy
  ]
})
export class AppModule {}
