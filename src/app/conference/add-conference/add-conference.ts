import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ConferenceService } from '../../conference-service';

@Component({
  selector: 'app-add-conference',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-conference.html',
  styleUrl: './add-conference.css',
})
export class AddConference {
  private fb = inject(FormBuilder);
  private conferenceService = inject(ConferenceService);
  private router = inject(Router);

  submitting = signal(false);
  submitError = signal<string | null>(null);

  conferenceForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required]],
    location: ['', [Validators.required]],
    date: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(0)]],
    nbPlaces: [1, [Validators.required, Validators.min(1)]],
  });

  get title() { return this.conferenceForm.get('title'); }
  get description() { return this.conferenceForm.get('description'); }
  get location() { return this.conferenceForm.get('location'); }
  get date() { return this.conferenceForm.get('date'); }
  get price() { return this.conferenceForm.get('price'); }
  get nbPlaces() { return this.conferenceForm.get('nbPlaces'); }

  submitForm() {
    if (this.conferenceForm.invalid) {
      this.conferenceForm.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    this.submitError.set(null);

    this.conferenceService.addConference(this.conferenceForm.value as any).subscribe({
      next: () => {
        this.router.navigate(['/list']);
      },
      error: () => {
        this.submitError.set('Erreur lors de l\'ajout. Vérifiez que le serveur est démarré.');
        this.submitting.set(false);
      },
    });
  }
}
