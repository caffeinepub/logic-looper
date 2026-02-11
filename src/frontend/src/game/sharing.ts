export interface SharePayload {
  puzzleType: string;
  dateKey: string;
}

export function encodeSharePayload(payload: SharePayload): string {
  const json = JSON.stringify(payload);
  return btoa(json);
}

export function decodeSharePayload(encoded: string): SharePayload {
  try {
    const json = atob(encoded);
    return JSON.parse(json);
  } catch {
    throw new Error('Invalid share payload');
  }
}
