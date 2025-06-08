import React, { useRef, useState } from 'react';
import { UploadCloud } from 'lucide-react';

const ImageInput = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <div 
        onClick={handleUploadClick}
        className={`border-2 border-dashed ${
          uploadedFile ? 'border-[#1e40af] bg-[#0f1419]' : 'border-[#2a2a2a] bg-[#0f0f0f]'
        } rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-[#1e40af] hover:bg-[#141414]`}
      >
        {uploadedFile ? (
          <>
            <div className="text-[#3b82f6] text-2xl mb-2">✅</div>
            <div className="text-[#3b82f6]">
              Uploaded: {uploadedFile.name}
            </div>
          </>
        ) : (
          <>
            <UploadCloud className="w-8 h-8 mx-auto mb-3 text-[#666666]" />
            <div className="text-[#a0a0a0] text-sm">
              Click to upload an image
              <br />
              <span className="text-xs text-[#666666]">
                We accept JPEG, PNG formats up to 20MB and 4096 x 4096 pixels.
              </span>
            </div>
          </>
        )}
      </div>
      <input 
        type="file" 
        ref={fileInputRef}
        className="hidden" 
        accept="image/*"
        onChange={handleFileChange}
      />
      <p className="text-xs text-[#666666] mt-2">
        💡 Tip: Upload clear clothing images for best results
      </p>
    </div>
  );
};

export default ImageInput;