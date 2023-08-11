import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai';
import {BsCartPlus} from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { addCartItems } from '../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';


function HomeCard({name,image,price,id,color}) {
   const truncatedName = name.length > 14 ? `${name.slice(0, 14)}...` : name;
 
   const dispatch = useDispatch()
    const productData = useSelector((state) => state.product.productList);

   const handleAddCart = () => {
        dispatch(addCartItems({
          _id: id,
          name:name, 
          price:price,
          image:image,
          color:color,
        }
        ));  
   }
 

  return (
    <div className="pt-3 px-2 items-center justify-items-center ">
      <Link
        className="link-style hover:text-slate-700"
        to={`/product/${id}`}
        onClick={() => window.scrollTo({ top: '0', behaviour: 'smooth' })}
      >
        <div className="w-40 h-40 ">
          <img
            src={image}
            alt=""
            className="w-full h-full bg-slate-300 hover:bg-slate-400 rounded-lg"
          />
        </div>

        <div className="name ">{truncatedName}</div>
      </Link>
      <div className="flex justify-between items-center deet_color">
        Ghc{price}
        {/* <AiOutlineHeart className="deet_color" /> */}
        <BsCartPlus className="deet_color text-lg" onClick={handleAddCart} />
      </div>
    </div>
  );
}

export default HomeCard
