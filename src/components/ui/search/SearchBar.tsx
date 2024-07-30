// import React, { useState } from 'react';
// import { EventCategory, EventType } from '@prisma/client';

// interface SearchBarProps {
//   onSearch: (results: any[]) => void;
// }

// const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
//   const [searchType, setSearchType] = useState<'location' | 'category' | 'type' | 'title'>('location');
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const query: { [key: string]: string | EventCategory | EventType } = {};
//     switch (searchType) {
//       case 'location':
//         query.location = searchQuery;
//         break;
//       case 'category':
//         query.category = searchQuery as EventCategory;
//         break;
//       case 'type':
//         query.eventType = searchQuery as EventType;
//         break;
//       case 'title':
//         query.title = searchQuery;
//         break;
//     }
//     try {
//       const response = await fetch('/api/events/search', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           location: 'New York',
//           category: EventCategory.MUSIC,
//           eventType: EventType.PHYSICAL,
//           title: 'Concert',
//         }),
//       });
    
//       if (response.ok) {
//         const events = await response.json();
//         // Handle the successful response
//         console.log(events);
//       } else {
//         const error = await response.json();
//         // Handle the error response
//         console.error(error.error);
//       }
//     } catch (error) {
//       // Handle any network or other errors
//       console.error('Error:', error);
//     }
    

//   return (
//     <form onSubmit={handleSearch} className="w-[80vh] flex items-center space-x-4">
//       <div className="flex-1">
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
//           placeholder={`Search by ${searchType === 'location' ? 'location' : searchType === 'category' ? 'category' : searchType === 'type' ? 'type' : 'title'}...`}
//           className="px-4 py-2 w-full border border-gray-300 rounded-md"
//         />
//       </div>
//       <div>
//         <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-md">
//           Search
//         </button>
//       </div>
//     </form>
//   );
// };

// export default SearchBar;


import React, { useState } from 'react';
import { EventCategory, EventType } from '@prisma/client';

interface SearchBarProps {
  onSearch: (results: any[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchType, setSearchType] = useState<'location' | 'category' | 'type' | 'title'>('location');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query: { [key: string]: string | EventCategory | EventType } = {};
    switch (searchType) {
      case 'location':
        query.location = searchQuery;
        break;
      case 'category':
        query.category = searchQuery as EventCategory;
        break;
      case 'type':
        query.eventType = searchQuery as EventType;
        break;
      case 'title':
        query.title = searchQuery;
        break;
    }

    try {
      const response = await fetch('/events/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(query),
      });

      if (response.ok) {
        const events = await response.json();
        //onSearch(events);
      } else {
        const error = await response.json();
        console.error(error.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-[80vh] flex items-center space-x-4">
      <div className="flex-1">
        <input
          type="text"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          placeholder={`Search by ${searchType === 'location' ? 'location' : searchType === 'category' ? 'category' : searchType === 'type' ? 'type' : 'title'}...`}
          className="px-4 py-2 w-full border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-md">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;

