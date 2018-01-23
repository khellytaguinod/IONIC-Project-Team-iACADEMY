import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Data } from '@angular/router';

import { EventsService } from '../events.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  event: {id: number, name: string, date: string, time: string, location: string, description: string, imgPath: string};

  constructor(private eventsService: EventsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.data
    .subscribe((data: Data) => {
      this.event = data['event'];
    });
  }

}
