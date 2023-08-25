export default class Summary {
    constructor(goodsData) {
        this.summaryTitleValue = document.querySelector('#summaryFinalValue');
        this.summaryGoodsQuantity = document.querySelector('#summaryGoodsQuantity');
        this.summaryFullValue = document.querySelector('#summaryFullValue');
        this.summaryDiscountValue = document.querySelector('#summaryDiscountValue');
        this.summaryDeliveryAdress = document.querySelector('#summaryDeliveryAdress');
        this.goodsData = goodsData;
        this.finalPrice = 0;
        this.isOnlinePayment = false;
        this.onlinePaymentBtn = document.querySelector('#onlinePaymentBtn');
        this.orderBtn = document.querySelector('#orderBtn');
        this.onlinePaymentBtnDescription = document.querySelector('#onlinePaymentBtnDescription')

        this.tikerSpan = document.createElement("span");
        this.tikerSpan.className = "summary__title-text-tiker";
        this.tikerSpan.classList.add('text_header3')
        this.tikerSpan.textContent = " сом";

        this.tikerSpanSmall = document.createElement("span");
        this.tikerSpanSmall.className = "text_body";
        this.tikerSpanSmall.textContent = " сом";
    }

    _formatePrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    updatePrices() {
        const selectedGoods = this.goodsData.filter(elem => elem.isSelected);
        this.finalPrice = selectedGoods.reduce((sum, elem) => sum + Math.round(elem.actualPrice * elem.quantity), 0);
        const fullPrice = selectedGoods.reduce((sum, elem) => sum + Math.round(elem.fullPrice * elem.quantity), 0);
        this.summaryTitleValue.textContent = this._formatePrice(this.finalPrice);
        this.summaryTitleValue.appendChild(this.tikerSpan.cloneNode(true))
        this.summaryDiscountValue.textContent = '−' + this._formatePrice(Math.round(this.finalPrice * 0.1));
        this.summaryDiscountValue.appendChild(this.tikerSpanSmall.cloneNode(true))
        this.summaryFullValue.textContent = this._formatePrice(fullPrice);
        this.summaryFullValue.appendChild(this.tikerSpanSmall.cloneNode(true))

        if (this.isOnlinePayment) {
            this.orderBtn.textContent = 'Оплатить ' + this._formatePrice(this.finalPrice) + ' сом';
        }
    }

    _onlinePayment() {
        this.isOnlinePayment = !this.isOnlinePayment;
        this.onlinePaymentBtn.classList.toggle('checkbox_active', this.isOnlinePayment);
        if (this.isOnlinePayment) {
            this.onlinePaymentBtnDescription.style.display = 'none'
        } else {
            this.onlinePaymentBtnDescription.style.display = 'inline'
        }
        this.orderBtn.textContent = this.isOnlinePayment ? ('Оплатить ' + this._formatePrice(this.finalPrice) + ' сом') : 'Заказать';
    }

    setEventListeners() {
        this.onlinePaymentBtn.addEventListener('click', this._onlinePayment.bind(this));
    }
}
