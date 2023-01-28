export declare interface Coffee {
    _id: string
    state: string
    key: number
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

export declare interface Price {
    measurement: string
    quantity: number
    price: number
}
export declare interface Status {
    success: boolean
    code: string
    message: string
}

