import { NestFactory } from '@nestjs/core'
import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const port = configService.get('port')

  app.setGlobalPrefix('api')
    .useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('Blogs API')
    .setDescription('Backend project')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/swagger', app, document)

  await app.listen(port, () => {
    Logger.log(`Server is running on ${port} port`)
  })
}

bootstrap()
