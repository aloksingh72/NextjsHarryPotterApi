import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import Modal from "./Modal";

// Define the interface for the book data
interface BookData {
  id: string;
  title: string;
  cover: string;
  // Add other fields if there are more in the API response
}

// Define the interface for the error
interface ApiError {
  message: string;
}

const Book: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<BookData[]>([]);
  const [error, setError] = useState<ApiError | null>(null);
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // Selected book for the modal
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get<BookData[]>(
          "https://potterhead-api.vercel.app/api/books"
        );
        setData(response.data);
        setLoading(false);
      } catch (err: any) {
        setError({ message: err.message });
        setLoading(false);
      }
    };
    getData();
  }, []);

  // Function to open the modal with the selected book's data
  const handleOpenModal = (book: BookData) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  // Function to close the modal and clear the selected book
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <Link to="/">
        <h1 className="text-2xl mb-4">Data from Book API</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {data.map((item, index) => (
            <div
              key={item.id || index} // Unique key using id or index
              className="hover:scale-105 transition-all duration-200 px-2 max-w-[400px] mb-4"
              onClick={() => handleOpenModal(item)}
            >
              <div className=" rounded-lg overflow-hidden w-[300px] shadow-md shadow-slate-700">
                <img
                  src={item.cover}
                  alt="coverimage"
                  className="w-full h-auto"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Link>
      {/* Conditionally render the Modal component if a book is selected */}
      {/* //{selectedBook && (
        // <Modal
        //   isOpen={isModalOpen}
        //   onClose={handleCloseModal}
        //   book={selectedBook}
        // />
      )} */}
    </div>
  );
};

export default Book;
