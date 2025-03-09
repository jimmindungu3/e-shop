import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();

  // State for required fields from the model
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: [],
    keywords: [],
    quantity: 1,
    images: [],
    sales: 0,
  });

  // State for dynamic custom fields
  const [customFields, setCustomFields] = useState([]);
  // State for new custom field input
  const [newCustomField, setNewCustomField] = useState({ name: "", value: "" });
  // State for new category/keyword input
  const [newCategory, setNewCategory] = useState("");
  const [newKeyword, setNewKeyword] = useState("");
  // State for image upload preview
  const [imagePreview, setImagePreview] = useState(null);

  // Handle required fields change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle number fields change with validation
  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    if (value === "" || (!isNaN(value) && value >= 0)) {
      setProduct({ ...product, [name]: value });
    }
  };

  // Add a new category
  const addCategory = () => {
    if (newCategory.trim() && !product.category.includes(newCategory.trim())) {
      setProduct({
        ...product,
        category: [...product.category, newCategory.trim()],
      });
      setNewCategory("");
    }
  };

  // Remove a category
  const removeCategory = (index) => {
    const updatedCategories = [...product.category];
    updatedCategories.splice(index, 1);
    setProduct({ ...product, category: updatedCategories });
  };

  // Add a new keyword
  const addKeyword = () => {
    if (newKeyword.trim() && !product.keywords.includes(newKeyword.trim())) {
      setProduct({
        ...product,
        keywords: [...product.keywords, newKeyword.trim()],
      });
      setNewKeyword("");
    }
  };

  // Remove a keyword
  const removeKeyword = (index) => {
    const updatedKeywords = [...product.keywords];
    updatedKeywords.splice(index, 1);
    setProduct({ ...product, keywords: updatedKeywords });
  };

  // Handle custom field name/value changes
  const handleCustomFieldChange = (e) => {
    const { name, value } = e.target;
    setNewCustomField({ ...newCustomField, [name]: value });
  };

  // Add new custom field
  const addCustomField = () => {
    if (newCustomField.name.trim() && newCustomField.value.trim()) {
      setCustomFields([...customFields, { ...newCustomField }]);
      setNewCustomField({ name: "", value: "" });
    }
  };

  // Remove custom field
  const removeCustomField = (index) => {
    const updatedFields = [...customFields];
    updatedFields.splice(index, 1);
    setCustomFields(updatedFields);
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real application, you would upload to a server
      // Here we're just creating a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add image to product
  const addImage = () => {
    if (imagePreview && !product.images.includes(imagePreview)) {
      setProduct({
        ...product,
        images: [...product.images, imagePreview],
      });
      setImagePreview(null);
    }
  };

  // Remove image
  const removeImage = (index) => {
    const updatedImages = [...product.images];
    updatedImages.splice(index, 1);
    setProduct({ ...product, images: updatedImages });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create final product object including custom fields
    const finalProduct = {
      ...product,
      // Convert price and quantity to numbers
      price: parseFloat(product.price),
      quantity: parseInt(product.quantity),
      // Add custom fields to the product
      ...customFields.reduce((acc, field) => {
        acc[field.name] = field.value;
        return acc;
      }, {}),
    };

    // Here you would send the data to your backend API
    console.log("Product to save:", finalProduct);

    // Redirect to products page or show success message
    // navigate("/products");
    alert("Product created successfully!");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Create New Product
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Images Section */}
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Product Images
                  </h2>

                  {/* Image Preview Grid */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
                    {product.images.map((img, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden border border-gray-200"
                      >
                        <img
                          src={img}
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-brandOrange hover:file:bg-orange-100"
                      />
                      <button
                        type="button"
                        onClick={addImage}
                        disabled={!imagePreview}
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          imagePreview
                            ? "bg-brandOrange text-white hover:bg-orange-600"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        Add Image
                      </button>
                    </div>

                    {/* Image Preview - SMALLER SIZE */}
                    {imagePreview && (
                      <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Required Numeric Fields */}
                <div className="border-b border-gray-200 pb-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Inventory & Pricing
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Price (Ksh) *
                      </label>
                      <input
                        type="text"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleNumberChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brandOrange focus:border-brandOrange"
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="quantity"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Quantity in Stock *
                      </label>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleNumberChange}
                        min="0"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brandOrange focus:border-brandOrange"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="sales"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Sales Count
                      </label>
                      <input
                        type="number"
                        id="sales"
                        name="sales"
                        value={product.sales}
                        onChange={handleNumberChange}
                        min="0"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brandOrange focus:border-brandOrange"
                      />
                    </div>
                  </div>
                </div>

                {/* Custom Fields Section */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Custom Product Attributes
                  </h2>

                  {/* Existing Custom Fields */}
                  {customFields.length > 0 && (
                    <div className="mb-4 space-y-3">
                      {customFields.map((field, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="flex-1 flex items-center bg-gray-50 rounded-lg px-3 py-2">
                            <span className="font-medium text-gray-600 mr-2">
                              {field.name}:
                            </span>
                            <span className="text-gray-800">{field.value}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeCustomField(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add New Custom Field */}
                  <div className="flex items-end gap-2 mb-2">
                    <div className="flex-1">
                      <label
                        htmlFor="fieldName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Field Name
                      </label>
                      <input
                        type="text"
                        id="fieldName"
                        name="name"
                        value={newCustomField.name}
                        onChange={handleCustomFieldChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brandOrange focus:border-brandOrange"
                        placeholder="e.g. Color, Size, Material..."
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor="fieldValue"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Field Value
                      </label>
                      <input
                        type="text"
                        id="fieldValue"
                        name="value"
                        value={newCustomField.value}
                        onChange={handleCustomFieldChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brandOrange focus:border-brandOrange"
                        placeholder="e.g. Red, XL, Cotton..."
                      />
                    </div>
                    <button
                      type="button"
                      onClick={addCustomField}
                      className="bg-brandOrange text-white px-3 py-2 rounded-lg hover:bg-orange-600"
                    >
                      Add Field
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 italic">
                    Add custom attributes specific to this product type (e.g.,
                    screen size, memory, material, color)
                  </p>
                </div>
              </div>

              {/* Product Details Section */}
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="border-b border-gray-200 pb-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Basic Information
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Product Title *
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={product.title}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brandOrange focus:border-brandOrange"
                        placeholder="Enter product title"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Product Description *
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                        rows="5"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brandOrange focus:border-brandOrange"
                        placeholder="Describe your product..."
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Categories Section */}
                <div className="border-b border-gray-200 pb-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Categories
                  </h2>

                  {/* Current Categories */}
                  <div className="mb-3 flex flex-wrap gap-2">
                    {product.category.map((cat, index) => (
                      <div
                        key={index}
                        className="bg-gray-100 text-gray-800 py-1 px-3 rounded-full text-sm flex items-center gap-1"
                      >
                        {cat}
                        <button
                          type="button"
                          onClick={() => removeCategory(index)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add New Category */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-brandOrange focus:border-brandOrange"
                      placeholder="Add a category"
                    />
                    <button
                      type="button"
                      onClick={addCategory}
                      className="bg-brandOrange text-white px-3 py-2 rounded-lg hover:bg-orange-600"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Keywords Section */}
                <div className="border-b border-gray-200 pb-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Keywords
                  </h2>

                  {/* Current Keywords */}
                  <div className="mb-3 flex flex-wrap gap-2">
                    {product.keywords.map((keyword, index) => (
                      <div
                        key={index}
                        className="bg-gray-100 text-gray-800 py-1 px-3 rounded-full text-sm flex items-center gap-1"
                      >
                        {keyword}
                        <button
                          type="button"
                          onClick={() => removeKeyword(index)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add New Keyword */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newKeyword}
                      onChange={(e) => setNewKeyword(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-brandOrange focus:border-brandOrange"
                      placeholder="Add a keyword"
                    />
                    <button
                      type="button"
                      onClick={addKeyword}
                      className="bg-brandOrange text-white px-3 py-2 rounded-lg hover:bg-orange-600"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Submit Section */}
                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-6 py-3 border border-gray-300 rounded-full text-gray-700 font-semibold hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-brandOrange text-white rounded-full font-semibold hover:bg-orange-600"
                  >
                    Save Product
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
