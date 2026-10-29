import { useState } from 'react';

/** Shared with the iOS and Android samples, so a name gets the same colour everywhere. */
const PALETTE = [
  '#7C6FCF',
  '#5B8FD9',
  '#4FA88C',
  '#8FA65B',
  '#D16B9B',
  '#5FA9B5',
  '#5C6BC0',
  '#7A8CA6',
  '#C46A6A',
  '#9A6FBF',
];

/** djb2, so a name maps to the same colour on every visit and platform. */
function colorIndex(name: string): number {
  let hash = 5381n;
  for (const char of name) {
    hash =
      (hash * 33n + BigInt(char.codePointAt(0) ?? 0)) & 0xffffffffffffffffn;
  }
  return Number(hash % BigInt(PALETTE.length));
}

function initialsOf(name: string, count: number): string {
  const letters = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, Math.max(1, count))
    .map((word) => [...word][0].toUpperCase());
  return letters.join('') || '?';
}

/** Near-black on light fills, white on dark ones. */
function contrastOn(hex: string): string {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.45 ? '#181A20' : '#FFFFFF';
}

/**
 * A round avatar: the image when there is one, otherwise initials on a colour picked from the
 * name, so the same person always gets the same colour. `online` adds a presence dot.
 */
export function Avatar({
  name,
  url,
  size = 40,
  initials = 1,
  online = false,
}: {
  name: string;
  url?: string;
  size?: number;
  initials?: number;
  online?: boolean;
}) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const fill = PALETTE[colorIndex(name)];
  const showImage = url && failedUrl !== url;
  const dot = Math.max(8, Math.round(size * 0.3));

  return (
    <span
      aria-hidden="true"
      style={{
        position: 'relative',
        display: 'inline-grid',
        placeItems: 'center',
        flex: 'none',
        width: size,
        height: size,
        borderRadius: '50%',
        background: fill,
        color: contrastOn(fill),
        fontSize: size * 0.4,
        fontWeight: 600,
        lineHeight: 1,
      }}
    >
      {showImage ? (
        <img
          src={url}
          alt=""
          width={size}
          height={size}
          onError={() => setFailedUrl(url)}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
      ) : (
        initialsOf(name, initials)
      )}
      {online && (
        <span
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: dot,
            height: dot,
            borderRadius: '50%',
            background: 'var(--status-online)',
            boxShadow: `0 0 0 ${Math.max(2, dot * 0.16)}px var(--background)`,
          }}
        />
      )}
    </span>
  );
}
