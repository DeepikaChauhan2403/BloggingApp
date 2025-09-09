function getTimeDifference(postedTime) {
  const now = new Date();
  const created = new Date(postedTime);
  const diffMs = now - created;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHrs = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHrs / 24);

  if (diffDays > 0) return `${diffDays} day(s) ago`;
  if (diffHrs > 0) return `${diffHrs} hour(s) ago`;
  if (diffMin > 0) return `${diffMin} minute(s) ago`;
  return `${diffSec} second(s) ago`;
}

export default getTimeDifference;