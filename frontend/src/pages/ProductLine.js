import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { BsTrash, BsFillPencilFill, BsThreeDotsVertical } from 'react-icons/bs';
import EditModal from './EditModal';
import { toast } from 'react-hot-toast';

function ProductLine({
  stock,
  name,
  brand,
  category,
  color,
  description,
  gender,
  image,
  price,
  season,
  size,
  id,
  availability,
}) {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setSelectedItem({
      stock,
      name,
      brand,
      category,
      color,
      description,
      gender,
      image,
      price,
      season,
      size,
      id,
      availability,
    });
    setShow(true);
  };

  const handleDelete = async (id) => {
    try {
      // Make an API call to delete the product
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/deleteProduct/${id}`,
        {
          method: 'DELETE',
        }
      );
      console.log(id);
      if (response.ok) {
        toast('Product deleted successfully');
      } else {
        const data = await response.json();
        toast(data.message);

      }
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };

  return (
    <>
      <tr className="  items center">
        <td className="w-16 h-20">
          <img src={image} alt="" className="w-full h-full object-fit" />
        </td>
        <td className="">{name}</td>
        <td className="">{brand}</td>
        <td className="">{category}</td>
        <td className="">{price}</td>
        <td className="">{gender}</td>
        <td className="">{season}</td>
        <td className="">
          <div className="relative p-2">
            <BsThreeDotsVertical onClick={handleToggleOptions} />
            {showOptions && (
              <div className="absolute top-7 right-0 bg-gray-100 p-2">
                <button className="mr-2">
                  <BsFillPencilFill onClick={handleShow} />
                </button>
                <button>
                  <BsTrash onClick={() => handleDelete(id)} />
                </button>
              </div>
            )}
          </div>
        </td>
      </tr>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Update Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditModal
            selectedItem={selectedItem}
            setShow={setShow}
            setSelectedItem={setSelectedItem}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProductLine;
