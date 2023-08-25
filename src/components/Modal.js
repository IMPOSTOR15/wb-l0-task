export default class Modal {
    constructor(params) {
        this._modal = document.querySelector('#modal')
        this._modalContent = document.querySelector(params.modal);
        this._openBtns = params.openBtns.map((btnId) => {return document.getElementById(btnId)})
        this._closeBtn = document.getElementById(params.closeBtn);
        this._submitBtn = document.getElementById(params.submitBtn)
    }

    open() {
        this._modal.classList.add('modal-open');
        this._modalContent.style.visibility = 'visible'
    }
    
    close() {
        this._modal.classList.remove('modal-open');
        this._modalContent.style.visibility = 'hidden'
    }

    setEventListeners() {
        this._closeBtn.addEventListener('click', this.close.bind(this));
        this._submitBtn.addEventListener('click', this.close.bind(this));
        this._openBtns.map((btn) => {
            btn.addEventListener('click', this.open.bind(this))
        })
        this._modal.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('modal')) {
                this.close();
            }
          }
        );
        
    }
}