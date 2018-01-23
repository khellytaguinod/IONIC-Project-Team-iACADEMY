import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { EventComponent } from './events/event/event.component';
import { EventEditComponent } from './events/event-edit/event-edit.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'events', loadChildren: './events/events.module#EventsModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
