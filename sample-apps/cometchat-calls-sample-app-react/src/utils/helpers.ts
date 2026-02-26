export function getRandomMeetingId(): string {
  const uuid = crypto.randomUUID();
  return uuid.split('-').map(part => part.slice(-4)).slice(-3).join('-');
}
