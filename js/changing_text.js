let changing_text = document.querySelector('.changing-text');
let arr = ['I am Web Developer', 'I am Web Designer', 'I am Python Developer'];
let i = 0;
setInterval(function () {
    changing_text.innerHTML = arr[i];
    i++;
    if (i >= arr.length) {
        i = 0;
    }
}
    , 800);