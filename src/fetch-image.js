import axios from "axios";
export { fetchImage };

const BASE_URL = 'https://pixabay.com/api/';

const KEY = '31877303-2b698a4e9870a1907176d2e6a';

async function fetchImage(q, page, perPage) {  
 const response = await axios.get(`${BASE_URL}?key=${KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`);
  
 return response;
};