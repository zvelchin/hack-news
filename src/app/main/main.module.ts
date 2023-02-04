import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NewsCardModule } from '../shared/layout/news-card.module';
import { MainComponent } from './main.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    NewsCardModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
})
export class MainModule {}
