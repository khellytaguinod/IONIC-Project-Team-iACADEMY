export class EventsService {
  private events = [
    {
      id: 1,
      name: 'Marathon 1',
      date: 'January 22, 2018',
      time: '6:00 AM',
      location: 'Cebu, Philippines',
      description: 'Longest footrace ever in country.',
      imgPath: 'http://cdn-img.instyle.com/sites/default/files/images/2017/02/020516-royalfootrace-embed.jpg'
    },
    {
      id: 2,
      name: 'Marathon 2',
      date: 'January 22, 2018',
      time: '6:00 AM',
      location: 'Cebu, Philippines',
      description: 'Longest footrace ever in country.',
      imgPath: 'http://cdn-img.instyle.com/sites/default/files/images/2017/02/020516-royalfootrace-embed.jpg'
    },
    {
      id: 3,
      name: 'Marathon 3',
      date: 'January 22, 2018',
      time: '6:00 AM',
      location: 'Cebu, Philippines',
      description: 'Longest footrace ever in country.',
      imgPath: 'http://cdn-img.instyle.com/sites/default/files/images/2017/02/020516-royalfootrace-embed.jpg'
    }
  ];

  getEvents() {
    return this.events;
  }

  getEvent(id: number) {
    const event = this.events.find(
      ev => {
        return ev.id === id;
      }
    );
    return event;
  }
}