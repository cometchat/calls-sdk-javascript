import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CometChatCalls } from '@cometchat/calls-sdk-javascript';
import { AppStoreService } from '../../store/app-store.service';

interface SampleUser {
  name: string;
  uid: string;
  avatar: string;
}

const sampleUsers: SampleUser[] = [
  {
    name: 'Andrew Joseph',
    uid: 'cometchat-uid-1',
    avatar: 'https://assets.cometchat.io/sampleapp/v2/users/cometchat-uid-1.webp',
  },
  {
    name: 'George Alan',
    uid: 'cometchat-uid-2',
    avatar: 'https://assets.cometchat.io/sampleapp/v2/users/cometchat-uid-2.webp',
  },
  {
    name: 'Nancy Grace',
    uid: 'cometchat-uid-3',
    avatar: 'https://assets.cometchat.io/sampleapp/v2/users/cometchat-uid-3.webp',
  },
  {
    name: 'Susan Marie',
    uid: 'cometchat-uid-4',
    avatar: 'https://assets.cometchat.io/sampleapp/v2/users/cometchat-uid-4.webp',
  },
  {
    name: 'John Paul',
    uid: 'cometchat-uid-5',
    avatar: 'https://assets.cometchat.io/sampleapp/v2/users/cometchat-uid-5.webp',
  },
];

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private router = inject(Router);
  private store = inject(AppStoreService);

  uidInput = 'cometchat-uid-1';
  rows = [sampleUsers.slice(0, 3), sampleUsers.slice(3, 5)];

  get user() {
    return this.store.user();
  }

  ngOnInit(): void {
    if (this.user) {
      this.router.navigate(['/join-session']);
    }
  }

  selectUser(uid: string): void {
    this.uidInput = uid;
  }

  handleLogin(): void {
    if (!this.uidInput.trim()) return;

    CometChatCalls.login(this.uidInput).then((user) => {
      this.store.setUser({
        uid: user.uid,
        name: user.name,
        avatar: user.avatar,
      });
      this.router.navigate(['/join-session']);
    });
  }

  goToCredentials(): void {
    this.router.navigate(['/credentials']);
  }
}
