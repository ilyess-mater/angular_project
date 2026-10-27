import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ConferenceList } from './conference/conference-list/conference-list';
import { ConferenceDetails } from './conference/conference-details/conference-details';
import { AddConference } from './conference/add-conference/add-conference';
import { UpdateConference } from './conference/update-conference/update-conference';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'list', component: ConferenceList },
  { path: 'details/:id', component: ConferenceDetails },
  { path: 'add', component: AddConference },
  { path: 'edit/:id', component: UpdateConference },
  { path: '**', component: NotFound },
];
