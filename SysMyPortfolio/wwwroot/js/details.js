
const $img = document.getElementById("content-images")
$img.addEventListener('click', (event) => {
    if (event.target.classList.contains('det-image')) {
        const url = event.target.src;
        window.open(url, '_blank');
    }
})