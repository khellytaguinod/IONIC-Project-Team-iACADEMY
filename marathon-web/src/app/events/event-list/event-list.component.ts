import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { EventsService } from '../events.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  events: {id: number, name: string, date: string, time: string, location: string, description: string, imgPath: string}[] = [];

  constructor(private eventsService: EventsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.events = this.eventsService.getEvents();
  }

  onAddEvent() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
