import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateFormData } from "../../Redux/productSlice";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StarRating from "../Star Rating/StarRating";


const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  category: yup
    .string()
    .required("Category is required")
    .test(
      "isValidCategory",
      "Invalid category",
      (value) =>
        value === "men's clothing" ||
        value === "women's clothing" ||
        value === "jewelery"
    ),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  rating: yup
    .number()
    .required("Rating is required")
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5"),
  image: yup.mixed().required("Image is required"),
});

const EditProduct = ({ product, onClose }) => {
  const dispatch = useDispatch();
  const [imageChanged, setImageChanged] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      rating: product.rating,
      image: product.image,
    },
  });

  const onSubmit = (data) => {
    const updatedData = {
      ...data,
      ...(imageChanged && { image: data.image[0] }),
      new_price: data.price,
      old_price: data.price * 2,
    };

    dispatch(updateFormData({ id: product.id, updatedData }));
    toast.success("Product Updated Successfully");
    onClose();
  };

  const handleImageChange = (e) => {
    setImageChanged(true);
    setValue("image", e.target.files[0]);
  };

  return (
    <div className="form-container">
      <div className="text-container">
        <h2>Edit Product</h2>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" {...register("name")} />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" {...register("description")} />
          {errors.description && <p className="error">{errors.description.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" {...register("category")}>
            <option value="">Select a category</option>
            <option value="men's clothing">men's Clothing</option>
            <option value="women's clothing">women's Clothing</option>
            <option value="jewelery">jewelery</option>
          </select>
          {errors.category && <p className="error">{errors.category.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input type="number" id="price" {...register("price")} />
          {errors.price && <p className="error">{errors.price.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <Controller
            control={control}
            name="rating"
            render={({ field }) => (
              <StarRating
                rating={field.value}
                onRatingChange={field.onChange}
              />
            )}
          />
          {errors.rating && <p className="error">{errors.rating.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            {...register("image")}
            onChange={handleImageChange}
          />
          {errors.image && <p className="error">{errors.image.message}</p>}
        </div>
        <button type="submit">Update</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditProduct;
