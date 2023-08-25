
export default class ProductCard {
    constructor(template, mobileTemplate, id, goodsData, Summary, checkAllSelect) {
        this.Summary = Summary;
        this.checkAllSelect = checkAllSelect;
        this.id = id;
        this.goodsData = goodsData;
        this._template = template;
        this._mobileTemplate = mobileTemplate;
        this._cardElement = this._getTemplate(this._template);
        this._mobileCardElement = this._getTemplate(this._mobileTemplate);

        this._cardId = id;

        this.currentGoodData = goodsData.find(obj => obj.id === id)
        this.titleText = this.currentGoodData.title;
        this.imageSrc = this.currentGoodData.imageSrc;
        this.specifications = this.currentGoodData?.specifications;
        this.warehouse = this.currentGoodData.warehouse;
        this.seller = this.currentGoodData.seller;
        this.sellerInfo = this.currentGoodData.sellerInfo;
        this.quantity = this.currentGoodData.quantity;
        this.quantityRemains = this.currentGoodData?.quantityRemains;
        this.actualPrice = this.currentGoodData.actualPrice;
        this.fullPrice = this.currentGoodData.fullPrice;
        this.discountSpec = this.currentGoodData.discountSpec;
        this.isSelected = this.currentGoodData.isSelected;
        this.inStock = this.currentGoodData.inStock;

        
        this._image = this._cardElement.querySelector('.product-card__photo');
        this._title = this._cardElement.querySelector('.product-discription__title');
        this._propertyText = this._cardElement.querySelector('.product-discription__property-text');
        this._warehouse = this._cardElement.querySelector('.product-discription__storage');
        this._seller = this._cardElement.querySelector('.product-discription__seller-name');
        this._quantity = this._cardElement.querySelector('.product-quantity__selector-number');
        this._quantityRemains = this._cardElement.querySelector('.product-quantity__remains');
        this._actualPrice = this._cardElement.querySelector('.product-price__actual-price');
        this._fullPrice = this._cardElement.querySelector('#full-price');
        this._deleteBtn = this._cardElement.querySelector('.delete');
        this._minusBtn = this._cardElement.querySelector('.product-quantity__selector-minus');
        this._plusBtn = this._cardElement.querySelector('.product-quantity__selector-plus');
        this._selectBtn = this._cardElement.querySelector('.product-card__checkbox');

        this._imageMobile = this._mobileCardElement.querySelector('.product-card__image');
        this._titleMobile = this._mobileCardElement.querySelector('.product-discription__title');
        this._propertyTextMobile = this._mobileCardElement.querySelector('.product-discription__property-text');
        this._warehouseMobile = this._mobileCardElement.querySelector('.product-discription__storage');
        this._size = this._mobileCardElement.querySelector('.product-card__size');

        this._quantityMobile = this._mobileCardElement.querySelector('.product-quantity__selector-number');
        this._quantityRemainsMobile = this._mobileCardElement.querySelector('.product-quantity__remains');
        this._actualPriceMobile = this._mobileCardElement.querySelector('.product-price__actual-price');
        this._fullPriceMobile = this._mobileCardElement.querySelector('#full-price');

        this._deleteBtnMobile = this._mobileCardElement.querySelector('.delete');
        this._minusBtnMobile = this._mobileCardElement.querySelector('.product-quantity__selector-minus');
        this._plusBtnMobile = this._mobileCardElement.querySelector('.product-quantity__selector-plus');
        this._selectBtnMobile = this._mobileCardElement.querySelector('.product-card__checkbox_mobile');

        this._tabCartCounter = document.querySelector('#tabCartCounter')
        this._headerCartCounter = document.querySelector('#headerCartCounter')

        this._tooltipTitle = this._cardElement.querySelector('.tooltip__title')
        this._tooltipOGRN = this._cardElement.querySelector('#tooltipOGRN')
        this._tooltipAdress= this._cardElement.querySelector('#tooltipAdress')

        this._cartTopRowInfo = document.querySelector('#cartTopRowInfo')

        this.tikerSpan = document.createElement("span");
        this.tikerSpan.className = "product-price__tiker";
        this.tikerSpan.classList.add('text_header4')
        this.tikerSpan.textContent = "сом";
        
    }
    _getTemplate(template) {
        return document.querySelector(template).content.cloneNode(true);
    }
    _removeCard() {
        const parentElement = document.querySelector('.cart__goods-column');
        const currentElement  = document.getElementById(this.id);
        const currentElementMobile  = document.getElementById(this.id + 'mobile');
        if (parentElement && currentElement && currentElementMobile) {
            parentElement.removeChild(currentElement);
            parentElement.removeChild(currentElementMobile);
        }
        this.Summary.updatePrices()
        this._updateCartTopRow()
    }

