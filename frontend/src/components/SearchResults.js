import React from 'react';
import HomeCard from '../components/HomeCard';

function SearchResults({ searchResults }) {
  return (
    <div className="mt-5 px-3">
      <div className="sub-heading text-2xl">Search Results</div>
      <div className="flex gap-2 overflow-scroll scrollbar-none scroll-smooth px-1">
        {searchResults.map((item) => (
          <HomeCard
            key={item._id}
            name={item.name}
            image={item.image}
            color={item.color}
            price={item.price}
            id={item._id}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
