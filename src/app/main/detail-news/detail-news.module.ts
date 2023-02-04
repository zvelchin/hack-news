import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { DetailNewsComponent } from './detail-news.component';

@NgModule({
  declarations: [DetailNewsComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatTreeModule,
    MatIconModule,
  ],
})
export class DetailNewsModule {}
