import products from "./base";

const ADD_TO_CART = "ADD_TO_CART";
const DELETE_FROM_CART = "DELETE_FROM_CART";
const CHANGE_QUANT_CART_DEC = "CHANGE_QUANT_CART_DEC";
const CHANGE_QUANT_CART_INC = "CHANGE_QUANT_CART_INC";

const initialState = {
  products: products,
  cart: [],
  cardInfo: {},
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        products: state.products.map((it) =>
          it.id === action.payload.id
            ? { ...it, quant: it.quant - action.payload.quant }
            : it
        ),
        cart:
          state.cart.length === 0
            ? [
                ...state.cart,
                {
                  id: action.payload.id,
                  name: action.payload.name,
                  quant: action.payload.quant,
                  price: action.payload.price,
                },
              ]
            : state.cart.map((it) => (it = it.id)).includes(action.payload.id)
            ? state.cart.map((it) =>
                it.id === action.payload.id
                  ? { ...it, quant: it.quant + action.payload.quant }
                  : it
              )
            : [
                ...state.cart,
                {
                  id: action.payload.id,
                  name: action.payload.name,
                  quant: action.payload.quant,
                  price: action.payload.price,
                },
              ],
      };
    case DELETE_FROM_CART:
      return {
        ...state,
        products: state.products.map((it) =>
          it.id === action.payload.id
            ? { ...it, quant: it.quant + action.payload.quant }
            : it
        ),
        cart: state.cart.filter((it) => it.id !== action.payload.id),
      };
    case CHANGE_QUANT_CART_DEC:
      return {
        ...state,
        products: state.products.map((it) =>
          it.id === action.payload.id
            ? {
                ...it,
                quant: action.payload.cartQuant !== 0 ? it.quant + 1 : it.quant,
              }
            : it
        ),
        cart: state.cart.map((it) =>
          it.id === action.payload.id
            ? { ...it, quant: it.quant !== 0 ? it.quant - 1 : 0 }
            : it
        ),
      };
    case CHANGE_QUANT_CART_INC:
      return {
        ...state,
        products: state.products.map((it) =>
          it.id === action.payload.id
            ? { ...it, quant: it.quant !== 0 ? it.quant - 1 : 0 }
            : it
        ),
        cart: state.cart.map((it) =>
          it.id === action.payload.id
            ? {
                ...it,
                quant: action.payload.productQuant !== 0 ? it.quant + 1 : it.quant,
              }
            : it
        ),
      };

    default:
      return state;
  }
};

export function addToCart(payload) {
  return { type: ADD_TO_CART, payload };
}

export function deleteFromCart(payload) {
  return { type: DELETE_FROM_CART, payload };
}

export function changeQuantCartDec(payload) {
  return { type: CHANGE_QUANT_CART_DEC, payload };
}

export function changeQuantCartInc(payload) {
  return { type: CHANGE_QUANT_CART_INC, payload };
}

export default cartReducer;
