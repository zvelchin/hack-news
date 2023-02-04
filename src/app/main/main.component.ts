import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { INews, NewsService } from '@services/news.service';
import { Subject, finalize, takeUntil } from 'rxjs';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.style.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  public news: INews = {
    nbHits: 0,
    hits: [],
  };
  public loading: boolean = false;
  private _destroy$ = new Subject<void>();
  constructor(private _newsService: NewsService) {}

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  ngOnInit(): void {
    this.loading = true;
    this.getNewsList();
  }

  getNewsList(event?: PageEvent): void {
    this._newsService
      .getAll(event?.pageIndex ? event.pageIndex : 0)
      .pipe(
        takeUntil(this._destroy$),
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: (value) => {
          this.news = value;
        },
      });
  }
}
