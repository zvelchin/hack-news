import { HttpEventType } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { INews, NewsService } from '@services/news.service';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.style.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  public news: INews = {
    nbHits: 0,
    hits: [],
  };
  public mode: ProgressSpinnerMode = 'indeterminate';
  public loading = true;
  public progress = 0;
  private _destroy$ = new Subject<void>();

  constructor(
    private _newsService: NewsService,
    private _matSnackBar: MatSnackBar,
  ) {}

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public ngOnInit(): void {
    this.getNewsList();
  }

  public getNewsList(pageEvent?: PageEvent): void {
    this._newsService
      .getAll(pageEvent?.pageIndex ?? 0)
      .pipe(
        finalize(() => {
          this.loading = false;
          if (this.mode === 'indeterminate') {
            this.progress = 0;
          }
        }),
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: (httpEvent) => {
          switch (httpEvent.type) {
            case HttpEventType.Sent:
              this.loading = true;
              this.progress = 0;
              this.mode = 'indeterminate';
              break;

            case HttpEventType.DownloadProgress:
              if (httpEvent.total) {
                this.mode = 'determinate';
                this.progress = Math.round(
                  (100 * httpEvent.loaded) / httpEvent.total,
                );
              } else {
                this.mode = 'indeterminate';
              }
              break;

            case HttpEventType.Response:
              this.loading = false;
              this.news = httpEvent.body ?? this.news;
              this.progress = 100;
              this.mode = 'determinate';
              break;
          }
        },
        error: (err) => {
          this._matSnackBar.open(err, undefined, {
            panelClass: 'error',
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 2000,
          });
        },
      });
  }
}
