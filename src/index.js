import './css/searchPicsStyles.css'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { options } from './js/fetchPics.js';
import createPicsMarkup from './js/createMarkup.js'
// import getPic from './js/fetchPics.js';
// import { pageCounter } from './js/fetchPics';


const refs = {
    form: document.querySelector('#search-form'),
    input: document.querySelector('input[name="searchQuery"]'),
    button: document.querySelector('button'),
    loadMoreButton: document.querySelector('.load-more'),
    galleryWrapper: document.querySelector('.gallery')
}

refs.form.addEventListener('submit', onFormSubmit);
function onFormSubmit(e) {
        e.preventDefault();
        options.params.page = 1;
        const inputValue = refs.input.value;
        const fetchPicsResult = options.getPic(inputValue);
        fetchPicsResult.then(pictures => {
        const markup = createPicsMarkup(pictures);
        refs.galleryWrapper.innerHTML = markup;
        })
        // clearInput();
        } 

refs.loadMoreButton.addEventListener('click', onLoadMoreButtonClick);
function onLoadMoreButtonClick(e) {
    e.preventDefault();
        const inputValue = refs.input.value; 
        options.params.page += 1;
        const fetchPicsResult = options.getPic(inputValue);
        fetchPicsResult.then(pictures => {
        const markup = createPicsMarkup(pictures);
            refs.galleryWrapper.insertAdjacentHTML("beforeend", markup);
        })
        // clearInput();
        } 

// function clearInput() {
//     refs.form.reset();
// }


