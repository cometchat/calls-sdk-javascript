import { Component, input } from '@angular/core';

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css',
})
export class AvatarComponent {
  name = input.required<string>();
  url = input<string>();
  size = input<number>(45);

  get initials(): string {
    return getInitials(this.name());
  }
}
