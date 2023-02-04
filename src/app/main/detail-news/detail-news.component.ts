import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IDetailNews, NewsAPI } from 'src/app/api/NewsAPI.service';

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
  loading: boolean = false;
  subscribe: Subscription = new Subscription();

  private _transformer = (node: IDetailNews, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      author: node.author,
      text: node.text,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<IExpandableFlatNode>(
    (node) => node.level,
    (node) => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: IExpandableFlatNode) => node.expandable;

  constructor(
    private _newsService: NewsAPI,
    private _activatedRoute: ActivatedRoute,
  ) {}

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  ngOnInit(): void {
    this.loading = true;
    this.getNewsForDetailPage();
  }

  getNewsForDetailPage(): void {
    this.subscribe = this._newsService
      .getNewsForDetailPage(+this._activatedRoute.snapshot.queryParams['id'])
      .subscribe((value) => {
        this.dataSource.data = [value];

        this.loading = false;
      });
  }
}
