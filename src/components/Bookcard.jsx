function BookCard({ book, onDelete }) {
  // Conditional rendering: build a star string based on rating
  const renderStars = (rating) => {
    const fullStars = Math.round(rating);
    return "★".repeat(fullStars) + "☆".repeat(5 - fullStars);
  };

  const isNepali = book.category.toLowerCase().includes("nepali");
  const displayPrice = isNepali
    ? `Rs. ${Math.round(book.price * 130)}`
    : `$${book.price.toFixed(2)}`;

  return (
    <div className="group relative bg-white/80 backdrop-blur-md rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
      {/* Cover Image Container */}
      <div className="relative h-60 w-full overflow-hidden bg-gray-100">
        <img
          src={book.cover}
          alt={`${book.title} cover`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "https://placehold.co/300x400?text=No+Cover";
          }}
        />
        {/* Category Tag overlayed */}
        <span className="absolute top-3 left-3 text-xs font-semibold bg-indigo-600/90 text-white backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
          {book.category}
        </span>
      </div>

      {/* Content Details */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-md font-bold text-gray-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {book.title}
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">by {book.author}</p>

        {/* Rating & Stars */}
        <div className="mt-3 flex items-center space-x-1.5">
          <span className="text-amber-500 text-sm tracking-widest">{renderStars(book.rating)}</span>
          <span className="text-xs font-bold text-gray-600">({book.rating})</span>
        </div>

        {/* Bottom Section: Price & Action */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
          <span className="text-lg font-extrabold text-gray-900">{displayPrice}</span>
          <button
            onClick={() => onDelete(book.id)}
            className="text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1"
          >
            <span>Remove</span>
          </button>
        </div>

        {/* Conditional warning badge for lower rated books */}
        {book.rating < 4.6 && (
          <div className="mt-2 bg-amber-50 text-[10px] text-amber-700 px-2 py-0.5 rounded w-fit font-medium">
            Highly Reviewed Choice
          </div>
        )}
      </div>
    </div>
  );
}

export default BookCard;