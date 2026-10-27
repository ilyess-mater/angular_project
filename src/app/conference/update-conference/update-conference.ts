import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ConferenceService } from '../../conference-service';

@Component({
  selector: 'app-update-conference',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './update-conference.html',
  styleUrl: './update-conference.css',
})
export class UpdateConference implements OnInit {
  // Bound from route parameter /edit/:id
  id = input.required<string>();

  private fb = inject(FormBuilder);
  private conferenceService = inject(ConferenceService);
  private router = inject(Router);

  loading = signal(true);
  submitting = signal(false);
  error = signal<string | null>(null);

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

  ngOnInit() {
    this.conferenceService.getConferenceById(Number(this.id())).subscribe({
      next: (data) => {
        this.conferenceForm.patchValue(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Conférence introuvable.');
        this.loading.set(false);
      },
    });
  }

  submitForm() {
    if (this.conferenceForm.invalid) {
      this.conferenceForm.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    this.error.set(null);

    this.conferenceService.updateConference(Number(this.id()), this.conferenceForm.value as any).subscribe({
      next: () => {
        this.router.navigate(['/list']);
      },
      error: () => {
        this.error.set('Erreur lors de la mise à jour.');
        this.submitting.set(false);
      },
    });
  }
}
