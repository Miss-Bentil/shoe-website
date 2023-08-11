import React, { useEffect, useState } from 'react';
import Search from '../components/Search';
import '../css/Home.css';
import HomeSearch from './HomeSearch';
import blacknike from '../assets/Home/blacknike.jpg';
import brownshoe from '../assets/Home/brownshoe.jpg';
import humanfoot from '../assets/Home/humanfoot.jpg';
import redandwhite from '../assets/filaimg.jpg';
import Carousel from 'react-bootstrap/Carousel';
import 'swiper/swiper-bundle.min.css';
import {
  EffectFade,
  Navigation,
  Pagination,
  Scrollbar,
  FreeMode,
} from 'swiper';
import 'swiper/css/navigation';
import 'swiper/swiper.min.css';
import { useSelector } from 'react-redux';
import HomeCard from '../components/HomeCard';
import CategoryCircle from '../components/CategoryCircle';
import banner from '../assets/banners.jpg';
import casual from '../assets/Home/athleticpic.jpg';
import trainers from '../assets/Home/trainer.jpg';
import boots from '../assets/Home/boots.jpg';
import sandals from '../assets/Home/sandals.jpg';
import flats from '../assets/Home/flats.jpg';
import heels from '../assets/Home/heels.jpg';
import slides from '../assets/Home/slides.jpg';
import babyshoe from '../assets/Home/babyshoe.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import adidas from '../assets/brand/brandadidas.jpg';
import gucci from '../assets/brand/brandgucci.jpg';
import jimmy from '../assets/brand/brandjimmychoo.jpg';
import nike from '../assets/brand/brandnike.jpg';
import puma from '../assets/brand/brandpuma.jpg';
import skechers from '../assets/brand/skechers.jpg';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { AiOutlinePlus } from 'react-icons/ai';

import 'swiper/css';

import BrandSwipper from './BrandSwipper';

