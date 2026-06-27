import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokensService } from '../../services/tokens.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(inject(TokensService).tiempoExpToken());
  
  const token = inject(TokensService).token;
  const cloneReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })
  return next(cloneReq);
};
