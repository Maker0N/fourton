import React, { useState } from "react";

const PaymentForm = (props) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardNumberError, setCardNumberError] = useState(
    "Поле не может быть пустым"
  );
  const [cardNumberIn, setCardNumberIn] = useState(false);

  const [cardHolder, setCardHolder] = useState("");
  const [cardHolderError, setCardHolderError] = useState(
    "Поле не может быть пустым"
  );
  const [cardHolderIn, setCardHolderIn] = useState(false);

  const [expires, setExpires] = useState("");
  const [expiresError, setExpiresError] = useState("Поле не может быть пустым");
  const [expiresIn, setExpiresIn] = useState(false);

  const [cvv, setCvv] = useState(0);
  const [cvvError, setCvvError] = useState("Поле не может быть пустым");
  const [cvvIn, setCvvIn] = useState(false);

  const cardHandler = (e) => {
    setCardNumber(e.target.value);
    const regexp =
      /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|5[1-5][0-9]{14})$/;
    !regexp.test(e.target.value)
      ? setCardNumberError("Некорректный номер")
      : setCardNumberError("");
  };
  const blurCardHandler = (e) => {
    e.target.name === "cardNumber"
      ? setCardNumberIn(true)
      : setCardNumberIn(false);
  };

  const holderHandler = (e) => {
    setCardHolder(e.target.value);
    const regexp = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
    !regexp.test(e.target.value)
      ? setCardHolderError("Некорректное имя")
      : setCardHolderError("");
  };
  const blurHolderHandler = (e) => {
    e.target.name === "cardHolder"
      ? setCardHolderIn(true)
      : setCardHolderIn(false);
  };

  const expiresHandler = (e) => {
    setExpires(e.target.value);
    const regexp = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
    !regexp.test(e.target.value)
      ? setExpiresError("Некорректная дата")
      : setExpiresError("");
  };
  const blurExpiresHandler = (e) => {
    e.target.name === "expires" ? setExpiresIn(true) : setExpiresIn(false);
  };

  const cvvHandler = (e) => {
    setCvv(e.target.value);
    const regexp = /^[0-9]{3,4}$/;
    !regexp.test(e.target.value)
      ? setCvvError("Некорректный ввод")
      : setCvvError("");
  };
  const blurCvvHandler = (e) => {
    e.target.name === "cvv" ? setCvvIn(true) : setCvvIn(false);
  };
  if (!cardNumberError && !cardHolderError && !expiresError && !cvvError) {
     props.cardRec(cardNumber, cardHolder, expires, cvv);
  }

  return (
    <div className="mt-5 text-sm">
      <div className="flex justify-center">
        <div className="w-48"></div>
        <div className="w-80 h-24 bg-blue-300 rounded-t-lg relative shadow-lg">
          <div className="flex justify-end p-3 h-2/3">
            <img
              src={
                cardNumber.indexOf(2) === 0
                  ? "./data/mir.svg"
                  : cardNumber.indexOf(4) === 0
                  ? "./data/visa.svg"
                  : cardNumber.indexOf(5) === 0
                  ? "./data/mastercard.svg"
                  : null
              }
              alt=""
            />
          </div>
          <div className="h-1/3 pl-10">
            {cardNumber === "" ? "XXXX XXXX XXXX XXXX" : cardNumber}
          </div>
        </div>
        <div className="w-48"></div>
      </div>
      <div className="flex justify-center">
        <div className="w-48 bg-white border-l border-t"></div>
        <div className="w-80 h-24 bg-blue-300 rounded-b-lg relative shadow-lg">
          <div className="flex justify-between px-5 h-2/3">
            <div className="flex items-end">cardholder</div>
            <div className="flex items-end">expires</div>
          </div>
          <div className="flex justify-between px-5 h-1/3">
            <div className="">
              {cardHolder === "" ? "IVAN IVANOV" : cardHolder.toUpperCase()}
            </div>
            <div className="">{expires === "" ? "00/00" : expires}</div>
          </div>
        </div>
        <div className="w-48 bg-white border-t border-r"></div>
      </div>
      <div className="flex justify-center">
        <div className="w-48 bg-white border-l"></div>
        <div className="w-80 h-28 bg-white">
          <form>
            <label htmlFor="">Card number</label>
            <input
              name="cardNumber"
              type="text"
              className="w-80 px-1 border outline-none"
              onBlur={(e) => {
                blurCardHandler(e);
              }}
              onChange={(e) => {
                cardHandler(e);
              }}
            />
            <label htmlFor="">Card holder</label>
            <input
              name="cardHolder"
              type="text"
              className="w-80 px-1 border outline-none"
              onBlur={(e) => {
                blurHolderHandler(e);
              }}
              onChange={(e) => {
                holderHandler(e);
              }}
            />
          </form>
        </div>
        <div className="w-48 bg-white border-r text-red-500">
          <div className="h-1/2">
            {cardNumberIn && cardNumberError && (
              <div className="flex items-end pl-1 pt-3">{cardNumberError}</div>
            )}
          </div>
          <div className="h-1/2">
            {cardHolderIn && cardHolderError && (
              <div className="flex items-end pl-1 pt-1">{cardHolderError}</div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-48 bg-white border-l border-b"></div>
        <div className="w-80 h-12 bg-white border-b">
          <div className="flex">
            <div>
              <form>
                <label htmlFor="">Expires</label>
                <input
                  name="expires"
                  type="text"
                  className="w-12 border outline-none"
                  onBlur={(e) => blurExpiresHandler(e)}
                  onChange={(e) => {
                    expiresHandler(e);
                  }}
                />
              </form>
            </div>
            <div className="w-32 bg-white">
              {expiresIn && expiresError && (
                <div className="text-red-500">{expiresError}</div>
              )}
            </div>
            <div>
              <form>
                <label htmlFor="">CVV</label>
                <input
                  name="cvv"
                  type="text"
                  className="w-12 border outline-none"
                  onBlur={(e) => blurCvvHandler(e)}
                  onChange={(e) => {
                    cvvHandler(e);
                  }}
                />
              </form>
            </div>
          </div>
        </div>
        <div className="w-48 bg-white border-b border-r">
          {cvvIn && cvvError && (
            <div className="pl-1 text-red-500">{cvvError}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
