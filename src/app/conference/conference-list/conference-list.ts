import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConferenceService } from '../../conference-service';
import { Conference } from '../../models/conference';

@Component({
  selector: 'app-conference-list',
  imports: [RouterLink],
  templateUrl: './conference-list.html',
  styleUrl: './conference-list.css',
})
export class ConferenceList implements OnInit {
  private conferenceService = inject(ConferenceService);

  conferences = signal<Conference[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loadConferences();
  }

  loadConferences() {
    this.loading.set(true);
    this.error.set(null);
    this.conferenceService.getAllConferences().subscribe({
      next: (data) => {
        this.conferences.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Impossible de charger les conférences. Vérifiez que le serveur JSON est démarré (npm run api).');
        this.loading.set(false);
      },
    });
  }

  deleteConference(id: number) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette conférence ?')) return;
    this.conferenceService.deleteConference(id).subscribe({
      next: () => {
        this.conferences.update((list) => list.filter((c) => c.id !== id));
      },
      error: () => {
        alert('Erreur lors de la suppression.');
      },
    });
  }
}
