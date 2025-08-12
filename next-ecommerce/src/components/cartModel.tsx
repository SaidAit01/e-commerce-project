"use client";

import Image from "next/image";

const CartModel = () => {
  const cartItems = false;

  return (
    <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20">
      {!cartItems ? (
        <div>Cart is empty</div>
      ) : (
        <div>
          <Image
            src="https://images.pexels.com/photos/16764210/pexels-photo-16764210.jpeg"
            alt="Product"
            width={72}
            height={96}
            className="object-cover rounded-md"
          />

          {/* TOP */}
          <div>
            {/* TITLE */}
            <div className="flex items-center justify-between">
              <h3>Product Name</h3>
              <div>$49</div>
            </div>

            {/* DESC */}
            <div>Available</div>
          </div>

          {/* BOTTOM */}
          <div className="flex items-center justify-between">
            <span>Total: $49</span>
            <button className="bg-black text-white px-3 py-1 rounded">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartModel;
