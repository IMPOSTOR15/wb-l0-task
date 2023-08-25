import '../pages/index.css';

import Modal from '../components/Modal'
import ProductCard from '../components/ProductCard'
import ProductCardOutOfStock from '../components/ProductCardOutOfStock'
import Colapse from '../components/Colapse';
import Summary from '../components/Summary'
import BankCard from '../components/BankCard';
import Delivery from '../components/Delivery';
import InputValidator from '../components/InputValidator';

import caseImg from '../../PUBLIC/assets/cart_images/case.png'
import tshirtImg from '../../PUBLIC/assets/cart_images/tshirt.png'
import pensImg from '../../PUBLIC/assets/cart_images/pens.png'

import mirLogo from '../../PUBLIC/icons/cart_icons/mir.svg'
import visalogo from '../../PUBLIC/icons/cart_icons/visa.svg'
import mastercardLogo from '../../PUBLIC/icons/cart_icons/mastercard.svg'
import maestroLogo from '../../PUBLIC/icons/cart_icons/maestro.svg'
const goodsData = [
    {
        id: 1,
        title: 'Футболка UZcotton мужская',
        imageSrc: tshirtImg,
        specifications: {
            Цвет: 'белый',
            Размер: '56',
        },
        warehouse: 'Коледино WB',
        seller: 'OOO Вайлдберриз',
        sellerInfo: {
            name: 'OOO Вайлдберриз',
            ogrn: 'ОГРН: 1067746062449',
            adress: '142181, Московская область, д Коледино, тер. Индустриальный Парк Коледино, д. 6 стр. 1',
        },
        quantity: 1,
        quantityRemains: 2,
        actualPrice: 522,
        fullPrice: 1051,
        discountSpec: {
            'Скидка 55%': '−300 сом',
            'Скидка покупателя 10%': '−30 сом'
        },
        isSelected: true,
        inStock: true,
    },
    {
        id: 2,
        title: 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
        imageSrc: caseImg,
        specifications: {
            Цвет: 'прозрачный',
        },
        warehouse: 'Коледино WB',
        seller: 'OOO Мегапрофстиль',
        sellerInfo: {
            name: 'OOO «МЕГАПРОФСТИЛЬ»',
            ogrn: 'ОГРН: 5167746237148',
            adress: '129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34',
        },
        quantity: 200,
        actualPrice: 10500.235,
        fullPrice: 11500.235,
        discount: {
            'Скидка 55%': '−300 сом',
            'Скидка покупателя 10%': '−30 сом'
        },
        isSelected: true,
        inStock: true,
    },
    {
        id: 3,
        title: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell ',
        imageSrc: pensImg,
        warehouse: 'Коледино WB',
        seller: 'OOO Вайлдберриз',
        sellerInfo: {
            name: 'OOO Вайлдберриз',
            ogrn: 'ОГРН: 1067746062449',
            adress: '142181, Московская область, д Коледино, тер. Индустриальный Парк Коледино, д. 6 стр. 1',
        },
        quantity: 2,
        quantityRemains: 2,
        actualPrice: 247,
        fullPrice: 475,
        discount: {
            'Скидка 55%': '−300 сом',
            'Скидка покупателя 10%': '−30 сом'
        },
        isSelected: true,
        inStock: true,
    },
    {
        id: 4,
        title: 'Футболка UZcotton мужская',
        imageSrc: tshirtImg,
        specifications: {
            Цвет: 'белый',
            Размер: '56',
        },
        warehouse: 'Коледино WB',
        seller: 'OOO Вайлдберриз',
        sellerInfo: {
            name: 'OOO Вайлдберриз',
            ogrn: 'ОГРН: 1067746062449',
            adress: '142181, Московская область, д Коледино, тер. Индустриальный Парк Коледино, д. 6 стр. 1',
        },
        inStock: false,
    },
    {
        id: 5,
        title: 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
        imageSrc: caseImg,
        specifications: {
            Цвет: 'прозрачный',
        },
        warehouse: 'Коледино WB',
        seller: 'OOO Мегапрофстиль',
        sellerInfo: {
            name: 'OOO «МЕГАПРОФСТИЛЬ»',
            ogrn: 'ОГРН: 5167746237148',
            adress: '129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34',
        },
        inStock: false,
    },
    {
        id: 6,
        title: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell ',
        imageSrc: pensImg,
        warehouse: 'Коледино WB',
        seller: 'OOO Вайлдберриз',
        sellerInfo: {
            name: 'OOO Вайлдберриз',
            ogrn: 'ОГРН: 1067746062449',
            adress: '142181, Московская область, д Коледино, тер. Индустриальный Парк Коледино, д. 6 стр. 1',
        },
        inStock: false,
    },
]

const paymentData = [
    {
        id: 1,
        cardNumber: '4000 56•• •••• 1234',
        cardDate: '01/29',
        paySystemIco: mirLogo,
        isSelected: true,
    },
    {
        id: 2,
        cardNumber: '3122 56•• •••• 1234',
        cardDate: '12/23',
        paySystemIco: visalogo,
        isSelected: false,
    },
    {
        id: 3,
        cardNumber: '1853 56•• •••• 1234',
        cardDate: '06/25',
        paySystemIco: mastercardLogo,
        isSelected: false,
    },
    {
        id: 4,
        cardNumber: '9345 56•• •••• 1234',
        cardDate: '11/27',
        paySystemIco: maestroLogo,
        isSelected: false,
    },
]

const deliveryAdressData = {
    courierAdresses: [
        {
            id: 1,
            type: 'courier',
            adress: 'Бишкек, улица Табышалиева, 57',
            isSelected: false
        },
        {
            id: 2,
            type: 'courier',
            adress: 'Бишкек, улица Жукеева-Пудовкина, 77/1',
            isSelected: false
        },
        {
            id: 3,
            type: 'courier',
            adress: 'г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/1',
            isSelected: false
        },
    ],
    pointAdresses: [
        {
            id: 4,
            type: 'point',
            adress: 'г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/1',
            rating: '4.99',
            time: 'Ежедневно с 10 до 21',
            isSelected: false
        },
        {
            id: 5,
            type: 'point',
            adress: 'Бишкек, улица Ахматбека Суюмбаева, 12/1',
            rating: '4.97',
            time: 'Ежедневно с 9 до 22',
            isSelected: true
        },
        {
            id: 6,
            type: 'point',
            adress: 'Бишкек, улица Табышалиева, 57',
            rating: '4.88',
            time: 'Ежедневно с 8 до 23',
            isSelected: false
        },
    ]
}




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
    const card = new ProductCard('#product-template', '#product-template-mobile', cardData.id, goodsData, SummaryCalc, checkAllSelect)
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
