interface Props {
  currentPage: number;
  totalPages: number;
  handlePageChange: (index: number) => void;
}
export const Pagination = ({
  currentPage,
  totalPages,
  handlePageChange,
}: Props) => {
  return (
    <div className="flex justify-center space-x-2 pb-8">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          className={`bg-btn px-3 py-1.5 ${
            currentPage === index + 1 ? " text-red-500" : " text-black"
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};
