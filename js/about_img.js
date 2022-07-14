let about_image = document.querySelector('.about-image');
let filter = document.querySelector('.filter');
let other_filter = document.querySelector('.other-filter');
// let
let filter_img = document.querySelector('.image-container');

about_image.addEventListener('mouseover', function () {
    filter.style.opacity = '0';
    filter_img.classList.add('active');
    other_filter.classList.add('active');
    
});
about_image.addEventListener('mouseout', function () {
    filter.style.opacity = '1';
    filter_img.classList.remove('active');
    other_filter.classList.remove('active');
});