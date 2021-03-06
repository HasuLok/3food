function slider ({container, slide, nextArrow, prewArrow, totalCounter, currentCounter, wrapper, field}) {
    const slides = document.querySelectorAll(slide),
    prev = document.querySelector(prewArrow),
    next = document.querySelector(nextArrow),
    total =document.querySelector(totalCounter),
    current =document.querySelector(currentCounter),
    slider = document.querySelector(container),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width;

let slideIndex = 1,
    offset =0;    
//                 Проверяем для индексов  01-09 
if(slides.length < 10){
    total.textContent = `0${slides.length}`;
    current.textContent =`0${slideIndex}`;

}else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
}    
                    //Увеличели длинну контейнера на длинну width его содержимого
slidesField.style.width = 100 * slides.length +'%';
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';
                    //Скрыли выпадающие слайды из контейнера 
slidesWrapper.style.overflow = 'hidden';

                    //не понял зачем перебрал 
slides.forEach(slide => {
    slide.style.width = width;
});
                        //навигация слайдера 
slider.style.position = "relative";

const indicators = document.createElement('ol'),
    dots = [];

indicators.classList.add('carousel-indicators');
indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
`;
slider.append(indicators);

for (let i = 0; i < slides.length; i++){
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
    `;
    if(i === 0){
        dot.style.opacity = 1; 
    }
    indicators.append(dot);
    dots.push(dot);
}

                        // Функция для переключения между точками 
function dotToggler () {
    dots.forEach(dot => dot.style.opacity ='.5');
    dots[slideIndex -1].style.opacity =1;

}                        
                // Функция которая приводит строку к числу и выбрасывает буквы

function deleteWords (item) {
    return +item.replace(/\D/g, '');
}   
  
next.addEventListener('click', () => {
    if(offset == deleteWords(width)  * (slides.length - 1)){
        offset = 0;
    }else{
        offset += deleteWords(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if(slideIndex == slides.length){
        slideIndex = 1;
    }else{
        slideIndex++;
    }

    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    }else{
       current.textContent = slideIndex;
    }
            // Переключение между точками 
    dotToggler ();

    // dots.forEach(dot => dot.style.opacity ='.5');
    // dots[slideIndex -1].style.opacity =1;
    
});

prev.addEventListener('click', () => { 
    if(offset == 0){
        offset = deleteWords(width) * (slides.length - 1);
    }else{
        offset -= deleteWords(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if(slideIndex == 1){
        slideIndex = slides.length;
    }else{
        slideIndex--;
    }

    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    }else{
       current.textContent = slideIndex;
    }
                // Переключение между точками 
     dotToggler ();

    // dots.forEach(dot => dot.style.opacity ='.5');
    // dots[slideIndex -1].style.opacity =1;

});


                    // подключаем функционал точкам 
dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');

        slideIndex = slideTo;
        offset =  deleteWords(width) * (slideTo - 1);

        slidesField.style.transform = `translateX(-${offset}px)`;

        // dots.forEach(dot => dot.style.opacity ='.5');
        // dots[slideIndex -1].style.opacity = 1;
        dotToggler ();

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        }else{
           current.textContent = slideIndex;
        }

    });
});
}

export default slider;