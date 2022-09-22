const axios = require('axios').default;
export default async function fetching(value, page, step) {
    const KEY = '30096300-85c12d9a12810581ec765486e';
    const resp = await axios.get(`https://pixabay.com/api/?key=${KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${step}`);
    return resp;
}