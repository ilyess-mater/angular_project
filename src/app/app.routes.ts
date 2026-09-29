import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ConferenceList } from './conference/conference-list/conference-list';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'conferences', component: ConferenceList },
  { path: '**', redirectTo: '' },
];
