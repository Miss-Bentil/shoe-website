import React from 'react';

function Size({ availableSize }) {
  const sizes = ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46'];



  return (
    <div className="flex flex-wrap mt-1">
      {sizes.map((size) => (
        <div
          key={size}
          className={`border-2  w-10 h-10 rounded-full flex items-center justify-center text-sm text-center m-1 ${
            availableSize.includes(size)
              ? ' text-gray-600 border-black'
              : 'border-gray-500 bg-gray-400 text-gray-500 cursor-not-allowed opacity-50'
          }`}
        >
          {size}
        </div>
      ))}
    </div>
  );
}

export default Size;
