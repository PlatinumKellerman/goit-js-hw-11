import './css/searchPicsStyles.css'
import { options } from './js/fetchPics.js';
import createPicsMarkup from './js/createMarkup.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
    form: document.querySelector('#search-form'),
    input: document.querySelector('input[name="searchQuery"]'),
    button: document.querySelector('button'),
    loadMoreButton: document.querySelector('.load-more'),
    galleryWrapper: document.querySelector('.gallery'),
    isHidden: true,
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

let gallery = new SimpleLightbox('.gallery a',
    {
        captionsData: "alt",
        captionDelay: 250
    }
);

// function clearInput() {
//     refs.form.reset();
// }


