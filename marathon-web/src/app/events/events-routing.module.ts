import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsComponent } from './events.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventComponent } from './event/event.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventsService } from './events.service';

const eventsRoutes: Routes = [
  {path: '', component: EventsComponent, children: [
    {path: '', component: EventListComponent},
    // {path: ':id', component: EventComponent},
    // {path: ':id/edit', component: EventEditComponent},
    {path: 'new', component: EventEditComponent}
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(eventsRoutes)
  ],
  exports: [RouterModule],
  providers: [EventsService]
})
export class EventsRoutingModule {}
