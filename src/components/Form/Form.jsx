import React, { useState, useRef } from "react";
import * as yup from "yup";
import "./Form.css";
import { useDispatch } from "react-redux";
import { addFormData } from "../../Redux/productSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be a positive number")
    .transform((value) => (isNaN(value) ? undefined : value))
    .test(
      "noNegativePrice",
      "Price cannot be negative",
      (value) => value === undefined || value >= 0
    ),
  rating: yup
    .number()
    .required("Rating is required")
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5"),
  image: yup.mixed().required("Image is required"),
});

const Form = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const onSubmit = (data) => {
    const newProductData = {
      ...data,
      new_price: data.price,
      old_price: data.price * 2,
    };

    dispatch(addFormData(newProductData));
    reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.success("Product Added Successfully");
    setShowForm(false);
  };




  return (
    <>
      {!showForm ? (
        <div className="button-container">
          <button onClick={toggleForm}>Add Product</button>
        </div>
      ) : (
        <div className="form-container">
          <div className="text-container">
            <h2>Add Product</h2>
            <button className="btncross" onClick={() => setShowForm(false)}>
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
              {errors.description && (
                <p className="error">{errors.description.message}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select id="category" {...register("category")}>
                <option value="">Select a category</option>
                <option value="men's clothing">Men's Clothing</option>
                <option value="women's clothing">Women's Clothing</option>
                <option value="jewelery">Jewelery</option>
              </select>
              {errors.category && (
                <p className="error">{errors.category.message}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input type="number" id="price" {...register("price")} />
              {errors.price && <p className="error">{errors.price.message}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="rating">Rating</label>
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <StarRating
                    rating={field.value}
                    onRatingChange={field.onChange}
                  />
                )}
              />
              {errors.rating && (
                <p className="error">{errors.rating.message}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                id="image"
                {...register("image")}
                ref={fileInputRef}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setValue("image", reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              {errors.image && <p className="error">{errors.image.message}</p>}
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Form;
