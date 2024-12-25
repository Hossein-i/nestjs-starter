import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

export const Cookies = (...args: string[]) =>
  createParamDecorator((data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.cookies?.[data] : request.cookies;
  });
