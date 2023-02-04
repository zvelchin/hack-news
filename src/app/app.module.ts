import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NewsAPI } from './api/NewsAPI.service';
import { MainModule } from './main/main.module';
import { HttpClientModule } from '@angular/common/http';
import { DetailNewsModule } from './main/detail-news/detail-news.module';

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
  ],
  providers: [NewsAPI],
  bootstrap: [AppComponent],
})
export class AppModule {}
