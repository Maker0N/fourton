import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartReducer";

const Item = (props) => {
  const dispatch = useDispatch();
  const [quantCart, setQuantCart] = useState(0);
  const [mouseEnter, setMouseEnter] = useState(false);

  const incQuantCart = (e) => {
    e.preventDefault();
    let value = quantCart;
    setQuantCart(value + 1);
  };

  const decQuantCart = (e) => {
    e.preventDefault();
    let value = quantCart;
    setQuantCart(value - 1);
  };

  const mouseEnterFunc = () => {
    setMouseEnter(true);
  };

  const mouseLeaveFunc = () => {
    setMouseEnter(false);
  };

  return (
    <article className="mx-8 mb-4 w-1/4 h-64 text-sm border-2 shadow-lg">
      <div
        className="flex justify-center bg-white overflow-auto h-3/4"
        onMouseEnter={mouseEnterFunc}
        onMouseLeave={mouseLeaveFunc}
      >
        {mouseEnter === false ? (
          <img alt="" src={props.product.photo} className="h-full" />
        ) : (
          <div className="p-1">
            {props.product.name}
          </div>
        )}
      </div>
      <div className="h-1/4 bg-red-200">
        <div className="flex justify-center h-1/3 bg-green-200">{`${props.product.price} $`}</div>
        <div className="flex justify-center h-1/3">
          <button
            className="flex justify-center w-1/3 bg-green-200 hover:bg-green-400 focus:outline-none"
            onClick={quantCart === 0 ? null : (e) => decQuantCart(e)}
          >
            -
          </button>
          <div className="flex justify-center w-1/3 bg-yellow-50">
            {quantCart}
          </div>
          <button
            className="flex justify-center w-1/3 bg-green-200 hover:bg-green-400 focus:outline-none"
            onClick={
              quantCart === props.product.quant ? null : (e) => incQuantCart(e)
            }
          >
            +
          </button>
        </div>
        <button
          className="flex justify-center w-full h-1/3 bg-red-200 hover:bg-red-500 focus:outline-none"
          onClick={(e) => {
            const payload = {
              id: props.product.id,
              name: props.product.name,
              quant: quantCart,
              price: props.product.price,
            };
            dispatch(addToCart(payload));
            setQuantCart(0);
          }}
        >
          ADD TO CART
        </button>
      </div>
    </article>
  );
};

export default Item;
