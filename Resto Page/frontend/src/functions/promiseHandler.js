

const handleError = (err, cb) => {
  // if(err.status !== undefined){

  // }

  cb(err);
}

export const promiseHandler = (promise, cb) => {
  promise
    .then((reponse) => {
      cb(reponse);
    })
    .catch((err) => handleError(err.response, cb));
};