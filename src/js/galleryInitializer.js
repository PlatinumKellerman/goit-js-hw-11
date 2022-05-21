import SimpleLightbox from 'simplelightbox';

export default function galleryInitializer() {
    let gallery = new SimpleLightbox('.gallery a',
            {
                captionsData: "alt",
                captionDelay: 300
        });
            gallery.refresh();
}