import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function Search({ handleSearch,searchTerm,setSearchTerm }) {
  

  const handleInputChange = (event) => {
     const inputValue = event.target.value;
     handleSearch(inputValue);
     setSearchTerm(inputValue);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch(searchTerm);
    }
  };


  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        className="py-1 px-2  w-80 rounded-full border focus:outline-gray-200 search"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
}

export default Search;
