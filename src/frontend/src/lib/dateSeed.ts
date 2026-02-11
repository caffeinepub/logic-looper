export function getTodayKey(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function dateKeyToSeed(dateKey: string): number {
  const parts = dateKey.split('-').map(Number);
  const year = parts[0] || 2024;
  const month = parts[1] || 1;
  const day = parts[2] || 1;
  return year * 10000 + month * 100 + day;
}

export function getLast365Days(): string[] {
  const result: string[] = [];
  const today = new Date();
  
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    result.push(`${year}-${month}-${day}`);
  }
  
  return result;
}
