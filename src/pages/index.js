import '../pages/index.css';

import Modal from '../components/Modal'
import ProductCard from '../components/ProductCard'
import ProductCardOutOfStock from '../components/ProductCardOutOfStock'
import Colapse from '../components/Colapse';
import Summary from '../components/Summary'
import BankCard from '../components/BankCard';
import Delivery from '../components/Delivery';
import InputValidator from '../components/InputValidator';

import {goodsData, paymentData, deliveryAdressData} from '../data/consts'




const paymentModalData = {
    modal: '.payment-modal',
    openBtns: ['openPaymentModalBtnFromSummary', 'openPaymentModalBtnFromPayMethod'],
    closeBtn: 'closePaymentModalBtn',
    submitBtn: 'confirmPaymentCardbtn'
}

const deliveryModalData = {
    modal: '.delivery-modal',
    openBtns: ['openDeliveryModalBtnFromSummary', 'openDeliveryModalBtnFromDeliveryMethod'],
    closeBtn: 'closeDeliveryModalBtn',
    submitBtn: 'confirmDeliverybtn'
}

const paymentModal = new Modal(paymentModalData);
const deliveryModal = new Modal(deliveryModalData);

paymentModal.setEventListeners()
deliveryModal.setEventListeners()


const goodsInStockColapse = new Colapse(
        '#goodsColapseBtn-instock-open',
        '#goodsColapseBtn-instock-close',
        '#InStockColumn',
        '#cart-top-row-instock-open',
        '#cart-top-row-instock-close'
    )
goodsInStockColapse.setEventListeners()

const goodsOutOfStockColapse = new Colapse(
        '#goodsColapseBtn-outOfStock-open',
        '#goodsColapseBtn-outOfStock-close',
        '#outOfStockColumn',
        '#cart-top-row-outOfStock-open',
        '#cart-top-row-outOfStock-close'
    )
goodsOutOfStockColapse.setEventListeners()



const SummaryCalc = new Summary(goodsData)
SummaryCalc.updatePrices()
SummaryCalc.setEventListeners()


const goodsColumnInStock = document.querySelector('#InStockColumn');
const goodsColumnOutOfStock = document.querySelector('#outOfStockColumn');


function createCardInStok (cardData) {
    const card = new ProductCard(
        '#product-template',
        '#product-template-mobile',
        '#cardInfoColumn',
        '#cardInfoColumnGood',
        cardData.id,
        goodsData,
        SummaryCalc,
        checkAllSelect
    )

    const cardElements = card.generateCard();
    cardElements.forEach((card) => {
        goodsColumnInStock.append(card);
    })
    return card
}
function createCardOutOfStok (cardData) {
    const card = new ProductCardOutOfStock('#product-template-outofstock', '#product-template-mobile-outofstock', cardData.id, goodsData)
    const cardElements = card.generateCard();
    cardElements.forEach((card) => {
        goodsColumnOutOfStock.append(card);
    })
}
const inStockCardsArr = []
goodsData.forEach((cardData) => {
    if(cardData.inStock) {
        inStockCardsArr.push(createCardInStok(cardData))
    } else {
        createCardOutOfStok(cardData)
    }
})


const bacnkCradRow = document.querySelector('#bacnkCradRow')

const bankCardsElements = []

function createBankCard (bankCardData) {
    const bankCard = new BankCard(bankCardData.id, '#backCardTemplate', paymentData, bankCardsElements)
    const bankCradElements = bankCard.generateCard();
    bacnkCradRow.append(bankCradElements);
    return bankCard
}

paymentData.forEach((paymentCard) => {
    bankCardsElements.push(createBankCard(paymentCard))
})

const courierDeliveryAdressesColumn = document.querySelector('#courierDeliveryAdressesColumn')
const pointDeliveryAdressesColumn = document.querySelector('#pointDeliveryAdressesColumn');
const deliveryElements = []

