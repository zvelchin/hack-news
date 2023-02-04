import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailNewsComponent } from '@main/detail-news/detail-news.component';
import { MainComponent } from '@main/main.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: 'detail-news',
    component: DetailNewsComponent,
  },
  {
    path: '**',
    redirectTo: '/main',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
