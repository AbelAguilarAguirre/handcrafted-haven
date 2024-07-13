import { useCart } from "@/app/CartContext";
import { useEffect, useState } from "react";


export default function CartSummary() {
    const { cartItemsCopy } = useCart();
    const [subtotal, setSubtotal] = useState(0);
    const [shipping, setShipping] = useState(5);
    const [tax, setTax] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
      const newSubtotal = cartItemsCopy.reduce((acc, item) => {
        return acc + (Number(item.price) * Number(item.quantity)) / 2;
      }, 0);

      const newTax = newSubtotal * 0.06;
      const newTotal = newSubtotal + shipping + newTax;

      setSubtotal(newSubtotal);
      setShipping(5);
      setTax(newTax);
      setTotal(newTotal);
    }, [cartItemsCopy, shipping]);

    return (
      <div className="w-full max-w-[46rem] p-4 flex flex-col m-auto gap-2 md:gap-4">
        <div className="flex justify-between">
          <p className="font-bold md:text-xl">Subtotal</p>
          <p className="font-bold md:text-2xl">${subtotal?.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-bold md:text-xl">Shipping</p>
          <p className="font-bold md:text-2xl">${shipping?.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-bold md:text-xl">Tax</p>
          <p className="font-bold md:text-2xl">${tax?.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-bold md:text-xl">Total</p>
          <p className="font-bold md:text-2xl">${total?.toFixed(2)}</p>
        </div>
        <button className="w-full max-w-80 m-auto py-2 bg-black text-white rounded-md hover:bg-gray-700">
          Checkout
        </button>
      </div>
    );
}