import { Component, inject, input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConferenceService } from '../../conference-service';
import { Conference } from '../../models/conference';

@Component({
  selector: 'app-conference-details',
  imports: [RouterLink],
  templateUrl: './conference-details.html',
  styleUrl: './conference-details.css',
})
export class ConferenceDetails implements OnInit {
  // Bound from route parameter /details/:id
  id = input.required<string>();

  private conferenceService = inject(ConferenceService);

  conference = signal<Conference | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.conferenceService.getConferenceById(Number(this.id())).subscribe({
      next: (data) => {
        this.conference.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Conférence introuvable.');
        this.loading.set(false);
      },
    });
  }
}
