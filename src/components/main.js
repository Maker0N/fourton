import React from "react"
import { useSelector } from 'react-redux'
import Item from './item'

function Main() {
  const { products, cart } = useSelector(s => s.cartReducer)
  console.log(products, cart)
  return (
  <main className="flex justify-center py-3 bg-gray-100">
    <section className='flex w-5/6 flex-wrap'>
       {products.map(it => <Item key={it.id} product={it}/>)}
    </section>
    </main>
  )
}

export default Main;
