import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { EventsComponent } from './core/events/events.component';
import { HeaderComponent } from './core/header/header.component';
import { EventListComponent } from './core/events/event-list/event-list.component';
import { EventComponent } from './core/events/event-list/event/event.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EventsComponent,
    HeaderComponent,
    EventListComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
