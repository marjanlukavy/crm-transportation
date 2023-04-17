import React from "react";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  StorageReference,
} from "firebase/storage";

const UploadImage = () => {
  const storageRef = getStorage();

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files[0];
    const imageRef: StorageReference = ref(storageRef, image.name);
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log("File available at", url);
      });
    });
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <input type="file" onChange={handleUpload} />
      <button>Upload Image</button>
    </div>
  );
};

export default UploadImage;
