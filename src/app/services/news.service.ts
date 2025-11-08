import { HttpClient, HttpEvent, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

export interface IDetailNews {
  author: string;
  text: string;
  children?: IDetailNews[];
}

export interface INewsList {
  author: string;
  url: string;
  points: number;
  num_comments: number;
  objectID: number;
}

export interface INews {
  nbHits: number;
  hits: INewsList[];
}

@Injectable()
export class NewsService {
  constructor(private _http: HttpClient) {}

  /** News List
   * @param page - number of page
   */
  public getAll(page: number): Observable<HttpEvent<INews>> {
    return this._http.get<INews>(`/api/v1/search?tags=front_page`, {
      params: { page },
      reportProgress: true,
      observe: 'events',
    });
  }

  /** News Info
   * @param id - id of news
   */
  public getNewsForDetailPage(id: number): Observable<IDetailNews> {
    return this._http.get<IDetailNews>(`/api/v1/items/${id}`).pipe(
      catchError((res: HttpResponseBase) => {
        return throwError(() => new Error(res.statusText));
      }),
    );
  }
}
