export default class Delivery {
    constructor(id, courierDeliveryTemplateId, pointDeliveryTemplateId, DeliveryData, deliveryElements) {
        this.id = id;
        this.deliveryElements = deliveryElements;
        this.DeliveryData = DeliveryData;

        const { courierAdresses, pointAdresses } = DeliveryData;
        this._currentDeliveryData = courierAdresses.find(obj => obj.id === id) || pointAdresses.find(obj => obj.id === id);

        this._courierTemplate = this._getTemplate(courierDeliveryTemplateId);
        this._pointDeliveryTemplate = this._getTemplate(pointDeliveryTemplateId);

        this.isCourier = this._currentDeliveryData.type === 'courier';
        this._currentTemplate = this.isCourier ? this._courierTemplate : this._pointDeliveryTemplate;

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
        this._selectBtnCourier.addEventListener('click', () => this.selectAdress());
        this._selectBtnPoint.addEventListener('click', () => this.selectAdress());
        this._deleteBtn.addEventListener('click', () => this._deleteAdress());
    }

    selectAdress() {
        const { courierAdresses, pointAdresses } = this.DeliveryData;
        courierAdresses.concat(pointAdresses).forEach(adress => {
            adress.isSelected = false;
        });
        this._currentDeliveryData.isSelected = true;
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
        const isSelected = this._currentDeliveryData.isSelected;
        this._selectBtnCourier.classList.toggle('select-radio_active', isSelected && this.isCourier);
        this._selectBtnPoint.classList.toggle('select-radio_active', isSelected && !this.isCourier);
        
    }


    generateAdress() {
        const deliveryAdressElement = this._currentTemplate.querySelector('.delivery-type__adress');
        deliveryAdressElement.textContent = this._currentDeliveryData.adress;

        if (!this.isCourier) {
            this._deliveryPointRating.textContent = this._currentDeliveryData.rating;
        }

        if (this._currentDeliveryData.isSelected) {
            const selectBtn = this._currentTemplate.querySelector('.select-radio');
            selectBtn.classList.add('select-radio_active');
        }
        const cardDiv = this._currentTemplate.querySelector('.delivery-type__item');
        cardDiv.setAttribute('id', `${this.isCourier ? 'courier' : 'point'}Adress-${this.id}`);
        this._setEventListeners();
        return this._currentTemplate;
    }

    _removeAdress() {
        if (this._currentDeliveryData.isSelected) {
            this.deliveryElements[0].selectAdress();
        }
        const parentElement = document.querySelector(`#${this._currentDeliveryData.type}DeliveryAdressesColumn`);
        const currentElement = document.querySelector(`#${this._currentDeliveryData.type}Adress-${this.id}`);
        
        if (parentElement && currentElement) {
            parentElement.removeChild(currentElement);
        }
    }
    _deleteAdress() {
        const parentElementId = this.isCourier ? 'courierDeliveryAdressesColumn' : 'pointDeliveryAdressesColumn';
        const currentElementId = `${this._currentDeliveryData.type}Adress-${this.id}`;

        const parentElement = document.querySelector(`#${parentElementId}`);
        const currentElement = document.querySelector(`#${currentElementId}`);
        
        if (parentElement && currentElement) {
            parentElement.removeChild(currentElement);
        }
        this.deliveryElements = this.deliveryElements.filter(adress => adress.id !== this.id);
        if (this.isCourier) {
            this.DeliveryData.courierAdresses = this.DeliveryData.courierAdresses.filter(adress => adress.id !== this.id);
        } else {
            this.DeliveryData.pointAdresses = this.DeliveryData.pointAdresses.filter(adress => adress.id !== this.id);
        }

        if (this._currentDeliveryData.isSelected) {
            this.deliveryElements[0].selectAdress();
        }
    }
}
