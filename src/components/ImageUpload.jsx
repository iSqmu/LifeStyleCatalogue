import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
function ImageUpload({ onUpload, editing }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError('');
    const formData = new FormData();
    formData.append('file', file);
    formData.append(
      'upload_preset',
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await res.json();
      onUpload(data.secure_url);
      console.log('SUbida exitosa:', data.secure_url);
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  }
  return (
    <>
      <div className="container relative bg-secondary/80 w-60 h-30 flex justify-center items-center rounded-lg mt-5 overflow-hidden hover:scale-105 transition-all duration-300 ease-in-out">
        <label
          htmlFor="file"
          className="absolute z-2 px-5 text-primary font-bold text-center cursor-pointer"
        >
          {uploading ? 'Subiendo...' : 'Arrastra o haz clic'}
        </label>
        <FontAwesomeIcon
          className="text-6xl text-accent/90 absolute z-1 opacity-60 cursor-pointer"
          icon={faUpload}
        />
        <input
          type="file"
          name="file"
          className="h-full w-full cursor-pointer opacity-0 z-3"
          onChange={handleUpload}
          disabled={uploading}
          required={editing ? false : true}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </>
  );
}

export default ImageUpload;
