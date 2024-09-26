// Input File Video tsx
import { useRef, useState } from "react";
import IconGeneral from "../icons/IconGeneral";
import VideoFile from "@/types/VideoFile";
import { useNotification } from "../providers/NotificationProvider";

interface InputFileVideoProps {
  handleVideoChange: (file: File | null) => void;
}

const InputFileVideo: React.FC<InputFileVideoProps> = ({ handleVideoChange }) => {
  const { addNotification } = useNotification();
  const [file, setFile] = useState<VideoFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /**
   * Handle File Change
   * @param event 
   */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;

    if (selectedFile && selectedFile.type.startsWith('video/')) {
      setFile({ file: selectedFile, previewURL: URL.createObjectURL(selectedFile) });
      handleVideoChange(selectedFile);
    } else {
      handleRemoveFile();
      addNotification('Select a valid video file');
    }
  };

  /**
   * Handle File Remove
   */
  const handleRemoveFile = () => {
    setFile(null);
    handleVideoChange(null);

    // Reset the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      {!file ? (
        < div className="bg-hsl-l95 dark:bg-hsl-l25 w-full h-full overflow-hidden rounded-lg p-4">
          <div className="h-full relative bg-hsl-l100 dark:bg-hsl-l30 border-hsl-l80 border-2 border-dashed flex flex-col justify-center items-center p-4">
            <>
              <IconGeneral type='upload' size={30} />
              <label htmlFor="video" className='text-sub-10'>
                <strong>Choose a Video</strong> or drag it here.
              </label>
            </>

            <input ref={fileInputRef} type="file" id="video" name="video"
              className='absolute opacity-0 cursor-pointer h-full w-full inset-0'
              accept="video/mp4, video/x-m4v, video/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-center items-center my-4">
            <video src={file.previewURL} controls width="500"></video>
          </div>

          <div className="flex justify-end">
            <button type="button" onClick={handleRemoveFile} className="flex justify-center items-center gap-2 text-sm">
              Remove File
              <IconGeneral type="delete" size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InputFileVideo;
