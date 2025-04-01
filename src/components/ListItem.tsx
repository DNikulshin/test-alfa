import { Link } from "react-router";
import { IProduct } from "../types/types";
import { useState } from "react";
import { useStore } from "../store/store";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

interface Props {
  product: IProduct;
}

export const ListItem = ({ product }: Props) => {
  const [isLike, setIsLike] = useState(product.like);

  const removeProductById = useStore((state) => state.removeProductById);
  const updateProduct = useStore((state) => state.updateProduct);

  const updateHandler = (product: IProduct) => {
    setIsLike((prevState) => !prevState);
    updateProduct({ ...product, like: !isLike });
  };

  return (
    <div className="flex justify-center items-center gap-4 w-full shadow-sm shadow-stone-600 px-4 pt-6 max-h-[250px] relative">
      <Link to={`/products/${product.id}`} className=" w-full">
        <div className="flex justify-between items-center px-6 py-4 gap-4">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <p>Title: {product.title}</p>
            <p>Category: {product.category}</p>
            <p>Price: {product.price}</p>
          </div>

          <img
            src={product.image}
            alt={product.category}
            width={100}
            height={100}
          />
        </div>
      </Link>
      <div>
        <button
          className="flex gap-2 items-center absolute top-2 left-2 bg-btn  px-3 py-1.5"
          onClick={() => updateHandler(product)}
        >
          {product.like ? (
            <FaHeart className="text-red-400" />
          ) : (
            <FaRegHeart className="text-red-400" />
          )}
        </button>
        <button
          className="bg-red-400 text-white absolute top-2 right-2 px-3 py-1.5"
          onClick={() => removeProductById(product.id)}
        >
          x
        </button>
      </div>
    </div>
  );
};
