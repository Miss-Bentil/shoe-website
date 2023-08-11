import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.product.cartItem);
  // console.log(cartItems);
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="">
      <div className=" pt-3 px-3 flex justify-between items-center pb-3">
        <div onClick={handleGoBack}>
          <AiOutlineArrowLeft className="text-3xl text-black" />
        </div>
        <div className="text-2xl">My Cart</div>
        <div>
          <HiOutlineDotsHorizontal className="text-2xl" />
        </div>
      </div>

      <div className="">
        {cartItems.map((item) => {
          return (
            <CartItem
              key={item.id}
              name={item.name}
              image={item.image}
              price={item.price}
              id={item.id}
              qty={item.qty}
              color={item.color}
              total={item.total}
              availability={item.availability}
            />
          );
        })}
      </div>
      <div className="flex justify-between mt-5 px-3">
        <span className="text-xl">Subtotal</span>
      </div>
    </div>
  );
}

export default Cart;
