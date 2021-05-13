import products from "./base";

const ADD_TO_CART = "ADD_TO_CART";

const initialState = {
  products: products,
  cart: [],
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
    default:
      return state;
  }
};

export function addToCart(payload) {
  return { type: ADD_TO_CART, payload };
}

export default cartReducer;
