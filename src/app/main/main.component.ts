import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { INews, NewsAPI } from '../api/NewsAPI.service';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.style.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  news: INews = {
    nbHits: 0,
    hits: [],
  };
  loading: boolean = false;
  subscribe: Subscription = new Subscription();
  constructor(private _newsService: NewsAPI) {}

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  ngOnInit(): void {
    this.loading = true;
    this.getNewsList();
  }

  getNewsList(event?: PageEvent): void {
    this.subscribe = this._newsService
      .getAll(event?.pageIndex ? event.pageIndex : 0)
      .subscribe((value) => {
        this.news = value;
        this.loading = false;
      });
  }
}
