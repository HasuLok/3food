'use strict';
window.addEventListener('DOMContentLoaded', () => {
    //TABS
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }
                      
    function showTabContent(i = 0){
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');

    }
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if( target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) =>{
                if(target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
    // Timer

    let deadLine = '2021-04-25';
    
    function getTimeRemaining (endtime){
        let t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t/(1000*60*60*24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor ((t / 1000 / 60) % 60),
            seconds = ( (t / 1000) % 60);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };   
    }

    function getZero(num){
        if(num >= 0 && num < 10){
            return `0${num}`;
        }else {
            return num;
        }
    }
     
    function setClock (selector, endtime){
        let timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),

            timeInterval = setInterval(updateClock, 1000);

        updateClock();    

        function updateClock () {
            let t = getTimeRemaining (endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML =getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if(t.total <= 0){
                clearInterval(timeInterval);
            }
        }    
    }

    setClock('.timer', deadLine);

    //Modal

    let modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimer);
    }
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });
            
    
    
    function closeModal () {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
      
    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal ();
        }
    }); 
       
    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.classList.contains('show')){
            closeModal ();
        }
    }); 
    
    //Modal modify

    let modalTimer = setTimeout(openModal, 50000);

    function showModalOnScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= 
            document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll', showModalOnScroll);
        }
    }

    window.addEventListener('scroll', showModalOnScroll);

    // Classes for cards!

    class MenuCard {
        constructor (src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH(){
            this.price = +this.price * this.transfer;
        }

        render(){
            let element = document.createElement('div');
            if(this.classes.length === 0){
                this.element = "menu__item";
                element.classList.add(this.element);
            }else{
                this.classes.forEach(className => element.classList.add(className)); 
            }
                
            element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total">
                        <span>${this.price}</span> грн/день</div>
                    </div>
                </div>
            `;
            this.parent.append(element);

        }
    }
                            // Функция получает по url данные data + показывает ошибку
    let getResource = async (url, data) => {
        let res = await fetch(url);   
        if( !res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };
                            // Подключение через axio
    axios.get('http://localhost:3000/menu')
    .then(data => {
        data.data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container' ).render();
        });
    });     
         
                            // Подключение карточек с сервера 
    // getResource('http://localhost:3000/menu')
    // .then(data => {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         new MenuCard(img, altimg, title, descr, price, '.menu .container' ).render();
    //     });
    // });    
                        // Отрисовка элементов из скрипта 
            // getResource('http://localhost:3000/menu')
            //     .then( data => createCard(data));

            // function createCard(data) {
            //     data.forEach(({img, altimg, title, descr, price}) => {
            //         let element = document.createElement('div');
            //         element.classList.add("menu__item");
            //         element.innerHTML=`
            //         <div class="menu__item">
            //         <img src=${img} alt=${altimg}>
            //         <h3 class="menu__item-subtitle">${title}</h3>
            //         <div class="menu__item-descr">${descr}</div>
            //         <div class="menu__item-divider"></div>
            //         <div class="menu__item-price">
            //             <div class="menu__item-cost">Цена:</div>
            //             <div class="menu__item-total">
            //             <span>${price}</span> грн/день</div>
            //         </div>
            //         </div>
            //         `;
            //         console.log('heloo');
            //         document.querySelector('.menu .container').append(element);
            //     });
                
            // }
    
    

    // new MenuCard(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     '.menu .container',
    //     'menu__item',
    //     'big'
    // ).render();

    // new MenuCard(
    //     "img/tabs/elite.jpg",
    //     "elite",
    //     'Меню “Премиум”',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     18,
    //     '.menu .container',
    //     'menu__item'
    // ).render();
    // new MenuCard(
    //     "img/tabs/post.jpg",
    //     "post",
    //     'Меню "Постное"',
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //     19,
    //     '.menu .container',
    //     'menu__item'
    // ).render();
    
    //Forms

    let forms = document.querySelectorAll('form');  

    let message = {
        loading: "img/form/054spinner.svg",     
        success: "Спасибо! Скоро мы с вами свяжемся",
        failure:"Что-то пошло не так..."
    };

    forms.forEach(item => {
        bindPostData(item);
    });
                                // fitch() 
    let postData = async (url, data) => {
        let res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: data
        });

        return await res.json();
    };

                        // Привязываем данные из форм к db.json 
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMsg = document.createElement('img');
            statusMsg.src = message.loading;
            statusMsg.style.cssText =`
                display:block;
                margin: 0 auto; 
            `;
            
            form.insertAdjacentElement('afterend', statusMsg);
           
            let formData = new FormData(form);

            let json = JSON.stringify(Object.fromEntries(formData.entries()));

                    

            postData('http://localhost:3000/requests', json)
              .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMsg.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
                            // Рефакторинг     XMLRequest to fitch()
            // request.send(formData);
            // request.addEventListener('load', () => {
            //     if(request.status === 200){
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         form.reset();
            //         statusMsg.remove();
                    
            //     }else{
            //         showThanksModal(message.failure);
            //     }
            // });
        });
    }

    function showThanksModal (message) {
        let prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();
        
        let thanksModal = document.createElement('div');
        thanksModal.classList.add('.modal__dialog');
        thanksModal.innerHTML =`
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 2000);

    }
        //Методы массивов 
        //filter

        // let names =['Ivan', 'Ann', 'Ksenia', 'Volandemort'];
        // let shortNmaes = names.filter(function(name){
        //     return name.length < 5;
        // });
        // console.log(shortNmaes);


        //MAP 

        // let answers=['IvAn', 'AnnA', 'Hello', ];
        //  answers = answers.map((item) => {
        //     return item.toLowerCase();
        // });

        // console.log(answers);

        // EVERY/SOME 

        //     let some = [4, 5, 6];

        // // console.log(some.some(item =>  typeof(item) === 'number'));
        // console.log(some.every(item =>  typeof(item) === 'number'));


        // REDUCE 

        // let arr =['apple', 'pear', 'plum'];

        // let res = arr.reduce((sum, current) => `${sum},  ${current}`, 3);
        // console.log(res);

        // let obj = {
        //     ivan:'persone',
        //     ann:'persone',
        //     dog:'animal',
        //     cat:'animal',
        // };
        // let newArr = Object.entries(obj)
        // .filter(item => item[1] ==='persone')
        // .map(item => item[0]);


        // console.log(newArr);
        // fetch('http://localhost:3000/menu')
        //     .then(data => data.json())
        //     .then(res => console.log(res) );  



                            //Слайдер 

    let slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total =document.querySelector('#total'),
        current =document.querySelector('#current'),
        slideIndex = 1;

    
    showSlides(slideIndex);
    
    function showSlides (n) {
        if (n > slides.length){
            slideIndex =1;
        }
        if(n < 1) {
            slideIndex = slides.length;
        }
        slides.forEach(item => item.style.display ='none');

        slides[slideIndex - 1].style.display = 'block';

        if(slides.length < 10){
            current.textContent = `0${slideIndex}`;

        }else {
            current.textContent = slides.length;
        }
        

        
    }
     
    function plusSlides (n){
        showSlides(slideIndex += n);
    }
    prev.addEventListener('click', () => {
        plusSlides(-1);
    });
    next.addEventListener('click', () => {
        plusSlides(1);
    });

}); 

 