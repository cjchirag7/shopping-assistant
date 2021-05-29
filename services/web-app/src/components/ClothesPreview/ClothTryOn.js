import React, { useCallback, useEffect, useState } from "react";
import serverUrl from "../../Constants/serverUrl";
import Content from "./Content";
import Sidebar from "./Sidebar";
import Navbar from "../Navbar";
import ClothTryOnUITour from "./UITour";
import SelectClothDialog from "./SelectClothDialog";
import ClothImages from "../../Constants/ClothImages"

const ClothTryOn = (props) => {
  const { classes, theme, pathname, productId } = props;
  const [open, setOpen] = useState(pathname === "/try/cloth/");
  const [isSelectClothDialogOpen, setSelectClothDialogOpen] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const matchedProduct = ClothImages.filter((product) => product.productId === productId);
    if(!matchedProduct.length)
      return;
    setSelectedProduct(matchedProduct[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(() => {
    console.log(pathname);
    setOpen(pathname === "/try/cloth");
  }, [pathname]);  

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, []);

  const [previewImg, setPreviewImg] = useState("");
  const [img, setImg] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImgChange = useCallback((img, pictures) => {
    let newState = {};
    if(!img.length) {
      setUserId(null);
    } else {
      const data = new FormData();
      data.append("image", img[0]);
      const newUserId=""+Math.floor(Math.random()*10000)+Number(new Date());
      fetch(`${serverUrl}upload_image/${newUserId}`, {
        method: "POST",
        body: data,
      })
      .then((res) => res.json())
      .then(({ image_url }) => {
        setUserId(newUserId);
      })
      .catch((err) => {
        console.log(err.message || err);
      });
    }
    newState.img = img;
    newState.pictures = pictures;
    setImg(newState);
  }, []);

  useEffect(() => {
    if (!img || !img.img || !img.img.length || !selectedProduct) {
      return;
    }
    setLoading(true);    
    if(!userId)
      return;
    fetch(`${serverUrl}virtual_try/${selectedProduct.productId}?user_id=${userId}`, {
        method: "GET"
     })
      .then((res) => res.json())
      .then(({ result_url }) => {
        setLoading(false);
        setPreviewImg(`${result_url}?${Date.now()}`);        
      })
      .catch((err) => {
        console.log(err.message || err);
      });    
  }, [img, selectedProduct, userId]);

  const [isTourOpen, setIsTourOpen] = useState(false);

  return (
    <>
      <Navbar
        classes={classes}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        theme={theme}
        openTour={() => setIsTourOpen(true)}
      />    
      <Sidebar
        classes={classes}
        open={open}
        handleDrawerClose={handleDrawerClose}
        theme={theme}
        img={img}
        handleImgChange={handleImgChange}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        isSelectClothDialogOpen={isSelectClothDialogOpen}
        setSelectClothDialogOpen={setSelectClothDialogOpen}        
      />
      <Content
        classes={classes}
        open={open}
        img={img}
        previewImg={previewImg}
        loading={loading}
        selectedProduct={selectedProduct}
      />
      <ClothTryOnUITour
        isOpen={isTourOpen}
        onRequestClose={() => setIsTourOpen(false)}
      />      
      <SelectClothDialog
        open={isSelectClothDialogOpen}
        setOpen={setSelectClothDialogOpen}
        setSelectedProduct={setSelectedProduct}
      />
    </>
  );
};

export default ClothTryOn;