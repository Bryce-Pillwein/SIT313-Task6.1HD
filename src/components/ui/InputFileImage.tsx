// Input File Image tsx

import { useRef, useState } from "react";
import IconGeneral from "../icons/IconGeneral";

interface InputFileImageProps {
  handleImage: (file: File | null) => void;
}

const InputFileImage: React.FC<InputFileImageProps> = ({ handleImage }) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("ADDED", event.target.files?.[0].name);
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    handleImage(selectedFile);
  };

  const handleRemoveFile = () => {
    console.log("REMOVED");
    setFile(null);
    handleImage(null);

    // Reset the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <div className="bg-hsl-l90 dark:bg-hsl-l25 pointer-events-none w-full overflow-hidden  rounded-lg p-4">

        <div className="relative bg-hsl-l95 dark:bg-hsl-l30 border-hsl-l80 pointer-events-none border-2 border-dashed flex flex-col justify-center items-center p-4">
          {!file ? (
            <>
              <IconGeneral type='upload' size={30} />
              <label htmlFor="image" className='text-sub-10 pointer-events-none'>
                <strong>Choose an Image</strong> or drag it here.
              </label>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <p className="text-hsl-l50">Image Uploaded!</p>
              <p>{file.name}</p>
            </div>
          )}

          <input type="file" id="image" name="image"
            className='absolute opacity-0 cursor-pointer h-full w-full inset-0 pointer-events-auto '
            accept="image/png, image/jpeg, image/jpg, image/gif"
            onChange={handleFileChange} ref={fileInputRef} />
        </div>

      </div>
      {file && (
        <div className="flex justify-end">
          <button type="button" onClick={handleRemoveFile} className="flex justify-center items-center gap-2 mt-2 text-sm">
            Remove File
            <IconGeneral type="delete" size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

export default InputFileImage;