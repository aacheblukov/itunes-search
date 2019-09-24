export const createOptions = albums =>
  albums.map(album => ({ value: album, label: album }));
export const millisToMinutesAndSeconds = millis => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};
export const LoadingState = {
  NO_REQUEST: 0,
  REQUEST: 1,
  SUCCESS: 2
};
