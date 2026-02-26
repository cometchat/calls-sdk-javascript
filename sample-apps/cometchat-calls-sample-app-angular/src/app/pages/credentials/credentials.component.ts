import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppStoreService, Region } from '../../store/app-store.service';

interface RegionOption {
  key: Region;
  label: string;
  flag: string;
}

const regions: RegionOption[] = [
  { key: 'US', label: 'US', flag: 'assets/flag-us.svg' },
  { key: 'EU', label: 'EU', flag: 'assets/flag-eu.svg' },
  { key: 'IN', label: 'IN', flag: 'assets/flag-in.svg' },
];

@Component({
  selector: 'app-credentials',
  imports: [FormsModule],
  templateUrl: './credentials.component.html',
  styleUrl: './credentials.component.css',
})
export class CredentialsComponent {
  private router = inject(Router);
  private store = inject(AppStoreService);

  regions = regions;
  selectedRegion: Region = 'US';
  appId = '';
  authKey = '';

  selectRegion(key: Region): void {
    this.selectedRegion = key;
  }

  submit(): void {
    this.store.setCredentials({
      region: this.selectedRegion,
      appId: this.appId,
      authKey: this.authKey,
    });
    this.router.navigate(['/']);
  }
}
