/**
 * Formats timestamps into human-readable relative time format.
 * Examples:
 * - "Just now" for times under 1 minute
 * - "3 mins ago", "2 hours ago"
 * - "Yesterday 09:15" -> "Yesterday morning"
 * - Raw time strings like "14:32:00" -> relative time from current time
 */
export function formatRelativeTime(rawTime) {
  if (!rawTime) return 'Just now';

  const timeStr = String(rawTime).trim();

  // If already relative like "Just now", "1 min ago", "2 mins ago", return cleanly formatted
  if (timeStr === 'Just now' || timeStr.toLowerCase().includes('just now')) {
    return 'Just now';
  }

  // Handle "Yesterday" patterns
  if (timeStr.toLowerCase().startsWith('yesterday')) {
    const lower = timeStr.toLowerCase();
    if (lower.includes('morning') || lower.includes('06:') || lower.includes('07:') || lower.includes('08:') || lower.includes('09:') || lower.includes('10:') || lower.includes('11:')) {
      return 'Yesterday morning';
    } else if (lower.includes('afternoon') || lower.includes('12:') || lower.includes('13:') || lower.includes('14:') || lower.includes('15:') || lower.includes('16:')) {
      return 'Yesterday afternoon';
    } else if (lower.includes('evening') || lower.includes('night') || lower.includes('17:') || lower.includes('18:') || lower.includes('19:') || lower.includes('20:') || lower.includes('21:')) {
      return 'Yesterday evening';
    }
    return 'Yesterday';
  }

  // Handle HH:MM:SS format
  if (/^\d{1,2}:\d{2}(:\d{2})?$/.test(timeStr)) {
    const parts = timeStr.split(':');
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const now = new Date();

    const dateObj = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
    if (dateObj > now) {
      dateObj.setDate(dateObj.getDate() - 1);
    }

    const diffMs = now - dateObj;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return 'Yesterday';
  }

  // Try parsing ISO date or standard Date string
  const dateObj = new Date(timeStr);
  if (!isNaN(dateObj.getTime())) {
    const now = new Date();
    const diffMs = now - dateObj;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  }

  // Return raw if it's already a descriptive phrase like "3 mins ago"
  return timeStr;
}
