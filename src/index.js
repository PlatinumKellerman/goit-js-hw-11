import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/searchPicsStyles.css'
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { options } from './js/fetchPics';
import galleryInitializer from './js/galleryInitializer'
import createPicsMarkup from './js/createMarkup';
import pageSmoothScrolling from './js/pageSmoothScrolling'
import './js/infiniteScroll';

const refs = {
    form: document.querySelector('#search-form'),
    input: document.querySelector('input[name="searchQuery"]'),
    searchButton: document.querySelector('button'),
    loadMoreButton: document.querySelector('.load-more'),
    galleryWrapper: document.querySelector('.gallery')
}

refs.loadMoreButton.classList.add('isHidden');
refs.searchButton.classList.add('isActive-button');
refs.input.classList.add('search-input');

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
                    refs.loadMoreButton.classList.add('isActive-button');
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
                    borderRadius: '20px',
                    fontSize: '20px',
                    cssAnimationStyle: 'zoom',
                })
                refs.loadMoreButton.classList.remove('isActive-button');
            }
        }).then(() => {
            galleryInitializer();
            pageSmoothScrolling();
        })
}