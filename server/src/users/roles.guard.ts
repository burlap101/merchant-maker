import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log("roles:", roles);
    if (!roles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    console.log("user:", user);
    return roles.includes(user.role);
  }
}
