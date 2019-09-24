const status = response => {
  if (response.status !== 200) {
    if (response.status === 404)
      return Promise.resolve("We haven't found this singer in iTunes");
    if (response.status === 400) return Promise.resolve("Incorrect request");
    return Promise.reject(new Error(response.statusText));
  }
  return Promise.resolve(response);
};

export const searchSinger = query => {
  const searchQuery = query.split(" ").join("+");
  return new Promise((resolve, reject) => {
    try {
      fetch(
        `https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=${searchQuery}&limit=500`,
        {}
      )
        .then(status)
        .then(data => data.json())
        .then(data => {
          resolve(data.results);
        });
    } catch (error) {
      reject(new Error(error));
    }
  });
};
