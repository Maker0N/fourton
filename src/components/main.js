import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Item from "./item";
import PaymentForm from "./paymentForm";

function Main() {
  const { pathname } = useLocation();
  const { products, cart, cardInfo } = useSelector((s) => s.cartReducer);
  const cartTotalPrice = cart.reduce(
    (acc, rec) => acc + rec.quant * rec.price,
    0
  );

  const cardRec = (cardNumber, cardHolder, expires, cvv) => {
    const card = ({
      cardNumber,
      cardHolder,
      expires,
      cvv,
    });
    console.log(card)
  };

  const order = (cart, cartTotalPrice) => {
    const totalOrder = {
      cart,
      cartTotalPrice
    };
    console.log(totalOrder);
  };

  console.log(cardInfo)

  return pathname === "/" ? (
    <main className="flex justify-center py-3 bg-gray-100">
      <section className="flex w-5/6 flex-wrap">
        {products.map((it) => (
          <Item key={it.id} product={it} />
        ))}
      </section>
    </main>
  ) : (
    <div className="flex-col text-sm">
      <PaymentForm cardRec={cardRec} />
      <section className="flex justify-center w-full mt-5">
        <Item products={products} cart={cart} />
      </section>
      <div className="flex justify-center">
        <div className="flex justify-between w-5/6 mt-5 px-4 py-1 bg-gray-200">
          <div>{`Total: ${cartTotalPrice} $`}</div>
          <button
            className="focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              if (cartTotalPrice !== 0) {
                order(cart, cartTotalPrice);
              }
            }}
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;
