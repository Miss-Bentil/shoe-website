import React from 'react';
import blacknike from '../assets/Home/blacknike.jpg';
import brownshoe from '../assets/Home/brownshoe.jpg';
import humanfoot from '../assets/Home/humanfoot.jpg';
import casual from '../assets/Home/athleticpic.jpg';
import trainers from '../assets/Home/trainer.jpg';
import boots from '../assets/Home/boots.jpg';
import sandals from '../assets/Home/sandals.jpg';
import flats from '../assets/Home/flats.jpg';
import heels from '../assets/Home/heels.jpg';
import slides from '../assets/Home/slides.jpg';
import babyshoe from '../assets/Home/babyshoe.jpg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function CategoryCircle({ categories }) {
  const productData = useSelector((state) => state.product.productList);
  const category = productData.map((item) => item.category);
  // console.log(category)

   

  return (
    <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
      {categories.map((category) => (
        <div
          key={category.id}
         
        >
          <Link className='link-style cursor-pointer' to={`/category/${category.name}`}>
            <div className="flex flex-col items-center gap-2">
              <div className="circle_img rounded-full w-14 h-14 md:w-24 md:h-24">
                <img
                  src={category.image}
                  alt=""
                  className="rounded-full w-full h-full mx-auto zoomed"
                />
              </div>
              <div className="text-center">{category.name}</div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CategoryCircle;
