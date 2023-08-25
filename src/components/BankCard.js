export default class BankCard {
    constructor(id, bankCardTemplateId, bankCardsData, bankCardsElements) {
        this._cardId = id;
        this._bankCardTemplate = this._getTemplate(bankCardTemplateId);
        this.bankCardsData = bankCardsData;
        this.bankCardsElements = bankCardsElements;

        this.currentBankCardData = bankCardsData.find(obj => obj.id === id);

        this._selectBtn = this._bankCardTemplate.querySelector('.select-radio');
        this._bankCardIcon = this._bankCardTemplate.querySelector('.bank-card__ico');
        this._bankCardNumber = this._bankCardTemplate.querySelector('.bank-card__number');

        this._summaryCardIcon = document.querySelector('#summaryCardIcon');
        this._summaryCardNumber = document.querySelector('#summaryCardNumber');

        this._selectedCardIco = document.querySelector('#selectedCardIco');
        this._selectedCardNumber = document.querySelector('#selectedCardNumber');
        this._selectedCardDate = document.querySelector('#selectedCardDate');

        this._setEventListeners();
        this.updateSelect();
    }

    _getTemplate(templateId) {
        return document.querySelector(templateId).content.cloneNode(true);
    }

    _selectBankCard() {
        this.bankCardsData.forEach(card => {
            card.isSelected = false;
        });
        this.currentBankCardData.isSelected = true;
        this.bankCardsElements.forEach(bankCard => {
            bankCard.updateSelect();
        });
    }

    _setCard() {
        this._summaryCardIcon.src = this.currentBankCardData.paySystemIco;
        this._selectedCardIco.src = this.currentBankCardData.paySystemIco;

        this._summaryCardNumber.textContent = this.currentBankCardData.cardNumber;
        this._selectedCardNumber.textContent = this.currentBankCardData.cardNumber;

        this._selectedCardDate.textContent = this.currentBankCardData.cardDate;
    }

    updateSelect() {
        const isSelected = this.currentBankCardData.isSelected;
        this._selectBtn.classList.toggle('select-radio_active', isSelected);
        if (isSelected) {
            this._setCard();
        }
    }

    _setEventListeners() {
        this._selectBtn.addEventListener('click', () => {
            this._selectBankCard();
        });
    }

    generateCard() {
        this._bankCardIcon.src = this.currentBankCardData.paySystemIco;
        this._bankCardNumber.textContent = this.currentBankCardData.cardNumber;

        const cardDiv = this._bankCardTemplate.querySelector('.bank-card');
        cardDiv.setAttribute('id', `card-${this._cardId}`);

        return this._bankCardTemplate;
    }
}
