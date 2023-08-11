import React, { useEffect, useState } from 'react';
import { GoSearch } from 'react-icons/go';

function HomeSearch({ handleSearch, searchTerm, setSearchTerm }) {
  const [scrollingUp, setScrollingUp] = useState(false);

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



  return (
    <div className="relative">
      <div className="search_box flex pt-0 ">
        <GoSearch />
        <input
          type="text"
          placeholder="Search"
          className={`py-2 px-2 rounded-full border focus:outline-gray-200 home_search ${
            scrollingUp ? 'narrowInput' : ''
          }`}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
      </div>
    </div>
  );
}

export default HomeSearch;
