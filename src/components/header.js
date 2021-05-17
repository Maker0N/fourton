import React from "react";
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Header() {
  const { cart } = useSelector(s => s.cartReducer)
  const pcs = cart.reduce((acc, rec) => acc + rec.quant, 0)
  return (
    <header className="flex justify-between items-center bg-gray-200 h-9">
      <Link to='/' className="px-2 w-1/4">Fourton</Link>
      <div className="px-2 w-2/3">Menu</div>
      <Link to='/cart' className="px-2 w-1/4">{`Cart ${pcs} pcs.`}</Link>
    </header>
  );
}

export default Header;