    _deleteCardData() {
        let index = this.goodsData.map(good => {return good.id;}).indexOf(this.id);
        this.goodsData.splice(index, 1);
        this._removeCard()
        this.updateSelect()
    }

    _selectGood() {
        if (this.currentGoodData.isSelected) {
            this.currentGoodData.isSelected = false
            this._selectBtn.classList.remove('checkbox_active')
            this._selectBtnMobile.classList.remove('checkbox_active')
        } else {
            this.currentGoodData.isSelected = true
            this._selectBtn.classList.add('checkbox_active')
            this._selectBtnMobile.classList.add('checkbox_active')
        }
        this.Summary.updatePrices()
        this._updateCartTopRow()
        this.checkAllSelect()
        this._updateCartNumber()
    }
    _updateCartNumber() {
        const selectedGoodsNum = this.goodsData.reduce((sum, elem) => {
            if (elem.inStock && elem.isSelected) {
                sum += 1
            }
            return sum;
        }, 0)
        if (selectedGoodsNum === 0) {
            this._tabCartCounter.style.display = 'none'
            this._headerCartCounter.style.display = 'none'
        } else {
            this._tabCartCounter.style.display = 'inline'
            this._headerCartCounter.style.display = 'inline'
        }
        this._tabCartCounter.textContent = selectedGoodsNum
        this._headerCartCounter.textContent = selectedGoodsNum
    }
    updateSelect() {
        if (this.currentGoodData.isSelected) {
            this._selectBtn.classList.add('checkbox_active')
            this._selectBtnMobile.classList.add('checkbox_active')
        } else {
            this._selectBtnMobile.classList.remove('checkbox_active')
            this._selectBtn.classList.remove('checkbox_active')
        }
        this.Summary.updatePrices()
        this._updateCartTopRow()
        this._updateCartNumber()
    }
    _decreaseQuantity() {
        if (this.currentGoodData.quantity > 1) {
            this.currentGoodData.quantity -= 1;
            this._quantity.textContent = this.currentGoodData.quantity;
            this._quantityMobile.textContent = this.currentGoodData.quantity;
            this._updatePrice()
            this._checkQuantity()
        }
        this.Summary.updatePrices()
        this._updateCartTopRow()
        
    }
    _increaseQuantity() {
        if (!this.currentGoodData.quantityRemains || this.currentGoodData.quantity < this.currentGoodData.quantityRemains ) {
            this.currentGoodData.quantity += 1;
            this._quantity.textContent = this.currentGoodData.quantity;
            this._quantityMobile.textContent = this.currentGoodData.quantity;
            this._updatePrice()
            this._checkQuantity()
        }
        this._updateCartTopRow()
        this.Summary.updatePrices()
    }
    _updateCartTopRow() {
        const actualQuantity = this.goodsData.reduce((sum, elem) => {
            if (elem.inStock && elem.isSelected) {
                sum += elem.quantity;
            }
            return sum;
        }, 0)

        const actualPrice = this.goodsData.reduce((sum, elem) => {
            if (elem.inStock && elem.isSelected) {
                sum += elem.actualPrice * elem.quantity;
            }
            return sum;
        }, 0)

        this._cartTopRowInfo.textContent = actualQuantity + ' Товаров · ' + Math.floor(actualPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' сом'
    }
    
    _updatePrice() {
        this._actualPrice.textContent = Math.floor(this.actualPrice * this.currentGoodData.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        this._actualPrice.appendChild(this.tikerSpan.cloneNode(true));
        this._fullPrice.textContent =  Math.floor(this.fullPrice * this.currentGoodData.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")  + ' сом'

        this._actualPriceMobile.textContent = Math.floor(this.actualPrice * this.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        this._actualPriceMobile.appendChild(this.tikerSpan.cloneNode(true));
        this._fullPriceMobile.textContent =  Math.floor(this.fullPrice * this.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")  + ' сом'
    };
    _checkQuantity() {
        if (this.currentGoodData.quantity === this.currentGoodData.quantityRemains) {
            this._plusBtn.classList.remove('product-quantity__selector-plus_active');
            this._plusBtnMobile.classList.remove('product-quantity__selector-plus_active');
        } else {
            this._plusBtn.classList.add('product-quantity__selector-plus_active');
            this._plusBtnMobile.classList.add('product-quantity__selector-plus_active');
        }
    
        if (this.currentGoodData.quantity === 1) {
            this._minusBtn.classList.remove('product-quantity__selector-minus_active');
            this._minusBtnMobile.classList.remove('product-quantity__selector-minus_active');
        } else {
            this._minusBtn.classList.add('product-quantity__selector-minus_active');
            this._minusBtnMobile.classList.add('product-quantity__selector-minus_active');
        }
    }
    
    _setEventListeners() {
        this._selectBtn.addEventListener('click', this._selectGood.bind(this));
        this._selectBtnMobile.addEventListener('click', this._selectGood.bind(this));
        this._deleteBtn.addEventListener('click', this._deleteCardData.bind(this));
        this._deleteBtnMobile.addEventListener('click', this._deleteCardData.bind(this));
        this._minusBtn.addEventListener('click', this._decreaseQuantity.bind(this));
        this._minusBtnMobile.addEventListener('click', this._decreaseQuantity.bind(this));
        this._plusBtn.addEventListener('click', this._increaseQuantity.bind(this));
        this._plusBtnMobile.addEventListener('click', this._increaseQuantity.bind(this));
    }

    generateCard() {
        this._image.src = this.imageSrc;
        this._image.alt = this._title;
        this._imageMobile.style.backgroundImage = `url(${this.imageSrc})`;
        
        this._title.textContent = this.titleText
        this._titleMobile.textContent = this.titleText
        const descriptionContainer = this._cardElement.querySelector('#product-property');
        const descriptionContainerMobile = this._mobileCardElement.querySelector('#product-property')
        if (this.specifications) {
            
            for (const property in this.specifications) {
                if (this.specifications.hasOwnProperty(property)) {
                    const paragraph = document.createElement('p');
                    paragraph.classList.add('product-discription__property-text');
                    paragraph.textContent = `${property}: ${this.specifications[property]}`;
                    descriptionContainer.appendChild(paragraph);
                }
            }
            
            for (const property in this.specifications) {
                if (this.specifications.hasOwnProperty(property)) {
                    if (property === 'Размер') {
                        this._size.textContent = this.specifications[property]
                        continue
                    }
                    const paragraph = document.createElement('p');
                    paragraph.classList.add('product-discription__property-text');
                    paragraph.textContent = `${property}: ${this.specifications[property]}`;
                    descriptionContainerMobile.appendChild(paragraph);
                }
            }
        } else {
            descriptionContainer.remove()
            descriptionContainerMobile.remove()
        }
        this._warehouse.textContent = this.warehouse
        this._warehouseMobile.textContent = this.warehouse

        this._seller.textContent = this.seller

        this._quantity.textContent = this.quantity
        this._quantityMobile.textContent = this.quantity
        if (this.quantityRemains) {
            this._quantityRemains.textContent = 'Осталось ' + this.quantityRemains + ' шт.'
            this._quantityRemainsMobile.textContent = 'Осталось ' + this.quantityRemains + ' шт.'
        } else {
            this._quantityRemains.style.display = 'none'
        }
        this._checkQuantity()
        this._updatePrice()
        this._updateCartTopRow()
        this._updateCartNumber()
        this._tooltipTitle.textContent = this.currentGoodData.sellerInfo.name
        this._tooltipOGRN.textContent = this.currentGoodData.sellerInfo.ogrn
        this._tooltipAdress.textContent= this.currentGoodData.sellerInfo.adress

        if (this.actualPrice * this.quantity > 999999) {
            this._actualPrice.classList.remove('text_header3')    
            this._actualPrice.classList.add('text_header4')
            this._actualPriceMobile.classList.remove('text_header3')    
            this._actualPriceMobile.classList.add('text_header4')  
        }

        const elementDiv = this._cardElement.querySelector('.product-card');
        const elementDivMobile = this._mobileCardElement.querySelector('.product-card_mobile');

        elementDiv.setAttribute('id', this._cardId);
        elementDivMobile.setAttribute('id', this._cardId + 'mobile');
        
        this._setEventListeners();
        return [this._cardElement, this._mobileCardElement]
    }
}