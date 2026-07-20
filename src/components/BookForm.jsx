import { useState } from "react";

function BookForm({ isOpen, onClose, onAddBook }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
    rating: "",
    cover: "",
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  // Event handling: controlled inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field as the user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Inline validation
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.author.trim()) newErrors.author = "Author is required";
    
    const parsedRating = parseFloat(formData.rating);
    if (formData.rating && (isNaN(parsedRating) || parsedRating < 0 || parsedRating > 5)) {
      newErrors.rating = "Rating must be between 0 and 5";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newBook = {
      id: Date.now(),
      title: formData.title.trim(),
      author: formData.author.trim(),
      category: formData.category.trim() || "Uncategorized",
      price: parseFloat(formData.price) || 0,
      rating: parseFloat(formData.rating) || 0,
      cover: formData.cover.trim() || "https://placehold.co/300x400?text=No+Cover",
    };

    onAddBook(newBook);

    // Reset form and errors
    setFormData({
      title: "",
      author: "",
      category: "",
      price: "",
      rating: "",
      cover: "",
    });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-indigo-600 text-white flex justify-between items-center">
          <h2 className="text-xl font-bold">Add a New Book</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-indigo-200 text-2xl font-semibold focus:outline-none transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Book Title <span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              placeholder="e.g. Ramayana"
              value={formData.title}
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all ${
                errors.title ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Author Name <span className="text-red-500">*</span>
            </label>
            <input
              name="author"
              placeholder="e.g. Valmiki"
              value={formData.author}
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all ${
                errors.author ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
            {errors.author && (
              <p className="text-xs text-red-500 mt-1">{errors.author}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Category
              </label>
              <input
                name="category"
                placeholder="e.g. Mythology"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Price (Rs. / $)
              </label>
              <input
                name="price"
                type="number"
                step="0.01"
                placeholder="e.g. 450"
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Rating (0-5)
              </label>
              <input
                name="rating"
                type="number"
                step="0.1"
                max="5"
                min="0"
                placeholder="4.5"
                value={formData.rating}
                onChange={handleChange}
                className={`w-full border rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all ${
                  errors.rating ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
              />
              {errors.rating && (
                <p className="text-xs text-red-500 mt-1">{errors.rating}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Cover Image URL
              </label>
              <input
                name="cover"
                placeholder="https://..."
                value={formData.cover}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md hover:shadow-lg"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookForm;