import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { TimelineComponent } from './timeline/timeline.component';
import { MapComponent } from './map/map.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ViewComponent,
    TimelineComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
          {
            path: 'index',
            component: IndexComponent
          },
          {
            path: 'view',
            component: ViewComponent
          },
          {
            path: '',
            component: AppComponent
          },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
