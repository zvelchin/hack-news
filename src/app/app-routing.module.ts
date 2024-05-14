import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailNewsComponent } from '@main/detail-news/detail-news.component';
import { MainComponent } from '@main/main.component';
import { loadRemoteModule } from '@angular-architects/module-federation';

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
    path: 'test',
    loadChildren: () =>
      loadRemoteModule({
        remoteName: 'test',
        remoteEntry: 'http://localhost:4200/remoteEntry.js',
        exposedModule: './TestModule',
      }).then((m) => m.TestModule),
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
