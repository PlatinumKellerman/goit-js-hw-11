import { Notify } from 'notiflix';
const axios = require('axios');
const BASE_URL = 'https://pixabay.com/api/';

// https://pixabay.com/api/?key=27460109-f49525f14ce538ff6a08a8ab1&q=moon&image_type=photo

const options = {
    params: {
        key: '27460109-f49525f14ce538ff6a08a8ab1',
        q: '',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    },
}

export default async function getPic(inputValue) {
    try {
        options.params.q = inputValue;
        const response = await axios.get(BASE_URL, options);
        if (response.data.totalHits > 0) {
            Notify.success(`${inputValue} ` + "is find")
        }
        return response.data.hits
    } catch (error) {
    Notify.failure(error, "kshjfgusdygrfiuedhgoiuedryiudr")
    }
}





// var API_KEY = '27460109-f49525f14ce538ff6a08a8ab1';
// var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');
// $.getJSON(URL, function(data){
// if (parseInt(data.totalHits) > 0)
//     $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
// else
//     console.log('No hits');
// });