function Home({ isLoading }) {
  const productList = useSelector((state) => state.product.productList);
  const [index, setIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [scrollingUp, setScrollingUp] = useState(false);
  const [filteredByNameProductList, setFilteredByNameProductList] =
    useState(productList);

  const cat = [
    { id: 1, name: 'athletic shoes', image: trainers },
    { id: 2, name: 'casual shoes', image: casual },
    { id: 3, name: 'boots', image: boots },
    { id: 4, name: 'sandals', image: sandals },
    { id: 5, name: 'flats', image: flats },
    { id: 6, name: 'heels', image: heels },
    { id: 7, name: 'slides', image: slides },
    { id: 8, name: 'kids', image: babyshoe },
  ];

  const brand = [
    { id: 1, name: 'Nike', image: nike },
    { id: 2, name: 'Adidas', image: adidas },
    { id: 3, name: 'Puma', image: puma },
    { id: 4, name: 'Skechers', image: skechers },
    { id: 5, name: 'Jimmy Choo', image: jimmy },
    { id: 6, name: 'Gucci', image: gucci },
    // { id: 5, name: 'Mr. Price' },
    // { id: 6, name: 'Louboutin' },
    // { id: 7, name: 'Prada' },
    // { id: 8, name: 'Fendi' },
    // { id: 9, name: 'Crocs' },
    // { id: 10, name: 'Birkenstock' },
    // { id: 11, name: 'Other' },
  ];
  // console.log(brand)

  const productData = useSelector((state) => state.product.productList);
  // console.log(productData);
  const allProducts = productData;
  // This code is to show the last items. Date or time used to upload could be used instead
  const newproducts = productData.slice(-10);
  // console.log(newproducts)
  const categories = productData;
  // console.log(categories)

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProducts(allProducts);
    } else if (activeCategory === 'kids') {
      const filtered = allProducts.filter((item) => {
        // console.log(item.category)
        return item.category === 'kids';
      });
      setFilteredProducts(filtered);
    } else {
      const filtered = allProducts.filter((item) => {
        return item.gender === activeCategory;
      });

      setFilteredProducts(filtered);
    }
  }, [activeCategory, allProducts]);

  const [displayCount, setDisplayCount] = useState(16);

  // Function to handle "View More" button click
  const handleViewMore = () => {
    setDisplayCount((prevCount) => prevCount + 15);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user is scrolling up (you can adjust the threshold as needed)
      setScrollingUp(window.scrollY > 0);
    };

    // Add the event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (searchTerm) => {
    const filteredByNameProducts = productList.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredByNameProductList(filteredByNameProducts);
  };

  const [selected, setSelected] = useState(null);

  const toggle = (section) => {
    setSelected(selected === section ? null : section);
  };

  return (
    <div className="mt-1 ">
      <div
        className={` w-full justify-end flex px-2 ${
          scrollingUp ? 'fixed-search' : ''
        }`}
      >
        <HomeSearch
          handleSearch={handleSearch}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      {/* <div className="mt-5 px-3">
        <div className="sub-heading text-2xl">Search Results</div>
        <div className="flex gap-2 overflow-scroll scrollbar-none scroll-smooth px-1">
          {filteredByNameProductList.map((item) => {
            // Display filteredProducts instead of newproducts
            return (
              <HomeCard
                key={item._id}
                name={item.name}
                image={item.image}
                color={item.color}
                price={item.price}
                id={item._id}
              />
            );
          })}
        </div>
      </div> */}

      <div className="mt-3 md:hidden px-3">
        <div>
          <div className="img_container  w-full  overflow-hidden relative">
            <img
              src={redandwhite}
              alt=""
              className="w-full h-full object-cover first_image"
            />

            <div className="caption absolute bottom-2 right-2 z-10 ">
              Hurry Up
              <div>Up to 25% discount</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 ">
        <Carousel className="carousel">
          <Carousel.Item className="relative">
            <img
              className="d-block w-full carousel-height"
              src={blacknike}
              alt="First slide"
            />
            <Carousel.Caption className="absolute bottom-5 right-style text-left">
              <h3 className="text-md text-left">UP TO 30% OFF</h3>
              <p className="text-8xl text-left">Exclusive </p>
              <p className="text-8xl bold text-left">New Shoes </p>
              <p className="border border-2 max-w-xxs text-2xl p-2">Shop Now</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-full carousel-height"
              src={brownshoe}
              alt="Second slide"
            />

            <Carousel.Caption className="absolute bottom-5 right-style text-left">
              <h3 className="text-md text-left">UP TO 30% OFF</h3>
              <p className="text-8xl text-left">Exclusive </p>
              <p className="text-8xl bold text-left">New Shoes </p>
              <p className="border border-2 max-w-xxs text-2xl p-2">Shop Now</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-full carousel-height"
              src={humanfoot}
              alt="Third slide"
            />

            <Carousel.Caption className="absolute bottom-5 right-style text-left">
              <h3 className="text-md text-left">UP TO 30% OFF</h3>
              <p className="text-8xl text-left">Exclusive </p>
              <p className="text-8xl bold text-left">New Shoes </p>
              <p className="border border-2 max-w-xxs text-2xl p-2">Shop Now</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      {/* </div> */}
      <div className="mt-3 px-3">
        <div onClick={() => window.scrollTo({ top: '0', behaviour: 'smooth' })}>
          <div className="text-center my-4 md:text-3xl">Shop by Category</div>
          <CategoryCircle categories={cat} />
        </div>
      </div>
      <div className="mt-5 px-3">
        <div className="sub-heading text-2xl">NEW IN</div>
        <div className="flex gap-2 overflow-scroll scrollbar-none scroll-smooth px-1">
          {newproducts[0] &&
            newproducts.map((item) => {
              return (
                <HomeCard
                  key={item._id}
                  name={item.name}
                  image={item.image}
                  color={item.color}
                  price={item.price}
                  id={item._id}
                />
              );
            })}
        </div>
      </div>

      <div className="mt-3">
        <div className="relative mt-5 mb-5">
          <div className="banner_container mt-3 h-20 md:h-56">
            <img src={banner} alt="" className="object-cover h-full w-full" />
          </div>
          <div className="absolute md:bottom-10 left-10 md:text-5xl bottom-3  ">
            Saving 50%
            <br />
            All Online Store
          </div>
        </div>

        {/* <div className="flex justify-between mt-3 px-3 md:gap-40 md:justify-center ">
          <div className="cursor-pointer">All Ghc20</div>
          <div className="cursor-pointer">10%-20% off</div>
          <div className="cursor-pointer">Starting from Ghc10</div>
        </div> */}
        <div className="mx-4">
          <div className="flex overflow-scroll scrollbar-none scroll-smooth  px-4 ">
            {allProducts[0] &&
              allProducts
                .filter((item) => item.price === '20')
                .map((item) => {
                  return (
                    <HomeCard
                      key={item._id}
                      name={item.name}
                      image={item.image}
                      price={item.price}
                      color={item.color}
                      id={item._id}
                    />
                  );
                })}
          </div>
        </div>

        <div className="px-3 mt-3">
          <div className="sub-heading text-2xl py-3">TRENDING BRANDS</div>

          <BrandSwipper brand={brand} />
        </div>

        <div className="mt-3 px-3">
          <div className="flex justify-between md:w-full md:gap-40 md:justify-center ">
            <p
              className={`text-lg ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              ALL
            </p>
            <p
              className={`text-lg ${
                activeCategory === 'female' ? 'active' : ''
              }`}
              onClick={() => setActiveCategory('female')}
            >
              WOMEN
            </p>
            <p
              className={`text-lg ${activeCategory === 'male' ? 'active' : ''}`}
              onClick={() => setActiveCategory('male')}
            >
              MEN
            </p>
            <p
              className={`text-lg ${activeCategory === 'kids' ? 'active' : ''}`}
              onClick={() => setActiveCategory('kids')}
            >
              KIDS
            </p>
          </div>
        </div>

        <div className="mt-3 display px-3 ">
          <div className="grid grid-cols-2 md:grid-cols-5  justify-items-center">
            {filteredProducts.slice(0, displayCount).map((item) => {
              return (
                <HomeCard
                  key={item._id}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                  id={item._id}
                  color={item.color}
                />
              );
            })}
          </div>
        </div>
        {displayCount < filteredProducts.length && (
          <div className="flex justify-center mx-auto">
            <button
              className="bg-blue-300 px-3 py-2 mt-4"
              onClick={handleViewMore}
            >
              View More
            </button>
          </div>
        )}
        <footer className="mt-3 px-10 grid grid-cols-1 md:grid-cols-3 bg-slate-400 gap-10 justify-around w-full md:py-5 py-4 ">
          <div
            className={`contact-us flex flex-col ${
              selected === 'contact' ? 'selected' : ''
            }`}
          >
            <div
              className="flex items-center justify-between"
              onClick={() => toggle('contact')}
            >
              <div className="text-2xl">Contact Us</div>
              <AiOutlinePlus
                className={`plus text-xl ${selected ? 'rotate-icon' : ''}`}
              />
            </div>
            <div className="deets">
              <p>Address</p>
              <p>Phone: (+233)34 392 8394</p>
              <p>Email:stranger@gmail.com</p>
              <div className="flex gap-3 ">
                <FaFacebook />
                <FaInstagram />
                <FaTwitter />
              </div>
            </div>
          </div>
          <div
            className={`company flex flex-col ${
              selected === 'company' ? 'selected' : ''
            }`}
          >
            <div
              className="flex items-center justify-between"
              onClick={() => toggle('company')}
            >
              <div className="text-2xl"> Information</div>
              <AiOutlinePlus
                className={`plus text-xl ${
                  selected === 'company' ? 'rotate-icon' : ''
                }`}
              />
            </div>
            <div className="deets">
              <p>Company</p>
              <p>About</p>
              <p>Jobs</p>
              <p>Whats New</p>
            </div>
          </div>
          <div
            className={`newsletter flex flex-col ${
              selected === 'newsletter' ? 'selected' : ''
            }`}
          >
            <div
              className="flex items-center justify-between"
              onClick={() => toggle('newsletter')}
            >
              <div className="text-2xl"> Join Our Newsletter Now</div>
              <AiOutlinePlus
                className={`plus text-xl ${selected ? 'rotate-icon' : ''}`}
              />
            </div>
            <div className="deets">
              <p>
                Exceptional quality. Ethical factories. Sign up to enjoy free
                U.S. shipping and returns on your first order.
              </p>
              <input
                type="text"
                placeholder="Enter your email address here..."
                className="px-3 py-2 w-full"
              />
              <br />
              <button className="cursor-pointer mt-3 py-2 bg-slate-500 w-full">
                Subscribe
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
