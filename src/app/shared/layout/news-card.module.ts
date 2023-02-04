import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NewsCardComponent } from './news-card.component';

@NgModule({
  declarations: [NewsCardComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [NewsCardComponent],
})
export class NewsCardModule {}
