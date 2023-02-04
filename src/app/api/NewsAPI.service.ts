import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
export class NewsAPI {
  constructor(private _http: HttpClient) {}

  getAll(page: number): Observable<INews> {
    return this._http.get<INews>(
      `http://hn.algolia.com/api/v1/search?tags=front_page`,
      {
        params: { page },
      },
    );
  }

  getNewsForDetailPage(id: number): Observable<IDetailNews> {
    return this._http.get<IDetailNews>(
      `http://hn.algolia.com/api/v1/items/${id}`,
    );
  }
}
