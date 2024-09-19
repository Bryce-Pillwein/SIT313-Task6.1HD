// Tool Bar tsx

import { useState } from "react";
// Components
import IconGeneral from "./icons/IconGeneral";

interface ToolBarProps {
  isGridView: boolean;
  onSearch: (searchTerm: string, searchType: string) => void;
  toggleView: () => void;
  unhide: () => void;
  onSearchEnter?: (searchTerm: string, searchType: string) => void;
}

const ToolBar: React.FC<ToolBarProps> = ({ isGridView, onSearch, toggleView, unhide, onSearchEnter }) => {
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('Title');
  const [searchTerm, setSearchTerm] = useState<string>('');

  /**
   * Handle Search Option Change
   * @param e Change Event
   */
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
    onSearch(searchTerm, e.target.value);
  };

  /**
   * Handle Search Input Change
   * @param e Change Event
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value, selectedOption);
  };

  /**
   * Handle Search Enter
   */
  const handleSearchEnter = () => {
    onSearchEnter ? onSearchEnter(searchTerm, selectedOption) : null;
  };

  /**
   * Handle Key Down
   * @param e 
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchEnter();
    }
  };

  return (
    <div className="w-full bg-hsl-l98 dark:bg-hsl-l13 mt-4 mb-4 rounded-lg">
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="flex items-center flex-grow gap-4 px-4 py-2 rounded-lg bg-hsl-l100 dark:bg-hsl-l15 border border-solid border-hsl-l95 dark:border-hsl-l25 focus-within:border-mb-pink dark:focus-within:border-mb-yellow">
          <IconGeneral type="search" />
          <input type="text" placeholder="Search" id="search" name="search" autoComplete="off"
            className="outline-none border-none  dark:bg-hsl-l15 placeholder:text-hsl-l50 w-full"
            value={searchTerm} onChange={handleSearchChange} onKeyDown={(e) => handleKeyDown(e)} />
        </div>

        {onSearchEnter && (
          <button type="button" onClick={handleSearchEnter}
            className="font-medium px-3 py-1 rounded-lg text-white 
            bg-mb-pink hover:bg-mb-pink-active dark:bg-mb-yellow dark:hover:bg-mb-yellow-active">Enter</button>
        )}

        <button type="button" onClick={() => { setIsFilterVisible(!isFilterVisible) }} title="Filter Post"
          className="flex items-center gap-2 px-2 py-1 rounded-lg bg-hsl-l95 hover:bg-hsl-l90 dark:bg-hsl-l15 dark:hover:bg-hsl-l20">
          <IconGeneral type="filter" />
          <p className="text-sm font-medium">Filter</p>
        </button>

        <button type="button" onClick={toggleView} title="Toggle View"
          className="hidden md:flex items-center gap-2 px-2 py-1 rounded-lg bg-hsl-l95 hover:bg-hsl-l90 dark:bg-hsl-l15 dark:hover:bg-hsl-l20">
          {isGridView ? (<IconGeneral type="list-view" />) : (<IconGeneral type="grid-view" />)}
        </button>

        <button type="button" onClick={unhide} title="Unhide Post"
          className="flex items-center gap-2 px-2 py-1 rounded-lg bg-hsl-l95 hover:bg-hsl-l90 dark:bg-hsl-l15 dark:hover:bg-hsl-l20">
          <IconGeneral type="visibility-off" />
        </button>
      </div>

      {isFilterVisible && (
        <div className="flex justify-end items-center gap-4 mt-2">
          <label className="flex items-center text-sm text-hsl-l50 gap-1">
            <input type="radio" name="option" value="Title"
              checked={selectedOption === 'Title'} onChange={handleOptionChange} />
            Title
          </label>

          <label className="flex items-center text-sm text-hsl-l50 gap-1">
            <input type="radio" name="option" value="Author"
              checked={selectedOption === 'Author'} onChange={handleOptionChange} />
            Author
          </label>

          <label className="flex items-center text-sm text-hsl-l50 gap-1">
            <input type="radio" name="option" value="Tag"
              checked={selectedOption === 'Tag'} onChange={handleOptionChange} />
            Tag
          </label>

          <label className="flex items-center text-sm text-hsl-l50 gap-1">
            <input type="radio" name="option" value="Date"
              checked={selectedOption === 'Date'} onChange={handleOptionChange} />
            Date
          </label>
        </div>
      )}
    </div>
  );
};

export default ToolBar;