import './css/searchPicsStyles.css'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { options } from './js/fetchPics.js'
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
        const inputValue = refs.input.value;
        const fetchPicsResult = options.getPic(inputValue);
        fetchPicsResult.then(pictures => {
        const markup = createPicsMarkup(pictures);
        refs.galleryWrapper.innerHTML = markup;
        })
        // clearInput();
        } 


function createPicsMarkup(pictures) {
    return pictures.map((picture, index) => {
        return `
            <div class="photo-card">
                <img src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy" />
                <div class="info">
                ${index+1}
                    <p class="info-item">
                    <b>Likes ${picture.likes}</b>
                    </p>
                    <p class="info-item">
                    <b>Views ${picture.views}</b>
                    </p>
                    <p class="info-item">
                    <b>Comments ${picture.comments}</b>
                    </p>
                    <p class="info-item">
                    <b>Downloads ${picture.downloads}</b>
                    </p>
                </div>
                </div>
            `
    }).join('');
}


refs.loadMoreButton.addEventListener('click', onLoadMoreButtonClick);

function onLoadMoreButtonClick(e) {
        e.preventDefault();
        const inputValue = refs.input.value; 
        options.params.page += 1;
        const fetchPicsResult = options.getPic(inputValue);
        fetchPicsResult.then(pictures => {
        const markup = createPicsMarkup(pictures);
        refs.galleryWrapper.innerHTML = markup;
        })
        // clearInput();
        } 






// function clearInput() {
//     refs.form.reset();
// }


