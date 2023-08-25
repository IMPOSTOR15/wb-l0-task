export default class Colaps {
    constructor(colapsebtn_open, colapsebtn_close, colpaseContent, openRow, closeRow) {
        this._colpaseContent = document.querySelector(colpaseContent);
        this._colapseBtnOpen = document.querySelector(colapsebtn_open);
        this._colapseBtnClose = document.querySelector(colapsebtn_close);
        this.openRow = document.querySelector(openRow);
        this.closeRow = document.querySelector(closeRow);
    }
    
    _open() {
        this.openRow.style.display = 'none';
        this.closeRow.style.display = 'flex';
        this._colpaseContent.style.display = 'none'
    }
    _close() {
        this.openRow.style.display = 'flex';
        this.closeRow.style.display = 'none';
        this._colpaseContent.style.display = 'flex'
    }
    setEventListeners() {
        this._colapseBtnOpen.addEventListener('click', this._open.bind(this));
        this._colapseBtnClose.addEventListener('click', this._close.bind(this));
    }
}