import {
   CanActivate, ExecutionContext,
   Injectable, UnauthorizedException
 } from '@nestjs/common';
 import { JwtService } from '@nestjs/jwt';
 import { APP_KEY } from '../utils/constants';
 import { Request } from 'express';

 @Injectable()
 export class AuthGuard implements CanActivate {
   constructor(private jwtService: JwtService) {}

   async canActivate(context: ExecutionContext): Promise<boolean> {
     const request = context.switchToHttp().getRequest();
     const token = this.extractTokenFromHeader(request);
     await this.verifyToken(request, token)
     return true;
   }

   private async verifyToken(request: Request, token: string){
      if (!token) throw new UnauthorizedException();
      try {
        const payload = await this.jwtService.verifyAsync(token, { secret: APP_KEY })
        request['user'] = payload;
      } catch {
        throw new UnauthorizedException();
      }
   }

   private extractTokenFromHeader(request: Request): string | undefined {
     const [type, token] = request.headers.authorization?.split(' ') ?? [];
     return type === 'Bearer' ? token : undefined;
   }
 }
