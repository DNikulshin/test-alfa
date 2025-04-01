import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { IProduct } from "../types/types";
import { useStore } from "../store/store";

const ProductForm: React.FC = () => {
  const products = useStore((state) => state.products);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(
    `http://dummyimage.com/200x200/000/fff&text=Product+${products.length + 1}`
  );

  const createProduct = useStore((state) => state.createProduct);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !category || !price || !image) {
      setError("All fields must be filled!");
      return;
    }
    const newProduct: IProduct = {
      id: products.length + 1,
      title,
      price,
      description,
      category,
      image,
      like: false,
    };

    createProduct(newProduct);
    setError(null);

    navigate("/");
  };

  return (
    <div className="text-center container mx-auto flex flex-col gap-4">
      <div className="flex flex-col">
        <h1>Create Product</h1>
        <Link to="/products" className="link text-lg">
          Back to List
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col px-4 py-4 shadow  shadow-stone-600 gap-4"
      >
        {error && <div className="text-red-500 text-center">{error}</div>}
        <input
          type="text"
          className="shadow shadow-stone-600 px-2 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          type="number"
          className="shadow shadow-stone-600 px-2 py-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />
        <textarea
          className="shadow shadow-stone-600 px-2 py-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          type="text"
          className="shadow shadow-stone-600 px-2 py-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />
        <input
          type="text"
          className="shadow shadow-stone-600 px-2 py-2"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
        />
        <button
          className="shadow shadow-stone-600 px-2 py-2 self-end bg-green-400"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
