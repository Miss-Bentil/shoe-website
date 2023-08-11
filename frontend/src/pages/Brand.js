import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams,useNavigate } from 'react-router-dom';
import HomeCard from '../components/HomeCard';
import { AiOutlineArrowLeft, AiOutlineHeart } from 'react-icons/ai';

function Brand() {
  const { brandName } = useParams();
  console.log(brandName);

  const navigate = useNavigate();

  const productData = useSelector((state) => state.product.productList);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filtered = productData.filter((item) => item.brand === brandName);
    setFilteredProducts(filtered);
  }, [brandName, productData]);


    const handleGoBack = () => {
      navigate(-1);
      window.scrollTo({ top: '0', behavior: 'smooth' });
    };
  return (
    <div>
      <div onClick={handleGoBack} className='px-3' >
        <AiOutlineArrowLeft className="text-3xl text-black" />
      </div>
      <div className="display grid grid-cols-2 md:grid-cols-5 gap-2 mx-auto px-3 justify-items-center">
        {filteredProducts.map((item) => (
          <HomeCard
            key={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
            id={item._id}
          />
        ))}
      </div>
    </div>
  );
}

export default Brand;
