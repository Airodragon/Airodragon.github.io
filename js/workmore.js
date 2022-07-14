let work = document.querySelector('.work-more');
let icon = document.querySelector('.work-more i');
let extra = document.querySelectorAll('.extra');
let flag = true;
work.addEventListener('click', (e)=> {
       extra.forEach((item)=> {
        item.classList.toggle('hiddenx');
       })
        if(flag){
            icon.classList.remove('fa-arrow-down');
            icon.classList.add('fa-arrow-up');  
        }
        else{
            icon.classList.remove('fa-arrow-up');
            icon.classList.add('fa-arrow-down');
        }
        flag = !flag;
});