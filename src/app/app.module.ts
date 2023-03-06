import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { TimelineComponent } from './timeline/timeline.component';
import { MapComponent } from './map/map.component';
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import { MatTableModule } from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from "@angular/material/tabs";

@NgModule({
    declarations: [
        AppComponent,
        IndexComponent,
        ViewComponent,
        TimelineComponent,
        MapComponent,
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
                path: 'view/:id',
                component: ViewComponent
            },
            {
                path: '',
                component: IndexComponent
            },
        ]),
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatTableModule,
        MatListModule,
        MatTabsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
