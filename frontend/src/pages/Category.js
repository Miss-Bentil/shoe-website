import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import CategoryCircle from '../components/CategoryCircle';
import { useSelector } from 'react-redux';
import HomeCard from '../components/HomeCard';
import { useParams } from 'react-router-dom';

function Category() {

    const brands = [
      'Nike',
      'Adidas',
      'Puma',
      'Skechers',
      'Jimmy Choo',
      'Mr. Price',
      'Gucci',
      'Louboutin',
      'Prada',
      'Fendi',
      'Crocs',
      'Birkenstock',
      'Other',
    ];

    const category = [
      'Athletic shoes',
      'Casual shoes',
      'Boots',
      'Sandals',
      'Flats',
      'Heels',
      'Slides',
      'Kids',
    ];

    


    const { categoryName } = useParams();
    // console.log(categoryName)
   const productData = useSelector((state) => state.product.productList);
   const [filteredProducts, setFilteredProducts] = useState([]);
    

     useEffect(() => {
       const filtered = productData.filter(
         (item) => item.category === categoryName
       );
       setFilteredProducts(filtered);
     }, [categoryName, productData]);


  return (
    <div className="mt-3">
      <div className='px-3'>
        <ul className="flex px-3 justify-between md:justify-start ">
          <li className="pr-2 md:pr-10">Brand</li>
          <li className="pr-2 md:pr-10">Gender</li>
          <li className="pr-2 md:pr-10">Price</li>
        </ul>
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

export default Category
