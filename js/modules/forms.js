function forms () {
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
}

module.exports = forms;