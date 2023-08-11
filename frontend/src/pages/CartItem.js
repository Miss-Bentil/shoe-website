import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { deleteCartItem,increaseQty,decreaseQty } from '../redux/productSlice';
import { useDispatch } from 'react-redux';

function CartItem({ name, image, id, price, qty, total, color,availability }) {
  const productName = name;
  const truncatedName =
    productName.length > 14 ? `${productName.slice(0, 30)}...` : productName;
    const dispatch = useDispatch()
    // console.log(availability)
    const handleDelete = () => {
        dispatch(deleteCartItem(id))
    }
    const handleIncreaseQty = () => {
        dispatch(increaseQty(id))
        // console.log(qty)
        console.log(color)
        if (qty < availability) {
          dispatch(increaseQty(id));
        } 
    }
     const handleDecreaseQty = () => {
        dispatch(decreaseQty(id))
        
    }

  return (
    <div className="flex px-3 mt-3 gap-2">
      <div className="w-20 h-20 bg-slate-300 rounded-lg">
        <img src={image} alt="" />
      </div>
      <div className="w-80 h-20 flex flex-col justify-between">
        <div className="flex justify-between items-center ">
          <div> {truncatedName} </div>
          <FaTimes onClick={handleDelete} />
        </div>

        <div className="text-gray-400 text-sm">color: {color}</div>
        <div className="flex justify-between">
          <span className="text-sm">Ghc{price}</span>
          <div className="flex justify-center gap-2 items-center">
            <AiOutlineMinusCircle onClick={handleDecreaseQty} />
            {qty}
            <AiOutlinePlusCircle
              onClick={handleIncreaseQty}
              style={{ cursor: qty < availability ? 'pointer' : 'not-allowed' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
