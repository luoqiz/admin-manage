import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BaseInterceptorService {

  private tokenValue: string;

  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /*设置请求的基地址，方便替换*/
    const baseUrl = 'http://127.0.0.1:20010';
    let authReq;

    /** 判断是否有有效的token认证 **/
    // if (req.url.startsWith('/oauth/token')) {
    //   authReq = req.clone({
    //     url: baseUrl + req.url,
    //     setHeaders: { Authorization: 'Basic Ym95YTpib3lhLXNlY3JldA==', Accept: '*/*' }
    //   });
    // } else {
    //   if (!sessionStorage.getItem('token')) {
    //     this.router.navigate(['/']);
    //   } else {
    //     authReq = req.clone({
    //       url: baseUrl + req.url,
    //       setHeaders: { access_token: sessionStorage.getItem('token') }
    //     });
    //   }
    // }


    authReq = req.clone({
      url: baseUrl + req.url,
      setHeaders: {access_token: sessionStorage.getItem('token')}
    });

    console.log(authReq);
    // send cloned request with header to the next handler.
    return next.handle(authReq)
      .pipe(
        /*失败时重试2次，可自由设置*/
        retry(1),
        /*捕获响应错误，可根据需要自行改写，我偷懒了，直接用的官方的*/
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
