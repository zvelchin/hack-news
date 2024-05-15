import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DetailNewsModule } from '@main/detail-news/detail-news.module';
import { MainModule } from '@main/main.module';
import { NewsService } from '@services/news.service';
import { AppComponent } from './app.component';
import { NotFoundModule } from './not-found/not-found.module';
import { AppRoutingModule } from './app.routes';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    MainModule,
    DetailNewsModule,
    NotFoundModule,
  ],
  providers: [NewsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
