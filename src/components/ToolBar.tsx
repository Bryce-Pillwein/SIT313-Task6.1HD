// Tool Bar tsx


import { useState } from "react";
import IconGeneral from "./icons/IconGeneral";
import ButtonFilter from "./ui/ButtonFilter";

interface ToolBarProps {
  onSearch: (searchTerm: string, searchType: string) => void;
}

const ToolBar: React.FC<ToolBarProps> = ({ onSearch }) => {
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
    <div className="w-full bg-hsl-l98 dark:bg-hsl-l13 py-4 px-4 mb-4 rounded-lg">
      <div className="flex items-center justify-end gap-4">
        <input type="text" placeholder="Search"
          className="inputField"
          value={searchTerm} onChange={handleSearchChange} />
        <ButtonFilter clickFnc={() => { setIsFilterVisible(!isFilterVisible) }} />
      </div>

      {isFilterVisible && (
        <div className="flex justify-end items-center gap-2 mt-4">
          <label className="flex items-center text-sm">
            <input type="radio" name="option" value="Title"
              checked={selectedOption === 'Title'} onChange={handleOptionChange} />
            Title
          </label>

          <label className="flex items-center text-sm">
            <input type="radio" name="option" value="Description"
              checked={selectedOption === 'Description'} onChange={handleOptionChange} />
            Description
          </label>

          <label className="flex items-center text-sm">
            <input type="radio" name="option" value="Tag"
              checked={selectedOption === 'Tag'} onChange={handleOptionChange} />
            Tag
          </label>

          <label className="flex items-center text-sm">
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