/**
 * Format Firestore Server Date as dd Month yyyy
 * @param date Date
 * @returns Formatted date string
 */
export default function formatFSDate(date: Date) {
  return date.toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' });
};