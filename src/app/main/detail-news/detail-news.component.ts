import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';
import { IDetailNews, NewsService } from '@services/news.service';
import { Subject, finalize, takeUntil } from 'rxjs';

interface IExpandableFlatNode {
  expandable: boolean;
  author: string;
  text: string;
  level: number;
}

@Component({
  templateUrl: './detail-news.component.html',
  styleUrls: ['./detail-news.style.scss'],
})
export class DetailNewsComponent implements OnInit, OnDestroy {
  public loading: boolean = false;
  private _destroy$ = new Subject<void>();

  private _transformer = (node: IDetailNews, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      author: node.author,
      text: node.text,
      level: level,
    };
  };

  public treeControl = new FlatTreeControl<IExpandableFlatNode>(
    (node) => node.level,
    (node) => node.expandable,
  );

  private _treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children,
  );

  public dataSource = new MatTreeFlatDataSource(
    this.treeControl,
    this._treeFlattener,
  );

  public hasChild = (_: number, node: IExpandableFlatNode) => node.expandable;

  constructor(
    private _newsService: NewsService,
    private _activatedRoute: ActivatedRoute,
  ) {}

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  ngOnInit(): void {
    this.loading = true;
    this.getNewsForDetailPage();
  }

  public getNewsForDetailPage(): void {
    this._newsService
      .getNewsForDetailPage(+this._activatedRoute.snapshot.queryParams['id'])
      .pipe(
        takeUntil(this._destroy$),
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: (value) => {
          this.dataSource.data = [value];
        },
      });
  }
}
