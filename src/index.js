import { Notify } from 'notiflix';
import './css/searchPicsStyles.css'
import { options } from './js/fetchPics.js';
import galleryInitializer from './js/galleryInitializer.js'
import createPicsMarkup from './js/createMarkup.js';
import pageSmoothScrolling from './js/pageSmoothScrolling.js'
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
    form: document.querySelector('#search-form'),
    input: document.querySelector('input[name="searchQuery"]'),
    button: document.querySelector('button'),
    loadMoreButton: document.querySelector('.load-more'),
    galleryWrapper: document.querySelector('.gallery')
}
refs.loadMoreButton.classList.add('isHidden');
refs.button.classList.add('isActive');

refs.form.addEventListener('submit', onFormSubmit);
function onFormSubmit(e) {
    e.preventDefault();
    options.params.page = 1;
        const inputValue = refs.input.value;
        const fetchPicsResult = options.getPic(inputValue);
    fetchPicsResult.then(pictures => {
        const markup = createPicsMarkup(pictures);
    refs.galleryWrapper.innerHTML = markup;
                if (pictures.length === 40) {
                    refs.loadMoreButton.classList.remove('isHidden');
                    refs.loadMoreButton.classList.add('isActive');
            }
    }).then(() => {
        galleryInitializer();
    })
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
            if (pictures.length < 40) {
                refs.loadMoreButton.classList.add('isHidden');
                Notify.warning("We're sorry, but you've reached the end of search results.", {
                    width: '400px',
                    position: 'top-right',
                    timeout: 1500,
                    borderRadius: '20px',
                    fontSize: '20px',
                    cssAnimationStyle: 'zoom',
                })
                refs.loadMoreButton.classList.remove('isActive');
            }
        }).then(() => {
            galleryInitializer();
            pageSmoothScrolling();
        })
}

