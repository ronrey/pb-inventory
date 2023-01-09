export interface Price {
    measurement: string
    quantity: number
    price: number
}
export interface Coffee {
    _id: string
    state: string
    key: string
    decaf: boolean
    prices: Price[]
    mouthfeel: number
    acidity: number
    caramel: number
    fruit: number
    flower: number
    flavors: string[]
    qualities: string[]
    region: string
    roast: string
    paragraphs: string[]
}