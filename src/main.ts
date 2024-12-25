import type { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Versioning allows you to have different versions of your controllers or individual routes running within the same application.
  app.enableVersioning();

  // Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
  // Generally, Helmet is just a collection of smaller middleware functions that set security-related HTTP headers
  app.use(helmet());

  // Cross-origin resource sharing (CORS) is a mechanism that allows resources to be requested from another domain.
  const corsOptions: CorsOptions = {};
  app.enableCors(corsOptions);

  // Cross-site request forgery (CSRF or XSRF) is a type of attack where unauthorized commands are sent from a trusted user to a web application.
  // const doubleCsrfOptions: DoubleCsrfConfigOptions = {
  //   getSecret: () => 'Secret', // A function that optionally takes the request and returns a secret
  //   getSessionIdentifier: (req) => '', // A function that should return the session identifier for a given request
  //   cookieName: '__Host-psifi.x-csrf-token', // The name of the cookie to be used, recommend using Host prefix.
  //   cookieOptions: {
  //     sameSite: 'lax', // Recommend you make this strict if posible
  //     path: '/',
  //     secure: true,
  //     // ...remainingCookieOptions, // See cookieOptions below
  //   },
  //   size: 64, // The size of the generated tokens in bits
  //   ignoredMethods: ['GET', 'HEAD', 'OPTIONS'], // A list of request methods that will not be protected.
  //   getTokenFromRequest: (req) => req.headers['x-csrf-token'], // A function that returns the token from the request
  // };
  // const {
  //   invalidCsrfTokenError, // This is provided purely for convenience if you plan on creating your own middleware.
  //   generateToken, // Use this in your routes to generate and provide a CSRF hash, along with a token cookie and token.
  //   validateRequest, // Also a convenience if you plan on making your own middleware.
  //   doubleCsrfProtection, // This is the default CSRF protection middleware.
  // } = doubleCsrf(doubleCsrfOptions);
  // app.use(doubleCsrfProtection);

  // An HTTP cookie is a small piece of data stored by the user's browser.
  // Cookies were designed to be a reliable mechanism for websites to remember stateful information.
  // When the user visits the website again, the cookie is automatically sent with the request.
  app.use(cookieParser());

  // HTTP sessions provide a way to store information about the user across multiple requests, which is particularly useful for MVC applications.
  // app.use(
  //   session({
  //     secret: 'my-secret',
  //     resave: false,
  //     saveUninitialized: false,
  //   }),
  // );

  // The OpenAPI specification is a language-agnostic definition format used to describe RESTful APIs.
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
