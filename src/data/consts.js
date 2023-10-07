import caseImg from '../../PUBLIC/assets/cart_images/case.png'
import tshirtImg from '../../PUBLIC/assets/cart_images/tshirt.png'
import pensImg from '../../PUBLIC/assets/cart_images/pens.png'

import mirLogo from '../../PUBLIC/icons/cart_icons/mir.svg'
import visalogo from '../../PUBLIC/icons/cart_icons/visa.svg'
import mastercardLogo from '../../PUBLIC/icons/cart_icons/mastercard.svg'
import maestroLogo from '../../PUBLIC/icons/cart_icons/maestro.svg'

export const goodsData = [
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
        avalibleOnFastWarehouse: 2,
        actualPrice: 522,
        fullPrice: 1051,
        discountSpec: {
            'Скидка 55%': '−300 сом',
            'Скидка покупателя 10%': '−30 сом'
        },
        isSelected: true,
        inStock: true,
        isFavorit: false,
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
        avalibleOnFastWarehouse: 184,
        actualPrice: 10500.235,
        fullPrice: 11500.235,
        discount: {
            'Скидка 55%': '−300 сом',
            'Скидка покупателя 10%': '−30 сом'
        },
        isSelected: true,
        inStock: true,
        isFavorit: false,
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
        avalibleOnFastWarehouse: 2,
        actualPrice: 247,
        fullPrice: 475,
        discount: {
            'Скидка 55%': '−300 сом',
            'Скидка покупателя 10%': '−30 сом'
        },
        isSelected: true,
        inStock: true,
        isFavorit: false,
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
        isFavorit: false,
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
        isFavorit: false,
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
        isFavorit: false,
    },
]

export const paymentData = [
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

export const deliveryAdressData = {
    courierAdresses: [
        {
            id: 1,
            type: 'courier',
            adress: 'Бишкек, улица Табышалиева, 57',
            isSelected: true
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
            isSelected: false
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