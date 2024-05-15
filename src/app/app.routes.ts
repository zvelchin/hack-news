import { loadRemoteModule } from '@angular-architects/module-federation';
import { RouterModule, Routes } from '@angular/router';
import { DetailNewsComponent } from '@main/detail-news/detail-news.component';
import { MainComponent } from '@main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
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
  { path: '404', component: NotFoundComponent },
  {
    path: '**',
    redirectTo: '404',
  },
];

export const AppRoutingModule = RouterModule.forRoot(appRoutes);
