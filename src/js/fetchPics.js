import { Notify } from 'notiflix';
import axios from 'axios';

export const options = {
    params: {
        key: '27460109-f49525f14ce538ff6a08a8ab1',
        q: '',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: 1,
        per_page: 40,
    },
    async getPic(inputValue) {
        options.params.q = inputValue;
        const BASE_URL = 'https://pixabay.com/api/';
        const response = await axios.get(BASE_URL, options);
        if (response.data.hits.length > 0) {
            Notify.success(`Hooray! We found ${response.data.totalHits} images.`)
        }   else if (response.data.totalHits === 0) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        }   else if (response.data.hits.length < 40) {
            Notify.failure("We're sorry, but you've reached the end of search results.")
        } 
        return response.data.hits
    }
}