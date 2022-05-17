import { Notify } from 'notiflix';
import axios from 'axios';


// https://pixabay.com/api/?key=27460109-f49525f14ce538ff6a08a8ab1&q=moon&image_type=photo

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
        if (response.data.totalHits > 0) {
            Notify.success(`Hooray! We found ${response.data.totalHits} images.`)
        } else {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    }
        return response.data.hits
    },
    
    pageCounter() {
        options.params.page = options.params.page + 1;
        
    }
    
}












// export default async function getPic(inputValue) {
//         options.params.q = inputValue;
//         const response = await axios.get(BASE_URL, options);
//         if (response.data.totalHits > 0) {
//             Notify.success(`Hooray! We found ${response.data.totalHits} images.`)
//         } else {
//             Notify.failure("Sorry, there are no images matching your search query. Please try again.")
//     }
//     console.log(response);
//         return response.data.hits
// }

// export function pageCounter() {
//     options.params.page =+ 1;
// }
// console.log(options.params.page);