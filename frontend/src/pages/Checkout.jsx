import React from 'react'
import { updateCart } from '../apis/api'

const Checkout = () => {
  const onPaymentDone = async()=>{
    let resp = await updateCart(localStorage.getItem("email"));
    if(resp?.data?.result === 1){
      alert("payment dont now you will not get notification");
    }
  }
  return (
    <div>
      <p className="text-2xl w-100 flex justify-center font-semibold">
        Checkout page
      </p>
      <p>To stop the notification you have to click on the payment button. Means now you have nothing in your cart</p>
      <button
        onClick={onPaymentDone}
        className="mt-5 ml-2 bg-slate-500 border-slate-600 text-white px-4 py-2 rounded-lg"
      >
        Payment Done
      </button>
    </div>
  )
}

export default Checkout