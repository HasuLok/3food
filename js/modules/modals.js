function openModal(modalSelector, modalTimer ) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '12px';
    console.log(modalTimer);
    if(modalTimer){
        clearInterval(modalTimer);
    }
}      
function closeModal (modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';

}

function modals (triggerSelector, modalSelector, modalTimer) {
    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimer ));
    });    
      
    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal (modalSelector);
        }
    }); 
       
    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.classList.contains('show')){
            closeModal (modalSelector);
        }
    }); 
        function showModalOnScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= 
            document.documentElement.scrollHeight){
            openModal(modalSelector, modalTimer);
            window.removeEventListener('scroll', showModalOnScroll);
        }
    }

    window.addEventListener('scroll', showModalOnScroll);
}

export default modals;
export {closeModal};
export{openModal};