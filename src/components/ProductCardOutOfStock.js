
export default class ProductCardOutOfStock {
    constructor(template, mobileTemplate, id, goodsData) {
        this.id = id
        this.goodsData = goodsData
        this._template = template;
        this._mobileTemplate = mobileTemplate
        this._cardElement = this._getTemplate(this._template);
        this._mobileCardElement = this._getTemplate(this._mobileTemplate);

        this._cardId = id;

        this.currentGoodData = goodsData.find(obj => obj.id === id)
        this.titleText = this.currentGoodData.title;
        this.imageSrc = this.currentGoodData.imageSrc;

        this.specifications = this.currentGoodData?.specifications;

        this._image = this._cardElement.querySelector('.product-card__photo');
        this._title = this._cardElement.querySelector('.product-discription__title');
        this._propertyText = this._cardElement.querySelector('.product-discription__property-text');

        this._deleteBtn = this._cardElement.querySelector('.delete');

        this._imageMobile = this._mobileCardElement.querySelector('.product-card__image');
        this._titleMobile = this._mobileCardElement.querySelector('.product-discription__title');
        this._propertyTextMobile = this._mobileCardElement.querySelector('.product-discription__property-text');
        this._size = this._mobileCardElement.querySelector('.product-card__size');

        this._deleteBtnMobile = this._mobileCardElement.querySelector('.delete');

        this._cartTopRowInfoOutOfStock1 = document.querySelector('#cartTopRowInfoOutOfStock-1')
        this._cartTopRowInfoOutOfStock2 = document.querySelector('#cartTopRowInfoOutOfStock-2')
    }

    _getTemplate(template_name) {
        const cardElement = document.querySelector(template_name).content.cloneNode(true);
        return cardElement
    };
    _updateCartTopRow() {
        const actualQuantity = this.goodsData.reduce((sum, elem) => {
            if (!elem.inStock) {
                sum += 1;
            }
            
            return sum;
        }, 0)
        this._cartTopRowInfoOutOfStock1 .textContent = 'Отсутствуют · ' + actualQuantity + ' товара'
        this._cartTopRowInfoOutOfStock2 .textContent = 'Отсутствуют · ' + actualQuantity + ' товара'
    }
    _removeCard() {
        const parentElement = document.querySelector('#outOfStockColumn');
        const currentElement  = document.getElementById(this.id + 'outofstock');
        const currentElementMobile  = document.getElementById(this.id + 'mobile-outofstock');
        if (parentElement && currentElement && currentElementMobile) {
            parentElement.removeChild(currentElement);
            parentElement.removeChild(currentElementMobile);
        }
    }
    _deleteCardData() {
        let index = this.goodsData.map(good => {return good.id;}).indexOf(this.id);
        this.goodsData.splice(index, 1);
        this._updateCartTopRow()
    }

    _setEventListeners() {
        this._deleteBtn.addEventListener('click', () => {
            this._deleteCardData()
            this._removeCard()
        });

        this._deleteBtnMobile.addEventListener('click', () => {
            this._deleteCardData()
            this._removeCard()
        });
    };

    generateCard() {
        this._image.src = this.imageSrc;
        this._image.alt = this._title;
        this._imageMobile.style.backgroundImage = `url(${this.imageSrc})`;
        
        this._title.textContent = this.titleText
        this._titleMobile.textContent = this.titleText

        if (this.specifications) {
            const descriptionContainer = this._cardElement.querySelector('#product-property');
            for (const property in this.specifications) {
                if (this.specifications.hasOwnProperty(property)) {
                    const paragraph = document.createElement('p');
                    paragraph.classList.add('product-discription__property-text');
                    paragraph.classList.add('product-discription__property-text_outofstock');
                    paragraph.textContent = `${property}: ${this.specifications[property]}`;
                    descriptionContainer.appendChild(paragraph);
                }
            }
            const descriptionContainerMobile = this._mobileCardElement.querySelector('#product-property')
            for (const property in this.specifications) {
                if (this.specifications.hasOwnProperty(property)) {
                    if (property === 'Размер') {
                        this._size.textContent = this.specifications[property]
                        continue
                    }
                    const paragraph = document.createElement('p');
                    paragraph.classList.add('product-discription__property-text');
                    paragraph.classList.add('product-discription__property-text_outofstock');
                    paragraph.textContent = `${property}: ${this.specifications[property]}`;
                    descriptionContainerMobile.appendChild(paragraph);
                }
            }
        }

        const elementDiv = this._cardElement.querySelector('.product-card');
        const elementDivMobile = this._mobileCardElement.querySelector('.product-card_mobile');

        elementDiv.setAttribute('id', this._cardId + 'outofstock');
        elementDivMobile.setAttribute('id', this._cardId + 'mobile-outofstock');
        this._updateCartTopRow()
        this._setEventListeners();
        return [this._cardElement, this._mobileCardElement]
    }
}