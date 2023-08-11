import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import Dots from 'react-slick-dots';
// import './custom-slick.css';

function BrandSwipper({ brand }) {
  const productData = useSelector((state) => state.product.productList);
  const brandd = productData.map((item) => item.brand);

  
    
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // For small screens
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

    const imageStyle = {
      width: '100%', 
      height: '350px', 
      objectFit: 'cover',
    };

      if (window.innerWidth < 768) {
        imageStyle.height = '200px';
       
      }

  return (
    <div className="px-8">
      <Slider {...settings}>
        {brand.map((item) => (
          <Link
            key={item.id}
            to={`/brand/${item.name}`}
            onClick={() => window.scrollTo({ top: '0', behaviour: 'smooth' })}
          >
            <div className="pr-3">
              {/* <div className="w-85 h-90"> */}
              <img
                src={item.image}
                alt={item.name}
                style={imageStyle}
                className="cursor-pointer"
              />
              {/* </div> */}
            </div>
          </Link>
        ))}
        {/* </div> */}
      </Slider>
    </div>
  );
}

export default BrandSwipper;
