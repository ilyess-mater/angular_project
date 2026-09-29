import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {

  count=0;
  //signal
  counts = signal(0);

  incrementSimple() {
    this.count++;
  }

  increment() {
    this.counts.update(v => v + 1);
}}
