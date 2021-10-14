export const mapDateFromStamp = (timestamp) => {
  const date = new Date(timestamp * 1000).toDateString();
  return date;
};