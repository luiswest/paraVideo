import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokonsService } from '../../services/tokons.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(TokonsService).token;
 // console.log(inject(TokonsService).tokenTimeToExp());
  
  const cloneReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })
  return next(cloneReq);
};
