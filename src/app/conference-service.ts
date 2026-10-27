import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Conference } from './models/conference';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConferenceService {
  http = inject(HttpClient);
  apiUrl = 'http://localhost:3000/conferences';

  getAllConferences(): Observable<Conference[]> {
    return this.http.get<Conference[]>(this.apiUrl);
  }

  getConferenceById(id: number): Observable<Conference> {
    return this.http.get<Conference>(`${this.apiUrl}/${id}`);
  }

  addConference(conference: Conference): Observable<Conference> {
    return this.http.post<Conference>(this.apiUrl, conference);
  }

  updateConference(id: number, conference: Conference): Observable<Conference> {
    return this.http.put<Conference>(`${this.apiUrl}/${id}`, conference);
  }

  deleteConference(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
