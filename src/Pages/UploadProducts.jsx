import React from "react";
import { db } from "../firebase";
import { products } from "../assets/assets";
import { collection, doc, setDoc } from "firebase/firestore";

const UploadProducts = () => {

 const uploadProducts = async () => {
  console.log("Button Clicked");

  try {
    for (const product of products) {
      console.log("Uploading:", product._id);

      const updatedProduct = {
  ...product,
  image: product.image.map((img) =>
    img.replace("/src/assets/", "/products/")
  ),
};
      await setDoc(
        doc(db, "products", product._id),
         updatedProduct
      );

      console.log("Uploaded:", product._id);
    }

    alert("All products uploaded successfully!");
  } catch (error) {
    console.error("Firebase Error:", error);

    alert(error.message);
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        onClick={uploadProducts}
        className="bg-black text-white px-6 py-3 rounded cursor-pointer"
      >
        Upload Products
      </button>
    </div>
  );
};

export default UploadProducts;