function createAdressItem (adressData) {
    const adressItem = new Delivery(adressData.id, '#courierDeliveryAdressesTemplate', '#pointDeliveryAdressesTemplate', deliveryAdressData, deliveryElements)
    const bankCradElements = adressItem.generateAdress();

    if (adressData.type === 'courier') {
        courierDeliveryAdressesColumn.append(bankCradElements);
    }
    if (adressData.type === 'point') {
        pointDeliveryAdressesColumn.append(bankCradElements);
    }
    return adressItem
}

deliveryAdressData.courierAdresses.forEach((deliveryAdress) => {
    deliveryElements.push(createAdressItem(deliveryAdress))
})

deliveryAdressData.pointAdresses.forEach((deliveryAdress) => {
    deliveryElements.push(createAdressItem(deliveryAdress))
})


const selectAllbtn = document.querySelector('#selectAllbtn')

function checkAllSelect() {
    for (const card of goodsData) {
        if (card.inStock && !card.isSelected) {
            selectAllbtn.classList.remove('checkbox_active');
            return false;
        }
    }
    selectAllbtn.classList.add('checkbox_active');
    return true;
}
function selectAllHandler() {
    if (checkAllSelect()) {
        goodsData.forEach(card => {
            if (card.inStock) {
                card.isSelected = false
            }
        });
        selectAllbtn.classList.remove('checkbox_active');
    } else {
        goodsData.forEach(card => {
            if (card.inStock) {
                card.isSelected = true
            }
        });
        selectAllbtn.classList.add('checkbox_active');
    }
    inStockCardsArr.forEach((card) => card.updateSelect())
}
selectAllbtn.addEventListener('click', () => {
    selectAllHandler(goodsData)
})

const pointAdresesBtn = document.querySelector('#pointDeliveryBtn')
const courierAdresesBtn = document.querySelector('#courierDeliveryBtn')

pointAdresesBtn.addEventListener('click', () => {
    pointAdresesBtn.classList.add('delivery-type__btn_active')
    courierAdresesBtn.classList.remove('delivery-type__btn_active')
    pointDeliveryAdressesColumn.style.display = 'flex'
    courierDeliveryAdressesColumn.style.display = 'none'
})
courierAdresesBtn.addEventListener('click', () => {
    pointAdresesBtn.classList.remove('delivery-type__btn_active')
    courierAdresesBtn.classList.add('delivery-type__btn_active')
    pointDeliveryAdressesColumn.style.display = 'none'
    courierDeliveryAdressesColumn.style.display = 'flex'
})


const validator = new InputValidator();
  
const nameInput = document.getElementById("first-name-input");
const nameErrorElement = document.getElementById("first-name-error");
validator.addInput(nameInput, nameErrorElement, null, "Укажите имя", "Проверьте имя", (value) => validator.validateName(value));

const surnameInput = document.getElementById("surname-input");
const surnameErrorElement = document.getElementById("surname-error");
validator.addInput(surnameInput, surnameErrorElement, null, "Введите фамилию", "Проверьте фамилию", (value) => validator.validateName(value));

const emailInput = document.getElementById("email-input");
const emailErrorElement = document.getElementById("email-error");
validator.addInput(emailInput, emailErrorElement, null, "Укажите электронную почту", "Проверьте адрес электронной почты", (value) => validator.validateEmail(value));

const phoneInput = document.getElementById("phone-input");
const phoneErrorElement = document.getElementById("phone-error");
validator.addInput(phoneInput, phoneErrorElement, null, "Укажите номер телефона", "Формат: +9 999 999 99 99", (value) => validator.validatePhone(value));

const innInput = document.getElementById("inn-input");
const innErrorElement = document.getElementById("inn-error");
const descriptionElement = document.getElementById("inn-description");
validator.addInput(innInput, innErrorElement, descriptionElement, "Укажите ИНН", "Проверьте ИНН", (value) => validator.validateINN(value));

const submitButton = document.getElementById("orderBtn");
submitButton.addEventListener("click", () => {
  validator.validateAllInputs();
});
