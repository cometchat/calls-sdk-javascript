import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { JoinSessionComponent } from './pages/join-session/join-session.component';
import { CredentialsComponent } from './pages/credentials/credentials.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'join-session', component: JoinSessionComponent },
  { path: 'credentials', component: CredentialsComponent },
];
