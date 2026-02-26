import styles from './Avatar.module.css';

interface AvatarProps {
  name: string;
  url?: string;
  size?: number;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function Avatar({ name, url, size = 45 }: AvatarProps) {
  return (
    <div
      className={styles.avatar}
      style={{ width: size, height: size, fontSize: size * 0.27 }}
    >
      {url ? (
        <img
          className={styles.image}
          src={url}
          alt={name}
          width={size}
          height={size}
        />
      ) : (
        getInitials(name)
      )}
    </div>
  );
}

export default Avatar;
