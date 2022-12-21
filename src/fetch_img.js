import axios from 'axios';

export default async function axiosGet(question, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY = '32158519-15576ba172a71d2bf58c30f9b';
  const image_type = 'photo';
  const orientation = 'horizontal';
  const safesearch = 'true';
  const per_page = 40;
  const url = `${BASE_URL}?key=${KEY}&image_type=${image_type}&safesearch=${safesearch}&orientation=${orientation}&per_page=${per_page}`;

  return await axios.get(`${url}&q=${question}&page=${page}`).then(r => {
    return r.data; 
  });
}

// ---------- First done with fetch ------------------------

// const BASE_URL = 'https://pixabay.com/api/';
// const KEY = '32158519-15576ba172a71d2bf58c30f9b';
// const image_type = 'photo';
// const orientation = 'horizontal';
// const safesearch = 'true';
// const per_page = 40;
// const url = `${BASE_URL}?key=${KEY}&image_type=${image_type}&safesearch=${safesearch}&orientation=${orientation}&per_page=${per_page}`;

// export function fetchImg(question, page) {
//   return fetch(`${url}&q=${question}&page=${page}`).then(r => r.json());
// }