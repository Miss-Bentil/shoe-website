import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import ProductLine from './ProductLine';
import Table from 'react-bootstrap/Table';
import { BeatLoader } from 'react-spinners';
import Search from '../components/Search';
import { BsFillArrowUpSquareFill } from 'react-icons/bs';
import '../css/View.css';

function useHoverState() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return [isHovered, handleMouseEnter, handleMouseLeave];
}

function View() {
  const productList = useSelector((state) => state.product.productList);
  const [filteredProductList, setFilteredProductList] = useState(productList);
  const [filteredByNameProductList, setFilteredByNameProductList] =
    useState(productList);
  const [filteredByBrandProductList, setFilteredByBrandProductList] =
    useState(productList);
  const [filteredByCategoryProductList, setFilteredByCategoryProductList] =
    useState(productList);

  const [isScrolled, setIsScrolled] = useState(false);

  const [isBrandHovered, handleBrandHover, handleBrandLeave] = useHoverState();
  const [isPriceHovered, handlePriceHover, handlePriceLeave] = useHoverState();
  const [isGenderHovered, handleGenderHover, handleGenderLeave] =
    useHoverState();

  const [searchTerm, setSearchTerm] = useState('');

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPriceOrder, setSelectedPriceOrder] = useState(null);
  const [genderFilter, setGenderFilter] = useState(null);

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

  const sortedbrands = brands.sort();
  const sortedCategory = category.sort();

  const handleSearch = (searchTerm) => {
    const filteredByNameProducts = productList.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredByNameProductList(filteredByNameProducts);
  };

  console.log(productList)

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    let brandn = [...productList];
    setSelectedCategory(null);
    setGenderFilter(null);
    setSelectedPriceOrder(null);
    if (brand === null) {
      setFilteredByNameProductList(brandn);
    } else {
      const filteredProducts = brandn.filter(
        (product) => product.brand === brand
      );
      // setFilteredByBrandProductList(filteredProducts);
      // console.log(filteredByBrandProductList)
      setFilteredByNameProductList(filteredProducts);
    }
  };

  const handlePriceOrder = (order) => {
    setSelectedPriceOrder(order);
    let sortedProducts = [...productList];
    if (order === 'highest') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (order === 'lowest') {
      sortedProducts.sort((a, b) => a.price - b.price);
    }
    setFilteredByNameProductList(sortedProducts);
    setFilteredByBrandProductList([]);
    console.log(filteredByNameProductList);
  };

  const handleGenderSelect = (gender) => {
    setGenderFilter(gender);
    let filteredProducts = [...productList];
    if (gender !== null) {
      filteredProducts = filteredProducts.filter(
        (product) => product.gender === gender
      );
    }
    setFilteredByNameProductList(filteredProducts);
    console.log(filteredByBrandProductList);
  };

  const handleArrowUpClick = () => {
    setIsScrolled(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="pb-3 flex justify-between">
        <div className="flex justify-evenly">
          <div
            className="cursor-pointer"
            onMouseEnter={handleBrandHover}
            onMouseLeave={handleBrandLeave}
          >
            <p className="px-3">Brand </p>
            {isBrandHovered && (
              <div className="bg-white w-80 absolute z-50 py-3 px-2 ">
                <ul className="grid grid-cols-2">
                  <li onClick={() => handleBrandSelect(null)}>All</li>
                  {sortedbrands.map((brand, index) => (
                    <li key={index} onClick={() => handleBrandSelect(brand)}>
                      {brand}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div
            className="px-3 cursor-pointer "
            onMouseEnter={handleGenderHover}
            onMouseLeave={handleGenderLeave}
          >
            <p>Gender</p>
            {isGenderHovered && (
              <div className="bg-white w-40 absolute z-50 py-3 px-2">
                <ul>
                  <li
                    onClick={() => handleGenderSelect(null)}
                    className={genderFilter === null ? 'selected' : ''}
                  >
                    All
                  </li>
                  <li
                    onClick={() => handleGenderSelect('female')}
                    className={genderFilter === 'female' ? 'selected' : ''}
                  >
                    Female
                  </li>
                  <li
                    onClick={() => handleGenderSelect('male')}
                    className={genderFilter === 'male' ? 'selected' : ''}
                  >
                    Male
                  </li>
                  <li
                    onClick={() => handleGenderSelect('unisex')}
                    className={genderFilter === 'unisex' ? 'selected' : ''}
                  >
                    Unisex
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div
            className="px-3 cursor-pointer"
            onMouseEnter={handlePriceHover}
            onMouseLeave={handlePriceLeave}
          >
            <p>Price</p>
            {isPriceHovered && (
              <div className="bg-white w-60 absolute z-50 py-3 px-2">
                <ul>
                  <li onClick={() => handlePriceOrder('highest')}>
                    Highest to Lowest
                  </li>
                  <li onClick={() => handlePriceOrder('lowest')}>
                    Lowest to Highest
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="pr-3">
          <Search
            handleSearch={handleSearch}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </div>
      {productList[0] ? (
        <div className="overflow-x-auto table-container bg-white w-full sm:w-1/2 lg:w-2/3 xl:w-3/4 m-auto relative">
          <table className="table  table-bordered table-hover">
            <thead>
              <tr>
                <th>Product</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Price(Ghc) </th>
                <th>Gender</th>
                <th>Season</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {selectedBrand !== null
                ? filteredByNameProductList.map((item) => (
                    <ProductLine
                      key={item._id}
                      id={item._id}
                      stock={item.availability}
                      brand={item.brand}
                      category={item.category}
                      color={item.color}
                      description={item.description}
                      gender={item.gender}
                      image={item.image}
                      price={item.price}
                      season={item.season}
                      size={item.size}
                      name={item.name}
                      availability={item.availability}
                    />
                  ))
                : genderFilter !== null
                ? filteredByNameProductList.map((item) => (
                    <ProductLine
                      key={item._id}
                      id={item._id}
                      stock={item.availability}
                      brand={item.brand}
                      category={item.category}
                      color={item.color}
                      description={item.description}
                      gender={item.gender}
                      image={item.image}
                      price={item.price}
                      season={item.season}
                      size={item.size}
                      name={item.name}
                      availability={item.availability}
                    />
                  ))
                : selectedCategory !== null
                ? filteredByCategoryProductList.map((item) => (
                    <ProductLine
                      key={item._id}
                      id={item._id}
                      stock={item.availability}
                      brand={item.brand}
                      category={item.category}
                      color={item.color}
                      description={item.description}
                      gender={item.gender}
                      image={item.image}
                      price={item.price}
                      season={item.season}
                      size={item.size}
                      name={item.name}
                      availability={item.availability}
                    />
                  ))
                : searchTerm !== ''
                ? filteredByNameProductList.map((item) => (
                    <ProductLine
                      key={item._id}
                      id={item._id}
                      stock={item.availability}
                      brand={item.brand}
                      category={item.category}
                      color={item.color}
                      description={item.description}
                      gender={item.gender}
                      image={item.image}
                      price={item.price}
                      season={item.season}
                      size={item.size}
                      name={item.name}
                      availability={item.availability}
                    />
                  ))
                : selectedPriceOrder === 'highest'
                ? productList
                    .slice()
                    .sort((a, b) => b.price - a.price)
                    .map((item) => (
                      <ProductLine
                        key={item._id}
                        id={item._id}
                        stock={item.availability}
                        brand={item.brand}
                        category={item.category}
                        color={item.color}
                        description={item.description}
                        gender={item.gender}
                        image={item.image}
                        price={item.price}
                        season={item.season}
                        size={item.size}
                        name={item.name}
                        availability={item.availability}
                      />
                    ))
                : selectedPriceOrder === 'lowest'
                ? productList
                    .slice()
                    .sort((a, b) => a.price - b.price)
                    .map((item) => (
                      <ProductLine
                        key={item._id}
                        id={item._id}
                        stock={item.availability}
                        brand={item.brand}
                        category={item.category}
                        color={item.color}
                        description={item.description}
                        gender={item.gender}
                        image={item.image}
                        price={item.price}
                        season={item.season}
                        size={item.size}
                        name={item.name}
                        availability={item.availability}
                      />
                    ))
                : productList.map((item) => (
                    <ProductLine
                      key={item._id}
                      id={item._id}
                      stock={item.availability}
                      brand={item.brand}
                      category={item.category}
                      color={item.color}
                      description={item.description}
                      gender={item.gender}
                      image={item.image}
                      price={item.price}
                      season={item.season}
                      size={item.size}
                      name={item.name}
                      availability={item.availability}
                    />
                  ))}
            </tbody>
          </table>
          <div className="arrow-up" onClick={handleArrowUpClick}>
            <BsFillArrowUpSquareFill className="text-2xl md:text-4xl" />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <BeatLoader color="rgba(54, 215, 183, 1)" size={19} />
        </div>
      )}
    </>
  );
}

export default View;
