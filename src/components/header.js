import React from "react";
import { useSelector } from 'react-redux'

function Header() {
  const { cart } = useSelector(s => s.cartReducer)
  const pcs = cart.reduce((acc, rec) => acc + rec.quant, 0)
  return (
    <header className="flex justify-between items-center bg-gray-200 h-9">
      <div className="px-2 w-1/4">Fourton</div>
      <div className="px-2 w-2/3">Menu</div>
      <div className="px-2 w-1/4">{`Cart ${pcs} pcs.`}</div>
    </header>
  );
}

export default Header;
