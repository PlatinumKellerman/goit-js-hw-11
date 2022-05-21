export default function createPicsMarkup(pictures) {
    return pictures.map((picture) => {
        return `
            <div class="photo-card">
                <a class="gallery__item" href="${picture.largeImageURL}">
                    <img class="created-img" src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy" />
                </a>
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
            </div>`
    }).join('');
}