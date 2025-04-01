import { Link } from "react-router";
import { ListItem } from "../components/ListItem";
import { useStore } from "../store/store";
import { useEffect, useState } from "react";
import { Pagination } from "../components/Pagination";

const ProductList: React.FC = () => {
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const products = useStore((state) => state.filteredProducts);
  const getProducts = useStore((state) => state.getProducts);
  const findByFeldsProducts = useStore((state) => state.findByFeldsProducts);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
    setCurrentPage(1);
  };

  const filteredProducts = products.filter((product) =>
    filter === "like" ? product.like : true
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const currentItems = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div className="flex flex-col container mx-auto h-screen gap-4 px-2 text-center break-worlds">
      <h1>Product List</h1>
      <div className="flex flex-wrap gap-2 items-center justify-center px-4">
        <Link to="/create-product" className="link text-lg">
          Create New Product
        </Link>
        <div className="flex gap-2">
          <strong> Count:</strong>(
          <span className="text-bold text-green-500">
            {currentItems.length}
          </span>
          )<strong> of Page:</strong>(
          <span className="text-bold text-green-500">{totalPages}</span>)
          <strong> Total:</strong>(
            <span className="text-bold text-green-500">{filteredProducts.length}</span>)
        </div>
      </div>
      <input
        type="search"
        className="shadow-sm shadow-stone-600 px-2 py-2"
        placeholder="Enter search text"
        onChange={(e) => findByFeldsProducts(e.target.value)}
      />
      <select
        value={filter}
        onChange={handleFilterChange}
        className="border rounded px-2 py-1 shadow-sm shadow-stone-600"
      >
        <option value="">All Products</option>
        <option value="like">like</option>
      </select>
      <div className="flex flex-col justify-between h-[80%]">
        {currentItems.length > 0 ? (
          <div className="flex flex-col justify-center items-center w-full gap-4 pb-8">
            {currentItems.map((product) => (
              <ListItem key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-red-500 text-center text-lg font-bold">
            No Products...
          </div>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProductList;
