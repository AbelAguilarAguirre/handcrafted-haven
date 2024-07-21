import { useCart } from "@/app/ui/cart/CartContext";
import { useEffect, useState } from "react";

export default function CartSummary() {
  const { cartItems } = useCart();
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(5);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (cartItems.length === 0) {
      setSubtotal(0);
      setShipping(0);
      setTax(0);
      setTotal(0);
    } else {
      let newSubtotal = cartItems.reduce((acc, item) => {
        return acc + Number(item.price) * Number(item.quantity);
      }, 0);

      let newTax = newSubtotal * 0.06;
      let newTotal = newSubtotal + shipping + newTax;

      setShipping(5);
      setTax(newTax);
      setTotal(newTotal);
      setSubtotal(newSubtotal);
    }
  }, [cartItems]);

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
