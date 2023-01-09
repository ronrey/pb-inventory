const { gql } = require('apollo-server-express');
module.exports = gql`
  scalar DateTime
  scalar Upload
  type Query {
    totalCoffees: String!
    getCoffee(id: String): Coffee
    getCoffees: [Coffee!]!
    getBlend(id: String): OurBlend
    getBlends: [OurBlend!]!
    getLearningItems: [LearningItem]
    getCustomSettings: CustomSettings
    getBrain: Brain!
  }
  type Mutation {
    addLearningItem(item: LearningItemInput): LearningItem
    addCoffee(item: CoffeeInput): Status
    addBlend(item: OurBlendItemInput): Status
    updateLearningItem(item:LearningItemInput):Status
    updateCoffee(item:CoffeeInput):Status
    updateBlend(item:OurBlendItemInput):Status
    removeLearningItem(id:ID):Status
    removeCoffee(id:ID):Status
    removeBlend(id:ID):Status
  }
  type Status {
    success: Boolean
    code: String
    message: String
  }
  type Brain {
    decaf: String
    regular: String
  }
  # coffee
  type Coffee {
    _id: ID
    state: String
    key: String
    decaf: Boolean
    createdAt: DateTime
    updatedAt: DateTime
    prices: [Price]
    mouthfeel: Float
    acidity: Float
    caramel: Float
    fruit: Float
    flower: Float
    flavors: [String!]
    qualities: [String!]
    region: String
    roast: String
    paragraphs: [String!]
  }
  input CoffeeInput {
    _id: ID
    state: String
    key: String
    decaf: Boolean
    prices: [PriceInput]
    mouthfeel: Float
    acidity: Float
    caramel: Float
    fruit: Float
    flower: Float
    flavors: [String!]
    qualities: [String!]
    region: String
    roast: String
    paragraphs: [String!]
  }
  type CustomSettings {
    prices: [Price]
  }
  type Price {
    measurement: String
    quantity: Int
    price: Float
  }
  input PriceInput {
    measurement: String
    quantity: Int
    price: Float
  }
  # our blend
  type OurBlend {
    _id: ID
    state: String
    decaf: Boolean
    name: String
    createdAt: DateTime
    updatedAt: DateTime
    price: Float
    prices: [Price]
    coffees: [ID]
    mouthfeel: Float
    acidity: Float
    caramel: Float
    fruit: Float
    flower: Float
    flavors: [String!]
    qualities: [String!]
    paragraphs: [String!]
  }

  #order
  type Order {
    _id: ID
    state: String
    createdAt: DateTime
    updatedAt: DateTime
    user_id: ID
    shippingAddress: Address
    payment: Payment
    coffeeItems: [CoffeeItem]
    ourBlendItems: [OurBlendItem]
    blendItems: [BlendItem]
  }

  input OrderInput {
    user_id: ID
    payment: PaymentInput
    coffeeItems: [CoffeeItemInput!]
    ourBlendItems: [OurBlendItemInput!]
    blendItems: [BlendItemInput!]
    shippingAddress: AddressInput
  }

  #order item
  input CoffeeItemInput {
    coffeeId: ID
    pricePerLb: Float
    quantity: Float
    price: PriceInput
  }
  type CoffeeItem {
    coffeeId: ID
    state: String
    pricePerLb: Float
    quantity: Float
    price: Price
  }
  #ourBlend item
  input OurBlendItemInput {
    blendId: ID
    pricePerLb: Float
    quantity: Float
    price: PriceInput
  }
  type OurBlendItem {
    blendId: ID
    state: String
    pricePerLb: Float
    qualities: [String!]
    quantity: Float
    price: Price
  }

  input BlendItemInput {
    qualities: QualitiesInput
    coffees: [PurchasedBlendInput]
    blendId: String
    quantity: Float
    price: PriceInput
  }
  type BlendItem {
    qualities: Qualities
    state: String
    coffees: [PurchasedBlend]
    blendId: String
    quantity: Float
    price: Price
  }

  #address
  type Address {
    city: String
    street: String
    suite: String
    zipcode: String
    state: String
    country: String
  }
  input AddressInput {
    city: String
    street: String
    suite: String
    zipcode: String
    state: String
    country: String
  }

  # payment
  type Payment {
    name: String
    number: String
    month: String
    year: String
    cvc: String
    billingAddress: Address
  }
  input PaymentInput {
    name: String
    number: String
    month: String
    year: String
    cvc: String
    billingAddress: AddressInput
  }
  # qualities
  type Qualities {
    acidity: Float
    mouthFeel: Float
    caramel: Float
    fruit: Float
    flower: Float
  }
  input QualitiesInput {
    acidity: Float
    mouthFeel: Float
    caramel: Float
    fruit: Float
    flower: Float
  }
  #purchased blend
  type PurchasedBlend {
    coffeeId: ID
    pricePerLb: Float
    percentage: Float
    price: Price
  }
  input PurchasedBlendInput {
    coffeeId: ID
    pricePerLb: Float
    percentage: Float
    price: PriceInput
  }


  type TrainingResult {
    error: Float
    iterations: Int
    et: Int
  }

  type LearningItem {
    _id: ID
    mouthfeel: Float
    acidity: Float
    caramel: Float
    fruit: Float
    flower: Float
    key: String
    createdAt: DateTime
    approvedAt: DateTime
    state: String
  }
  input LearningItemInput {
    mouthfeel: Float
    acidity: Float
    caramel: Float
    fruit: Float
    flower: Float
    key: String
  }
`;
