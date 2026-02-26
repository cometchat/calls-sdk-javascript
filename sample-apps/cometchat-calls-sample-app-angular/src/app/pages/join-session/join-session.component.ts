import { Component, OnInit, OnDestroy, inject, signal, viewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CometChatCalls } from '@cometchat/calls-sdk-javascript';
import { AvatarComponent } from '../../components/avatar/avatar.component';
import { AppStoreService } from '../../store/app-store.service';
import { getRandomMeetingId } from '../../utils/helpers';

@Component({
  selector: 'app-join-session',
  imports: [FormsModule, AvatarComponent],
  templateUrl: './join-session.component.html',
  styleUrl: './join-session.component.css',
})
export class JoinSessionComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private store = inject(AppStoreService);

  sessionId = '';
  menuOpen = signal(false);
  inMeeting = signal(false);

  meetingContainer = viewChild<ElementRef<HTMLDivElement>>('meetingContainer');

  private cleanupEventListener?: () => void;

  private clickOutsideHandler = (e: MouseEvent) => {
    const menuEl = document.querySelector('.avatar-wrapper');
    if (menuEl && !menuEl.contains(e.target as Node)) {
      this.menuOpen.set(false);
    }
  };

  get user() {
    return this.store.user();
  }

  get version() {
    return this.store.version;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.sessionId = params['sessionId'] ?? '';
    });

    document.addEventListener('mousedown', this.clickOutsideHandler);

    this.cleanupEventListener = CometChatCalls.addEventListener('onConnectionClosed', () => {
      this.inMeeting.set(false);
    });
  }

  ngOnDestroy(): void {
    document.removeEventListener('mousedown', this.clickOutsideHandler);
    this.cleanupEventListener?.();
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  updateSessionId(value: string): void {
    this.sessionId = value;
    this.router.navigate([], {
      queryParams: value ? { sessionId: value } : {},
      replaceUrl: true,
    });
  }

  joinMeeting(): void {
    this.inMeeting.set(true);
    this.startMeeting();
  }

  startInstantMeeting(): void {
    const meetingId = getRandomMeetingId();
    this.sessionId = meetingId;
    this.router.navigate([], {
      queryParams: { sessionId: meetingId },
      replaceUrl: true,
    });
    this.inMeeting.set(true);
    // Small delay to ensure the view updates and meetingContainer is available
    setTimeout(() => this.startMeeting(), 0);
  }

  private startMeeting(): void {
    if (!this.sessionId) return;

    CometChatCalls.generateToken(this.sessionId).then(({ token }) => {
      console.log('token', token);
      const container = this.meetingContainer();
      if (container) {
        CometChatCalls.joinSession(token, {}, container.nativeElement);
      }
    });
  }

  async logout(): Promise<void> {
    try {
      await CometChatCalls.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
    this.store.clearUser();
    this.router.navigate(['/']);
  }
}
