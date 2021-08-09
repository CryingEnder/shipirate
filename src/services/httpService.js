import axios from "axios";
import logger from "./logService";

axios.defaults.withCredentials = true;
axios.interceptors.response.use(null, (error) => {
  /*
    Great article, thanks! I learnt a lot. I believe that once the token starts coming back in a cookie, we no longer need the `axios.interceptors.request.use`.
    It makes sense since this is adding a header for the JWT to be "fished" backend side but since the article didn't mention it,
    I didn't realise, and keptgetting errors when making the api call. I thought it was the fault of the proxy, but it was not!
  */

  /*
    Also, the express-jwt has a breaking change in the latest version. You need to provide which algorithm to use, otherwise an error will be thrown.
    For ex:
    expressJwt({ secret: process.env.JWT_SECRET, algorithms: ['RS256'] });
  */
  //(fulfilled, rejected)
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    alert("An unexpected error has occurred.");
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
