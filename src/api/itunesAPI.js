const status = response => {
  if (response.status !== 200) {
    if (response.status === 404)
      return Promise.resolve("We haven't found this singer in iTunes");
    if (response.status === 400) return Promise.resolve("Incorrect request");
    return Promise.reject(new Error(response.statusText));
  }
  return Promise.resolve(response);
};
const json = data => {
  if (typeof data === "string") return data;
  return data.json();
};

export const singerITunesApi = singer => {
  let singerForSearch = singer.split(" ").join("+");
  return new Promise((resolve, reject) => {
    try {
      fetch(
        `https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=${singerForSearch}&limit=500`,
        {}
      )
        .then(status)
        .then(json)
        .then(data => {
          resolve(data);
        });
    } catch (error) {
      reject(new Error(error));
    }
  });
};
