import './css/searchPicsStyles.css'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import getPic from './js/fetchPics.js'


const refs = {
    form: document.querySelector('#search-form'),
    input: document.querySelector('input[name="searchQuery"]'),
    button: document.querySelector('button'),
    galleryWrapper: document.querySelector('.gallery')
}

refs.form.addEventListener('submit', onFormSubmit);
    function onFormSubmit(e) {
        e.preventDefault();
        const inputValue = refs.input.value;
        const fetchPicsResult = getPic(inputValue);
        fetchPicsResult.then(pictures => {
            console.log(pictures);
        const markup = createPicsMarkup(pictures);
        refs.galleryWrapper.innerHTML = markup;
        })
        clearInput();
        } 


function createPicsMarkup(pictures) {
    return pictures.map(picture => {
        return `
            <div class="photo-card">
                <img src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy" />
                <div class="info">
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


function clearInput() {
    refs.form.reset();
}


