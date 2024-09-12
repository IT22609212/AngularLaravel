import { HttpInterceptorFn } from '@angular/common/http';
import { AuthServiceService } from './UserReg/auth-service.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  
  const authService = inject(AuthServiceService);
  const token = authService.getToken();

  
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req);
};
