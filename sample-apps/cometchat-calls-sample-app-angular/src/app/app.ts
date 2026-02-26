import { Component, OnInit, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CometChatCalls } from '@cometchat/calls-sdk-javascript';
import { AppStoreService } from './store/app-store.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private store = inject(AppStoreService);

  constructor() {
    effect(() => {
      const { appId, region, authKey } = this.store.credentials();
      if (!appId || !region || !authKey) return;

      CometChatCalls.init({ appId, region, authKey }).then(({ error }) => {
        if (error) {
          console.error('CometChatCalls initialization failed:', error);
        } else {
          console.log('CometChatCalls initialized successfully');
        }
      });
    });
  }

  ngOnInit(): void {
    this.checkLoggedInUser();
  }

  private checkLoggedInUser(): void {
    const user = CometChatCalls.getLoggedInUser();
    if (user) {
      this.store.setUser(user);
    } else {
      this.store.clearUser();
    }
  }
}
