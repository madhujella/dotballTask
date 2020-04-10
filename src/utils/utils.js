
const USDINR = 60

export const EXCHANGE_TYPE = {
    TO_DOMESTIC: 'DOMESTIC',
    TO_INTERNATIONAL: 'INTERNATIONAL'
}


export const currencyConversion = (price, type) => type === EXCHANGE_TYPE.TO_DOMESTIC ? price * USDINR : price / USDINR
