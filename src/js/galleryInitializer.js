export default function galleryInitializer() {
    new SimpleLightbox('.gallery a',
            {
                captionsData: "alt",
                captionDelay: 300
            });
}