import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  addToCart,
  deleteFromCart,
  changeQuantCartDec,
  changeQuantCartInc,
} from "../redux/cartReducer";

const Item = (props) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [quantCartMain, setQuantCartMain] = useState(0);
  const [mouseEnter, setMouseEnter] = useState(false);

  const incQuantCart = (e) => {
    e.preventDefault();
    let value = quantCartMain;
    setQuantCartMain(value + 1);
  };

  const decQuantCart = (e) => {
    e.preventDefault();
    let value = quantCartMain;
    setQuantCartMain(value - 1);
  };

  const mouseEnterFunc = () => {
    setMouseEnter(true);
  };

  const mouseLeaveFunc = () => {
    setMouseEnter(false);
  };

  return pathname === "/" ? (
    <article className="mx-8 mb-4 w-1/4 h-64 text-sm border-2 shadow-lg">
      <div
        className="flex justify-center bg-white overflow-auto h-3/4"
        onMouseEnter={mouseEnterFunc}
        onMouseLeave={mouseLeaveFunc}
      >
        {mouseEnter === false ? (
          <img alt="" src={props.product.photo} className="h-full" />
        ) : (
          <div className="p-1">{props.product.name}</div>
        )}
      </div>
      <div className="h-1/4 bg-red-200">
        <div className="flex justify-center h-1/3 bg-green-200">{`${props.product.price} $`}</div>
        <div className="flex justify-center h-1/3">
          <button
            className="flex justify-center w-1/3 bg-green-200 hover:bg-green-400 focus:outline-none"
            onClick={quantCartMain === 0 ? null : (e) => decQuantCart(e)}
          >
            -
          </button>
          <div className="flex justify-center w-1/3 bg-yellow-50">
            {quantCartMain}
          </div>
          <button
            className="flex justify-center w-1/3 bg-green-200 hover:bg-green-400 focus:outline-none"
            onClick={
              quantCartMain === props.product.quant
                ? null
                : (e) => incQuantCart(e)
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
              quant: quantCartMain,
              price: props.product.price,
            };
            dispatch(addToCart(payload));
            setQuantCartMain(0);
          }}
        >
          ADD TO CART
        </button>
      </div>
    </article>
  ) : (
    <div className="w-5/6 bg-white border">
      {props.cart.map((it) => (
        <article
          key={it.id}
          className="flex justify-between m-2 px-2 text-sm bg-gray-200"
        >
          <div className="w-1/2">{it.name.slice(0, 41)}</div>
          <div className="flex mx-5">
            <button
              className="mx-2 focus:outline-none"
              onClick={(e) => {
                e.preventDefault();
                const [{ quant }] = props.products.filter(
                  (item) => item.id === it.id
                );
                console.log(quant);
                dispatch(
                  changeQuantCartDec({
                    id: it.id,
                    productQuant: quant,
                    cartQuant: it.quant,
                  })
                );
              }}
            >
              -
            </button>
            <div className="mx-2">{it.quant}</div>
            <button
              className="mx-2 focus:outline-none"
              onClick={(e) => {
                e.preventDefault();
                const [{ quant }] = props.products.filter(item => item.id === it.id)
                dispatch(
                  changeQuantCartInc({
                    id: it.id,
                    productQuant: quant,
                    cartQuant: it.quant
                  })
                );
              }}
            >
              +
            </button>
          </div>
          <div className="mx-2 w-20">{`${it.quant * it.price} $`}</div>
          <div className="mx-2">
            <button
              className="focus:outline-none"
              onClick={(e) => {
                e.preventDefault();
                dispatch(deleteFromCart({ id: it.id, quant: it.quant }));
              }}
            >
              X
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Item;
