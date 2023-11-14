import { gql } from "apollo-server-express";
export const typeDefs = gql`
  scalar DateTime
  scalar Upload
  type Query {
    totalCoffees: String!
    totalBlends: String!
    getCoffee(id: String): Coffee
    getCoffees: [Coffee!]!
    getBlend(id: String): Blend
    getBlends: [Blend!]!
  }
  type Mutation {
    addCoffee(item: CoffeeInput): Status
    addBlend(item: BlendInput): Status
    updateCoffee(item: CoffeeInput): Status
    updateBlend(item: BlendInput): Status
    removeCoffee(id: ID): Status
    removeBlend(id: ID): Status
  }
  type Status {
    success: Boolean
    code: String
    message: String
  }

  # coffee
  type Coffee {
    _id: ID
    state: String
    key: Int
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
    key: Int
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
  type Blend {
    _id: ID
    state: String
    decaf: Boolean
    name: String
    createdAt: DateTime
    updatedAt: DateTime
    prices: [Price]
    coffees: [BlendCoffee]
    mouthfeel: Float
    acidity: Float
    caramel: Float
    fruit: Float
    flower: Float
    flavors: [String!]
    qualities: [String!]
    paragraphs: [String!]
  }
  input BlendInput {
    _id: ID
    state: String
    decaf: Boolean
    name: String
    prices: [PriceInput]
    coffees: [BlendCoffeeInput]
    mouthfeel: Float
    acidity: Float
    caramel: Float
    fruit: Float
    flower: Float
    flavors: [String!]
    qualities: [String!]
    paragraphs: [String!]
  }
  type BlendCoffee {
    coffee_id: ID
    percentage: Float
  }
  input BlendCoffeeInput {
    coffee_id: ID
    percentage: Float
  }
`;
export default typeDefs;
