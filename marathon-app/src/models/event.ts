import { Location } from './location';

export class Event {

  constructor(public name: string,
              public description: string,
              public date: string,
              public time: string,
              public imageUrls: string,
              public location: string,
              public route: Location
  ) {}

}
