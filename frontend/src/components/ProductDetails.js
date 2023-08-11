import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AiOutlineArrowLeft, AiOutlineHeart } from 'react-icons/ai';
import Size from './Size';
import Recommended from './Recommended';
import { addCartItems } from '../redux/productSlice';

function ProductDetails() {
  const { filterby } = useParams();
  const navigate = useNavigate();
  const [scrollUp, setScrollUp] = useState(true);

  const productData = useSelector((state) => state.product.productList);
  // console.log(productData)

  const productDisplay = productData.filter((item) => item._id === filterby)[0];
  // console.log(productDisplay)
  const {name,price,image,color,_id,qty} = productDisplay;
 


  const namee = productDisplay.name;
  const truncatedName = namee.length > 14 ? `${namee.slice(0, 20)}...` : namee;
  const capitalizedTruncatedName =
    truncatedName.charAt(0).toUpperCase() + truncatedName.slice(1);

  const capitalizedWords = name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const shouldScrollUp = prevScrollPos > currentScrollPos;

      setScrollUp(shouldScrollUp);
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  

  const dispatch = useDispatch();

  const handleAddCart = () => {
    dispatch(
      addCartItems({
        id: _id,
        name: name,
        price: price,
        image: image,
        qty:qty,
        color: color,
      })
    );
  };

  return (
    <div className="relative">
      <div className=" pt-3 px-3 flex justify-between items-center pb-3 ">
        <div onClick={handleGoBack}>
          <AiOutlineArrowLeft className="text-3xl text-black" />
        </div>
        <div className="text-2xl">{capitalizedTruncatedName}</div>
        <AiOutlineHeart className="text-2xl" />
      </div>

      <div className="mt-3">
        <div
          className="w-50 h-50  mx-auto shadows container  "
          style={{ transform: 'rotate(25deg)' }}
        >
          <img src={productDisplay.image} className=" img md:mr-0" alt=""  />
        </div>
      </div>
      <div className="px-3 mt-3 ">
        <div className="py-3 text-black text-2xl">{capitalizedWords}</div>
        <div>{productDisplay.description}</div>
        <div className="mt-3">
          <div className="size text-black text-xl">Size</div>
          {/* {productDisplay.size} */}
          <Size availableSize={productDisplay.size} />
          <hr />
          <div className="flex items-center">
            <span className="mr-2">Qty:</span>
            <div className="border-2 border-gray-300 rounded-md flex items-center justify-center px-3">
              <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                -
              </button>
              <span className="mx-2">0</span>
              <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                +
              </button>
            </div>
          </div>

          <div className="color">
            <div className="pb-1 pt-3">Color:</div>
            {productDisplay.color}
          </div>
        </div>
      </div>

      <div
        className={`bottom-nav fixed flex px-2 -bottom-1 w-full h-12 justify-between items-center bg-white ${
          scrollUp ? '' : 'hide'
        }`}
      >
        <AiOutlineHeart className="w-20 text-3xl" />
        <div
          className="w-80  h-8 flex justify-center text-center items-center bg-black text-xl text-slate-200"
          onClick={handleAddCart}
        >
          Add to Cart
        </div>
      </div>

      <Recommended />
    </div>
  );
}

export default ProductDetails;
