import React from 'react'
import { useSelector } from 'react-redux';
import HomeCard from './HomeCard';
import { sampleSize } from 'lodash';


function Recommended() {
  const productData = useSelector((state) => state.product.productList);

  // Function to select random products
  const getRandomProducts = (count) => {
    return sampleSize(productData, count);
  };

  // Select 5 random products
  const randomProducts = getRandomProducts(5);

  return (
    <div className="mt-3 mx-3">
      <div className="text-black text-xl">Top picks for you</div>
      <div className="flex gap-2 overflow-scroll scrollbar-none scroll-smooth">
        {randomProducts.map((product) => (
          <HomeCard
            key={product._id}
            id={product._id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
}

export default Recommended
