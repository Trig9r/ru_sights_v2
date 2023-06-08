const HTTP = 'http://';
const HTTPS = 'https://';

// webpurify
const API_KEY_WEBPURIFY = '98edd69ac5345bc244cc82902644bd40';
const WEBPURIFY = `api1.webpurify.com/services/rest/?api_key=${API_KEY_WEBPURIFY}&method=webpurify.live.check`;
export const WEBPURIFY_FORMAT = 'lang=ru&format=json';

//opencagedata
export const API_KEY_OPENCAGEDATA = 'a7c004a0c28846e3b4eb0cf2a6f73071';
const OPENCAGEDATA = 'api.opencagedata.com/geocode/v1/json?q=';

export const API_WEBPURIFY = HTTPS + WEBPURIFY;
export const API_OPENCAGEDATA = HTTPS + OPENCAGEDATA;
