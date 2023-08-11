import React, { useState } from 'react';
import { BsCloudUpload } from 'react-icons/bs';
import { Imagetobase64 } from '../utility/imagetoBase64';
import { toast } from 'react-hot-toast';
import Multiselect from 'multiselect-react-dropdown';

function NewProduct() {
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

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleOnSelect = (selectedList) => {
    setData((prevData) => ({
      ...prevData,
      size: selectedList.map((item) => item.value),
    }));
  };

  const handleOnRemove = (selectedList) => {
    setData((prevData) => ({
      ...prevData,
      size: selectedList.map((item) => item.value),
    }));
  };




  const uploadImage = async (e) => {
    const data = await Imagetobase64(e.target.files[0]);
    setData((prev) => {
      return {
        ...prev,
        image: data,
      };
    });
  };

      const handleMultiselectChange = (selectedList, selectedItem) => {
        const selectedOptions = selectedList.map((option) => option.value);
        setData((prev) => {
          return {
            ...prev,
            size: selectedOptions,
          };
        });
      };



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    const {
      name,
      image,
      category,
      price,
      size,
      description,
      season,
      brand,
      availability,
      color
    } = data;

    if (name && image && category && price && description && season && brand && availability && color && size) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/uploadProduct`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      const fetchResponse = await fetchData.json();
    
      toast(fetchResponse.message);

      setData(() => {
        return {
          name: '',
          category: '',
          image: '',
          price: '',
          description: '',
          season: '',
          size: [],
          gender: '',
          brand: '',
          availability: '',
          
        };
      });

  

    } else {
      toast('Enter required fields');
    }
  };

  return (
    <div>
      <p className='text-center text-2xl'>Add New Product</p>
      <form
        action=""
        className="m-auto w-full max-w-md  shadow flex flex-col p-3 bg-white"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="">
          Name
        </label>
        <input
          type="text"
          name="name"
          className="bg-slate-200 p-1 mb-3 my-1"
          onChange={handleOnChange}
          value={data.name}
        />
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id=""
          className="bg-slate-200 p-1  mb-3 my-1"
          onChange={handleOnChange}
          value={data.category}
        >
          <option value={''}>Select Category</option>
          <option value={'athletic shoes'}>Athletic Shoes</option>
          <option value={'casual shoes'}>Casual Shoes</option>
          <option value={'boots'}>Boots</option>
          <option value={'sandals'}>Sandals</option>
          <option value={'flats'}>Flats</option>
          <option value={'heels'}>Heels</option>
          <option value={'slides'}>Slides</option>
          <option value={'kids'}>Kids</option>
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
              value={data.price}
              className="bg-slate-200 p-1  mr-2 my-1  "
              onChange={handleOnChange}
            />

            <select
              name="gender"
              id=""
              className="bg-slate-200 p-1 my-1 "
              onChange={handleOnChange}
              value={data.gender}
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
              className="bg-slate-200 p-1 my-1 "
              onChange={handleOnChange}
              value={data.color}
            >
              <option value={''}>Select </option>
              <option value={'blue'}>Blue</option>
              <option value={'pink'}>Pink</option>
              <option value={'brown'}>Brown</option>
              <option value={'green'}>Green</option>
              <option value={'white'}>White</option>
              <option value={'black'}>Black</option>
              <option value={'purple'}>Purple</option>
              <option value={'yellow'}>yellow</option>
              <option value={'multi-coloured'}>Multi-coloured</option>
            </select>

            <select
              name="season"
              id=""
              className="bg-slate-200 p-1 my-1 "
              onChange={handleOnChange}
              value={data.season}
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
              className="bg-slate-200 p-1 my-1 "
              onChange={handleOnChange}
              value={data.brand}
            >
              <option value={''}>Select </option>
              <option value={'Nike'}>Nike</option>
              <option value={'Adidas'}>Adidas</option>
              <option value={'Puma'}>Puma</option>
              <option value={'Skechers'}>Skechers</option>
              <option value={'Jimmy Choo'}>Jimmy Choo</option>
              <option value={'Mr. Price'}>Mr Price</option>
              <option value={'Gucci'}>Gucci</option>
              <option value={'Louboutin'}>Louboutin</option>
              <option value={'Prada'}>Prada</option>
              <option value={'Fendi'}>Fendi</option>
              <option value={'Crocs'}>Crocs</option>
              <option value={'Birkenstock'}>Birkenstock</option>
              <option value={'other'}>Other</option>
            </select>
            <input
              type="number"
              name="availability"
              id=""
              value={data.availability}
              className="bg-slate-200 p-1  mr-2 my-1  "
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
            onChange={Multiselect}
          />
        </div>

        <label htmlFor="">Product Description</label>
        <textarea
          name="description"
          id=""
          rows="3"
          className="bg-slate-200 p-1 my-2 resize-none"
          onChange={handleOnChange}
          value={data.description}
        ></textarea>
        <button className="bg-red-500 hover-bg-red-600 text-white font-md my-2 ">
          Save
        </button>
      </form>
    </div>
  );
}

export default NewProduct;
