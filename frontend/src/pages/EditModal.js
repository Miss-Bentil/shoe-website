import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Imagetobase64 } from '../utility/imagetoBase64';
import { toast } from 'react-hot-toast';
import Multiselect from 'multiselect-react-dropdown';
import { BsCloudUpload } from 'react-icons/bs';

function EditModal({ selectedItem, setShow}) {
  const uploadImage = async (e) => {
    const data = await Imagetobase64(e.target.files[0]);
    setData((prev) => {
      return {
        ...prev,
        image: data,
      };
    });
  };

  const handleOnSelect = (selectedList) => {
    setData((prev) => ({
      ...prev,
      size: selectedList.map((item) => item.value),
    }));
  };

  const categories = [
    'athletic shoes',
    'casual shoes',
    'boots',
    'sandals',
    'flats',
    'heels',
    'slides',
    'kids',
  ].sort();

  const colors = [
    'blue',
    'pink',
    'brown',
    'green',
    'white',
    'black',
    "grey",
    "Purple",
    "yellow",
    'multi-coloured',
  ].sort();

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
  ].sort();


  const handleOnRemove = (selectedList) => {
    setData((prev) => ({
      ...prev,
      size: selectedList.map((item) => item.value),
    }));
  };


  const [data, setData] = useState({
    name: '',
    category: '',
    color: '',
    image: '',
    price: '',
    description: '',
    season: '',
    size: [],
    gender: '',
    brand: '',
    availability: '',
  });

 const handleOnChange = (e) => {
   const { name, value, type } = e.target;
   setData((prev) => {
     if (name === 'size' && type === 'select-multiple') {
       const selectedOptions = Array.from(
         e.target.selectedOptions,
         (option) => option.value
       );
       return {
         ...prev,
         size: selectedOptions,
       };
     }

     return {
       ...prev,
       [name]: value,
     };
   });
 };
  useEffect(() => {
    if (selectedItem) {
      setData({
        name: selectedItem.name,
        category: selectedItem.category,
        color: selectedItem.color,
        image: selectedItem.image,
        price: selectedItem.price,
        description: selectedItem.description,
        season: selectedItem.season,
        size: selectedItem.size,
        gender: selectedItem.gender,
        brand: selectedItem.brand,
        availability: selectedItem.availability,
      });
    }
  }, [selectedItem]);

 

  const [options, setOptions] = useState([
    { value: '35', label: '35' },
    { value: '36', label: '36' },
    { value: '37', label: '37' },
    { value: '38', label: '38' },
    { value: '39', label: '39' },
    { value: '40', label: '40' },
    { value: '41', label: '41' },
    { value: '42', label: '42' },
    { value: '43', label: '43' },
    { value: '44', label: '44' },
    { value: '45', label: '45' },
    { value: '46', label: '46' },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      category,
      color,
      image,
      price,
      description,
      season,
      size,
      gender,
      brand,
      availability,
    } = data;

    if (name) {
      const requestBody = {
        id: selectedItem.id,
        data: {
          name,
          category,
          color,
          image,
          price,
          description,
          season,
          size,
          gender,
          brand,
          availability,
        },
      };
      

      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/updateProduct`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          }
        );

        const fetchResponse = await response.json();

        if (response.ok) {
          toast('Product updated successfully');
          setShow(false);
        } else {
          toast.error('Failed to update product');
        }
      } catch (error) {
        toast.error('An error occurred while updating the product');
      }
    } else {
      toast('Please fill in all the required fields');
    }
  };
  return (
    <div>
      <form
        action=""
        className="m-auto w-full max-w-md shadow flex flex-col p-3 bg-white"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="">
          Name
        </label>
        <input
          type="text"
          name="name"
          className="bg-slate-200 p-1 mb-3 my-1"
          value={data.name}
          onChange={handleOnChange}
        />
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id=""
          className="bg-slate-200 p-1 mb-3 my-1"
          value={data.category}
          onChange={handleOnChange}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <label htmlFor="image" className="mb-3">
          Upload Image
          <div className="h-40 w-full bg-slate-200 rounded flex items-center justify-center cursor-pointer">
            {data.image ? (
              <img src={data.image} className="h-full" />
            ) : (
              <span className="text-5xl">
                <BsCloudUpload />
              </span>
            )}

            <input
              type="file"
              onChange={uploadImage}
              id="image"
              className="hidden mb-4"
              accept="image/*"
            />
          </div>
        </label>

        <div className="">
          <div className="container-fluid p-0 grid grid-cols-2 gap-4">
            <label htmlFor="price" className="my-1 ">
              Price
            </label>
            <label htmlFor="gender" className="my-1 ">
              Gender
            </label>
          </div>
          <div className="container-fluid p-0 grid grid-cols-2 gap-4 mb-2">
            <input
              type="number"
              name="price"
              id=""
              className="bg-slate-200 p-1  mr-2 my-1  "
              value={data.price}
              onChange={handleOnChange}
            />

            <select
              name="gender"
              id=""
              className="bg-slate-200 p-1 my-1 "
              value={data.gender}
              onChange={handleOnChange}
            >
              <option value={''}>Select </option>
              <option value={'male'}>Male</option>
              <option value={'female'}>Female</option>
              <option value={'unisex'}>Unisex</option>
            </select>
          </div>
        </div>
        <div className="">
          <div className="container-fluid p-0 grid grid-cols-2 gap-4">
            <label htmlFor="color" className="my-1 ">
              Color
            </label>
            <label htmlFor="season" className="my-1 ">
              Season
            </label>
          </div>
          <div className="container-fluid p-0 grid grid-cols-2 gap-4 mb-2">
            <select
              name="color"
              id=""
              className="bg-slate-200 p-1 my-1"
              value={data.color}
              onChange={handleOnChange}
            >
              <option value="">Select</option>
              {colors.map((color) => (
                <option key={color} value={color}>
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </option>
              ))}
            </select>

            <select
              name="season"
              id=""
              className="bg-slate-200 p-1 my-1 "
              value={data.season}
              onChange={handleOnChange}
            >
              <option value={''}>Select </option>
              <option value={'Summer'}>Summer</option>
              <option value={'Winter'}>Winter</option>
              <option value={'All Weather'}>All Weather</option>
            </select>
          </div>
        </div>

        <div className="">
          <div className="container-fluid p-0 grid grid-cols-2 gap-4">
            <label htmlFor="brand" className="my-1 ">
              Brand
            </label>
            <label htmlFor="availability" className="my-1 ">
              Availability
            </label>
          </div>
          <div className="container-fluid p-0 grid grid-cols-2 gap-4 mb-2">
            <select
              name="brand"
              id=""
              className="bg-slate-200 p-1 my-1"
              value={data.brand}
              onChange={handleOnChange}
            >
              <option value="">Select</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="availability"
              className="bg-slate-200 p-1  mr-2 my-1  "
              value={data.availability}
              onChange={handleOnChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="size" className="my-1 ">
            Size
          </label>
          <Multiselect
            options={options}
            onSelect={handleOnSelect}
            onRemove={handleOnRemove}
            displayValue="label"
            className="bg-slate-200  mr-2 my-1 border-none "
            value={data.size}
            onChange={handleOnChange}
          />
        </div>

        <label htmlFor="">Product Description</label>
        <textarea
          name="description"
          id=""
          rows="3"
          className="bg-slate-200 p-1 my-2 resize-none"
          value={data.description}
          onChange={handleOnChange}
        ></textarea>
        <button className="bg-red-500 hover-bg-red-600 text-white font-md my-2 ">
          Save
        </button>
      </form>
    </div>
  );
}

export default EditModal;
