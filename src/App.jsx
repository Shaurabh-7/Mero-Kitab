import { useState, useEffect } from "react";
import BookCard from "./components/Bookcard";
import BookForm from "./components/BookForm";
import initialBooks from "./data/initialBooks";

const STORAGE_KEY = "mero-kitab-books-v3";

function App() {
  const [books, setBooks] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialBooks;
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Save to localStorage whenever books change
  useEffect(() => {
    if (books.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    }
  }, [books]);

  const handleAddBook = (newBook) => {
    setBooks((prev) => [newBook, ...prev]);
  };

  const handleDeleteBook = (id) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/30 text-gray-800 flex flex-col font-sans">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-indigo-100/50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-7 h-7 text-indigo-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
              />
            </svg>
            <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Mero Kitab
            </span>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-indigo-100 hover:shadow-lg transition-all flex items-center space-x-2 cursor-pointer"
          >
            <span>+ Add Book</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-12 lg:py-20 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full text-indigo-700 text-xs font-semibold">
            <span>✨</span>
            <span>100% Authentic Publications Only</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Read Genuine. <br />
            <span className="text-indigo-600">Grow Personally.</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-xl">
            Welcome to <span className="font-semibold text-gray-800">Mero Kitab</span>. 
            We verify and supply authentic books ranging from ancient mythology and deep philosophy to contemporary Nepali literature.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center space-x-2 bg-white px-4 py-2.5 rounded-xl shadow-sm border border-gray-100">
              <span className="text-green-500 font-bold">✓</span>
              <span className="text-sm font-medium text-gray-600">Original Covers</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2.5 rounded-xl shadow-sm border border-gray-100">
              <span className="text-green-500 font-bold">✓</span>
              <span className="text-sm font-medium text-gray-600">Nepali Classics</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2.5 rounded-xl shadow-sm border border-gray-100">
              <span className="text-green-500 font-bold">✓</span>
              <span className="text-sm font-medium text-gray-600">Verified Pricing</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-xl opacity-20 -z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80"
            alt="Stack of authentic books at Mero Kitab"
            className="w-full h-80 sm:h-96 object-cover rounded-3xl shadow-xl border border-white"
          />
        </div>
      </section>

      {/* Main Catalog & Search */}
      <main className="flex-grow max-w-6xl w-full mx-auto px-6 pb-20 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-indigo-50 pt-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Available Collection</h2>
            <p className="text-sm text-gray-500">Explore and search our handpicked library</p>
          </div>
          
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search by title, author or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pl-10 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm shadow-sm"
            />
            <span className="absolute left-3.5 top-3 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" />
              </svg>
            </span>
          </div>
        </div>

        {/* Catalog grid */}
        {filteredBooks.length === 0 ? (
          <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-2xl border border-dashed border-gray-200">
            <span className="text-4xl">📚</span>
            <p className="text-gray-500 font-medium mt-3">No books matched your search.</p>
            <p className="text-xs text-gray-400 mt-1">Try spelling differently or add a new book to the library.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} onDelete={handleDeleteBook} />
            ))}
          </div>
        )}
      </main>

      {/* Book Form Modal */}
      <BookForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onAddBook={handleAddBook}
      />

      {/* Footer */}
      <footer className="border-t border-indigo-50 bg-white/60 backdrop-blur px-6 py-6 text-center text-xs text-gray-500">
        <p>© 2026 Mero Kitab. All Rights Reserved. Supplying 100% authentic knowledge.</p>
      </footer>
    </div>
  );
}

export default App;