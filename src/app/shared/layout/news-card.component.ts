import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { INewsList } from '@services/news.service';

@Component({
  selector: 'news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.style.scss'],
})
export class NewsCardComponent {
  @Input() item: INewsList | undefined;

  constructor(private _router: Router) {
    this.item = undefined;
  }

  goToDetailPage(): void {
    this._router.navigate(['/detail-news'], {
      queryParams: { id: this.item?.objectID },
    });
  }
}
