import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.style.scss'],
})
export class AppComponent {
  public Title = 'hack-news';
  public ImgSrc = 'src/assets/images/header-logo.svg';

  constructor(private _router: Router) {}

  public goToMicroFrontend(): void {
    this._router.navigate(['/test']);
  }
}
