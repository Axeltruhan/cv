/**
 * Formats a date string to a localized format
 * @param dateString The date string to format (in YYYY-MM-DD format)
 * @returns A formatted date string
 */
export function formatDate(dateString?: string): string {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', { 
      year: 'numeric', 
      month: 'long' 
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}
