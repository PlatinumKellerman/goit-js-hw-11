export default function pageSmoothScrolling() {
    const { height: cardHeight } = document
            .querySelector(".gallery")
            .firstElementChild.getBoundingClientRect();
        window.scrollBy({
            top: cardHeight * 2 + 40,
            behavior: "smooth",
        });
}