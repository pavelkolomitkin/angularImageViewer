import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PhotoModel} from '../models/photo.model';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class PhotoProviderService
{
    constructor(private http: HttpClient) {}

    getImages(limit: number = 10, offset: number = 0): Observable<Array<PhotoModel>>
    {
        return this.http.get<Array<PhotoModel>>('photos', {
            params: {
                '_limit': String(limit),
                '_start': String(offset)
            }
        });
    }
}