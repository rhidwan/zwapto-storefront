import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import LocationDropDown from "../LocationDropDown/LocationDropDown";
import { useRef } from "react";

const SearchField = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const searchHistory = ["I phone 12", "I phone 12 pro", "I phone 13"];

  const inputRef = useRef<HTMLInputElement>(null); // Use type assertion here
  const suggestionsRef = useRef<HTMLDivElement>(null); // Add a ref for the suggestion panel

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the clicked element is outside both the input field and suggestion panel
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value && !showSuggestions) {
      setShowSuggestions(true);
    } else if (!value) {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (term: string) => {
    setSearchTerm(term);
    setShowSuggestions(false);
  };
  return (
    <>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative" ref={inputRef}>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
          <MagnifyingGlassIcon
            className="h-7 w-7 p-1.5 text-activeColor rounded-full mr-1"
            aria-hidden="true"
          />
        </div>
        <input
          id="search"
          name="search"
          className="block w-full rounded-lg border border-gray-300 bg-gray-100 py-2 pl-3 pr-8 leading-5 placeholder-[#C0C0C0] focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-activeColor sm:text-sm"
          placeholder="Search"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onClick={() => setShowSuggestions(true)}
        />
        {showSuggestions && (
          // <OutsideClickHandler onOutsideClick={() => {
          //   setShowSuggestions(false);
          // }}>
          <div
            id="suggestions"
            className="bg-white p-3 border border-gray-300 absolute w-full mt-2 rounded-lg z-20"
            ref={suggestionsRef}
          >
            {filteredSuggestions.length > 0 ? (
              <>
                <div className="flex justify-between items-center">
                  <h6 className="text-secondColor font-lexed text-sm font-medium ">
                    Previous History
                  </h6>
                  <span
                    className="text-activeColor font-lexed text-xs italic "
                    onClick={() => {
                      // Handle the logic to clear history
                    }}
                  >
                    clear history
                  </span>
                </div>

                <div className="flex items-center gap-2 py-3.5">
                  <span className=" bg-gray-100 text-primaryColor text-sm py-2 px-3  rounded-2xl">
                    I phone{" "}
                  </span>
                  <span className=" bg-gray-100 text-primaryColor text-sm py-2 px-3  rounded-2xl">
                    dress
                  </span>
                </div>
                {filteredSuggestions.map((term, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick(term)}
                    className="text-primaryColor py-0.5 flex items-center justify-between px-1 pb-2 text-sm hover:text-secondColor cursor-pointer"
                  >
                    <span>{term}</span>{" "}
                    <span className="text-xs text-secondColor">+56 items</span>
                  </div>
                ))}
              </>
            ) : (
              <div className="p-3 text-sm text-primaryColor">No matched</div>
            )}
            {/* Render the "Previous History" section only if there are no filtered suggestions */}
            {filteredSuggestions.length === 0 && (
              <>
                <div className="flex justify-between items-center">
                  <h6 className="text-secondColor font-lexed text-sm font-medium ">
                    Previous History
                  </h6>
                  <span
                    className="text-activeColor font-lexed text-xs italic "
                    onClick={() => {
                      // Handle the logic to clear history
                    }}
                  >
                    clear history
                  </span>
                </div>

                <div className="flex items-center gap-2 py-3.5">
                  <span className=" bg-gray-100 text-primaryColor text-sm py-2 px-3  rounded-2xl">
                    I phone{" "}
                  </span>
                  <span className=" bg-gray-100 text-primaryColor text-sm py-2 px-3  rounded-2xl">
                    dress
                  </span>
                </div>

                <h6 className="text-secondColor font-lexed text-sm font-medium ">
                  Popular searches
                </h6>

                <div className="flex items-center gap-2 pt-3">
                  {searchHistory.map((term, index) => (
                    <span
                      key={index}
                      onClick={() => handleSuggestionClick(term)}
                      className=" bg-gray-100 text-primaryColor text-sm py-2 px-3 rounded-2xl cursor-pointer"
                    >
                      {term}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
          // </OutsideClickHandler>
        )}
      </div>
    </>
  );
};

export default SearchField;
