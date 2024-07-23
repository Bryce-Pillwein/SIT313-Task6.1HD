import IconGeneral from "../icons/IconGeneral";


interface ButtonFilterProps {
  clickFnc: () => void;
}

const ButtonFilter: React.FC<ButtonFilterProps> = ({ clickFnc }) => {

  return (
    <button onClick={clickFnc} className="flex items-center gap-2 px-2 py-1 rounded-lg">
      <IconGeneral type="filter" />
      <p>Filter</p>
    </button>
  );

}

export default ButtonFilter;