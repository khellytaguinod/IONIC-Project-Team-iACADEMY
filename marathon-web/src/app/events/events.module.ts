import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsComponent } from './events.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventComponent } from './event/event.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventsRoutingModule } from './events-routing.module';

@NgModule({
  declarations: [
    EventsComponent,
    EventListComponent,
    EventComponent,
    EventEditComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
  ]
})
export class EventsModule {}
