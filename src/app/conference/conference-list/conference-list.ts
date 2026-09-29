import { Component } from '@angular/core';
import { ConferenceDetails } from '../conference-details/conference-details';

@Component({
  selector: 'app-conference-list',
  imports: [ConferenceDetails],
  templateUrl: './conference-list.html',
  styleUrl: './conference-list.css',
})
export class ConferenceList {
  conferences: any[] = [
    {
      name: 'Conference 1',
      date: '2023-01-15',
      location: 'New York',
    },
    {
      name: 'Conference 2',
      date: '2023-02-20',
      location: 'Los Angeles',
    },
    {
      name: 'Conference 3',
      date: '2023-03-10',
      location: 'Chicago',
    },
  ];

  count = 0;

  increment() {
    this.count++;
  }
}
