import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  token: string = environment.api_key;

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const req = request.clone({
      ...request,
      headers: request.headers.set('Authorization', `Bearer ${this.token}`),
      url: request.url.includes('everything') ? 
           `${request.url}?qInTitle=news` : 
           `${request.url}?country=ng`
    })
    return next.handle(req);
  }
}
