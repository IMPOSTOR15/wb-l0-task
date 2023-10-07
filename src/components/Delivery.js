export default class Delivery {
    constructor(id, courierDeliveryTemplateId, pointDeliveryTemplateId, deliveryData, deliveryElements) {
        this.id = id;
        this.deliveryElements = deliveryElements;
        this.deliveryData = deliveryData;
        const { courierAdresses, pointAdresses } = deliveryData;
        this._currentDeliveryData = courierAdresses.find(obj => obj.id === id) || pointAdresses.find(obj => obj.id === id);
        this.isSelected = this._currentDeliveryData.isSelected;
        this._courierTemplate = this._getTemplate(courierDeliveryTemplateId);
        this._pointDeliveryTemplate = this._getTemplate(pointDeliveryTemplateId);

        this.isCourier = this._currentDeliveryData.type === 'courier';
        this._currentTemplate = this.isCourier ? this._courierTemplate : this._pointDeliveryTemplate;

        this._cardDiv = this._currentTemplate.querySelector('.delivery-type__item');

        this._selectBtnCourier = this._courierTemplate.querySelector('.select-radio');
        this._selectBtnPoint = this._pointDeliveryTemplate.querySelector('.select-radio');
        
        this._deliveryPointInfoCard = document.querySelector('#deliveryPointInfoCard');

        this._deliveryTitleSummary = document.querySelector('#deliveryTitleSummary');
        this._deliveryAdressSummary = document.querySelector('#summaryDeliveryAdress');

        this._deliveryTitleCard = document.querySelector('#deliveryTitleCard');
        this._deliveryAdressCard = document.querySelector('#deliveryAdressCard');
        this._deliveryPointRatingCard = document.querySelector('#deliveryPointRatingCard')
        this._deliveryPointTime = document.querySelector('.delivery-point__time');

        this._deleteBtn = this._currentTemplate.querySelector('.delete');

        if (!this.isCourier) {
            this._deliveryPointRating = this._currentTemplate.querySelector('.delivery-point__rating');
        }
        this.selectAdress()   
    }

    _getTemplate(templateId) {
        return document.querySelector(templateId).content.cloneNode(true);
    }

    _setEventListeners() {
        this._cardDiv.addEventListener('click', () => this.selectAdress());
        this._deleteBtn.addEventListener('click', (event) => {
            event.stopPropagation()
            this._deleteAdress()
        });
    }

    selectAdress() {
        this.deliveryElements.forEach(deliveryAdress => {
            deliveryAdress.isSelected = false;
        });
        this.isSelected = true;
        this.deliveryElements.forEach(deliveryAdress => {
            deliveryAdress.updateSelect();
        });
        this._setAdress();
    }

    _setAdress() {
        const deliveryPointInfoCard = this._deliveryPointInfoCard;
        deliveryPointInfoCard.style.display = this.isCourier ? 'none' : 'flex';

        const deliveryTitleText = this.isCourier ? 'Доставка курьером' : 'Пункт выдачи';
        const deliveryTitleTextSummary = this.isCourier ? 'Доставка курьером' : 'Доставка в пункт выдачи';
        const deliveryAdressText = this._currentDeliveryData.adress;

        this._deliveryTitleSummary.textContent = deliveryTitleTextSummary;
        this._deliveryAdressSummary.textContent = deliveryAdressText;
        this._deliveryTitleCard.textContent = deliveryTitleText;
        this._deliveryAdressCard.textContent = deliveryAdressText;

        if (!this.isCourier) {
            this._deliveryPointTime.textContent = this._currentDeliveryData.time;
            this._deliveryPointRatingCard.textContent = this._currentDeliveryData.rating;
        }
    }

    updateSelect() {
        this._selectBtnCourier.classList.toggle('select-radio_active', this.isSelected && this.isCourier);
        this._selectBtnPoint.classList.toggle('select-radio_active', this.isSelected && !this.isCourier);
        
    }


    generateAdress() {
        const deliveryAdressElement = this._currentTemplate.querySelector('.delivery-type__adress');
        deliveryAdressElement.textContent = this._currentDeliveryData.adress;

        if (!this.isCourier) {
            this._deliveryPointRating.textContent = this._currentDeliveryData.rating;
        }

        if (this.isSelected) {
            const selectBtn = this._currentTemplate.querySelector('.select-radio');
            selectBtn.classList.add('select-radio_active');
        }
        this._cardDiv.setAttribute('id', `${this.isCourier ? 'courier' : 'point'}Adress-${this.id}`);
        this._setEventListeners();
        return this._currentTemplate;
    }

    _deleteAdress() {
        if (this.deliveryElements.length <= 1) {
            return
        }
        const parentElementId = this.isCourier ? 'courierDeliveryAdressesColumn' : 'pointDeliveryAdressesColumn';
        const currentElementId = `${this._currentDeliveryData.type}Adress-${this.id}`;

        const parentElement = document.querySelector(`#${parentElementId}`);
        const currentElement = document.querySelector(`#${currentElementId}`);
        
        if (parentElement && currentElement) {
            parentElement.removeChild(currentElement);
        }
        this.deliveryElements = this.deliveryElements.filter(adress => adress.id !== this.id);
        if (this.isCourier) {
            this.deliveryData.courierAdresses = this.deliveryData.courierAdresses.filter(adress => adress.id !== this.id);
        } else {
            this.deliveryData.pointAdresses = this.deliveryData.pointAdresses.filter(adress => adress.id !== this.id);
        }

        if (this.isSelected) {
            this.deliveryElements[0].isSelected = true;
            this.deliveryElements[0].selectAdress();
        }
    }
}
