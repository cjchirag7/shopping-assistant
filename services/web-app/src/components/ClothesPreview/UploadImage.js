import React from "react";
import ImageUploader from "react-images-upload";

const UploadImage = ({ classes, img, handleImgChange }) => {
  const noOfImg = img?.img?.length;
  return (
    <div className={classes.spacingUploadButton} id="step1">
      <ImageUploader
        singleImage
        withIcon={true}
        buttonText={
          noOfImg > 0 ? `${noOfImg} image selected` : "Choose image"
        }
        withPreview={true}
        onChange={(files, pictures) => handleImgChange(files, pictures)}
        imgExtension={[".jpg", ".jpeg", ".png"]}
        maxFileSize={5242880 * 20}
        label="Upload your image here"
      />
    </div>
  );
};

export default UploadImage;