import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie:{maxAge:360000}
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  
  await app.listen(3000);
}
bootstrap();
