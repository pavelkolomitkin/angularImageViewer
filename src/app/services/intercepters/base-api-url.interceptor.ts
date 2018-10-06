import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs/internal/Observable';


export class BaseApiUrlInterceptor implements HttpInterceptor
{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const newRequest = req.clone({
            url: environment.baseApiUrl + req.url
        });

        return next.handle(newRequest);
    }

}
