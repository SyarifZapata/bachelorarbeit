import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedsContainerComponent } from './feeds-container/feeds-container.component';
import { FeedComponent } from './feeds-container/feed/feed.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedsContainerComponent,
    FeedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
