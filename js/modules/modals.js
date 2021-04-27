function modals () {
      let modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '12px';
        clearInterval(modalTimer);
    }
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });
            
    
    
    function closeModal () {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';

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
        let modalTimer = setTimeout(openModal, 50000, );

    function showModalOnScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= 
            document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll', showModalOnScroll);
        }
    }

    window.addEventListener('scroll', showModalOnScroll);
}

module.exports = modals;