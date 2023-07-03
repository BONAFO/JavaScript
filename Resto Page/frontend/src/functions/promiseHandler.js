export const promiseHandler = (promise, cb) => {
    promise
      .then((reponse) => {
        cb(reponse);
      })
      .catch((err) => console.log(err));
  };