export const convertTimestampToDate = (
  timestamp: { seconds: number; nanoseconds: number } | null
): string => {
  if (!timestamp) {
    return "";
  }
  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );
  return date.toDateString();
};
