import { storage } from "@/src/lib/firebase/firebaseConfig";
import { Button } from "@mui/material";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { useState } from "react";

const UploadImageToStorage = () => {
  const [imageFile, setImageFile] = useState<File>();
  const [downloadURL, setDownloadURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [progressUpload, setProgressUpload] = useState(0);

  const handleSelectedFile = (files: any) => {
    if (files && files[0].size < 10000000) {
      setImageFile(files[0]);

      console.log(files[0]);
    } else {
    }
  };

  const handleUploadFile = () => {
    if (imageFile) {
      const name = imageFile.name;
      const storageRef = ref(storage, `image/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setProgressUpload(progress); // to show progress upload

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        error => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(url => {
            console.log(url);
            //url is download url of file
            setDownloadURL(url);
          });
        }
      );
    } else {
      console.log("loi");
    }
  };

  const handleRemoveFile = () => setImageFile(undefined);

  return (
    <div className="container mt-5">
      <div className="col-lg-8 offset-lg-2">
        <input
          type="file"
          placeholder="Select file to upload"
          //   accept="image"
          onChange={files => handleSelectedFile(files.target.files)}
        />

        <div className="mt-5">
          <Button onClick={handleUploadFile}>Upload</Button>
        </div>
      </div>
    </div>
  );
};

export default UploadImageToStorage;
