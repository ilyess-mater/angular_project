import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-conference-details',
  templateUrl: './conference-details.html',
  styleUrl: './conference-details.css',
})
export class ConferenceDetails {
  conference = input<any>();
  increment = output();

  incrementCount() {
    this.increment.emit();
  }
}
