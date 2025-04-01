import { Link, useParams } from "react-router";
import { useStore } from "../store/store";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductDetail: React.FC = () => {
  const products = useStore((state) => state.products);

  const { id } = useParams<{ id: string }>();

  const product = products.find((p) => p.id === Number(id));

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4 text-center break-worlds px-4 py-4">
      <Link to="/" className="link text-lg">
        Back to Lisk
      </Link>
      {product ? (
        <>
          <h1>{product.title}</h1>
          <img
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
          />

          <p>Price: {product.price}</p>
          <p>Description: {product.description}</p>
          <p>Category: {product.category}</p>
          <p className="flex gap-2 items-center">
            Liked:{" "}
            {product.like ? (
              <FaHeart className="text-red-400 " />
            ) : (
              <FaRegHeart className="text-red-400" />
            )}
          </p>
        </>
      ) : (
        <h3 className="text-red-500 font-bold text-2xl">Product not found</h3>
      )}
    </div>
  );
};

export default ProductDetail;
