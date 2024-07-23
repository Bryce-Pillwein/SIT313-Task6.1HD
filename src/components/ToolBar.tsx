// Tool Bar tsx

import { useState } from "react";
// Components
import IconGeneral from "./icons/IconGeneral";

interface ToolBarProps {
  onSearch: (searchTerm: string, searchType: string) => void;
  unhide: () => void
}

const ToolBar: React.FC<ToolBarProps> = ({ onSearch, unhide }) => {
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

  return (
    <div className="w-full bg-hsl-l98 dark:bg-hsl-l13 mb-4 rounded-lg">
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="flex items-center flex-grow gap-4 px-4 py-2 rounded-lg bg-hsl-l100 dark:bg-hsl-l15">
          <IconGeneral type="search" />
          <input type="text" placeholder="Search"
            className="outline-none border-none dark:bg-hsl-l15 placeholder:text-hsl-l50 w-full"
            value={searchTerm} onChange={handleSearchChange} />
        </div>

        <button onClick={() => { setIsFilterVisible(!isFilterVisible) }} title="Filter Post"
          className="flex items-center gap-2 px-2 py-1 rounded-lg bg-hsl-l95 hover:bg-hsl-l90 dark:bg-hsl-l15 dark:hover:bg-hsl-l20">
          <IconGeneral type="filter" />
          <p className="text-sm font-medium">Filter</p>
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
            <input type="radio" name="option" value="Text"
              checked={selectedOption === 'Text'} onChange={handleOptionChange} />
            Text
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