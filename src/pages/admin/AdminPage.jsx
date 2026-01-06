import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2 } from "lucide-react";

const AdminPage = () => {
  const [fruits, setFruits] = useState([]);
  const [editingFruit, setEditingFruit] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    original_price: "",
    image: "",
    rating: "4.5",
    reviews: "0",
    category: "tropical",
    description: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      navigate("/admin-login");
      return;
    }
    loadFruits();
  }, [navigate]);

  const loadFruits = async () => {
    const res = await fetch("http://localhost:3000/api/fruits");
    const data = await res.json();
    setFruits(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      original_price: formData.original_price
        ? parseFloat(formData.original_price)
        : null,
      rating: parseFloat(formData.rating),
      reviews: parseInt(formData.reviews),
    };

    try {
      if (editingFruit) {
        await fetch(`http://localhost:3000/api/fruits/${editingFruit.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch("http://localhost:3000/api/fruits", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      loadFruits();
      setEditingFruit(null);
      setFormData({
        name: "",
        price: "",
        original_price: "",
        image: "",
        rating: "4.5",
        reviews: "0",
        category: "tropical",
        description: "",
      });
    } catch (err) {
      alert(`Failed to save fruit ${err}`);
      console.error(err);
    }
  };

  const handleEdit = (fruit) => {
    setEditingFruit(fruit);
    setFormData({
      name: fruit.name,
      price: fruit.price.toString(),
      original_price: fruit.original_price
        ? fruit.original_price.toString()
        : "",
      image: fruit.image,
      rating: fruit.rating.toString(),
      reviews: fruit.reviews.toString(),
      category: fruit.category,
      description: fruit.description,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this fruit?")) {
      await fetch(`http://localhost:3000/api/fruits/${id}`, {
        method: "DELETE",
      });
      loadFruits();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-800">Admin Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem("isAdmin");
            navigate("/");
          }}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">
          {editingFruit ? "Edit Fruit" : "Add New Fruit"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <input
            name="price"
            placeholder="Price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <input
            name="original_price"
            placeholder="Original Price (optional)"
            type="number"
            step="0.01"
            value={formData.original_price}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <input
            name="rating"
            placeholder="Rating"
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={formData.rating}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <input
            name="reviews"
            placeholder="Reviews"
            type="number"
            value={formData.reviews}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <input
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <div className="md:col-span-2">
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
              rows="3"
            ></textarea>
          </div>
          <div className="md:col-span-2 flex space-x-2">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center"
            >
              <Plus className="w-4 h-4 mr-1" />{" "}
              {editingFruit ? "Update" : "Add"} Fruit
            </button>
            {editingFruit && (
              <button
                type="button"
                onClick={() => {
                  setEditingFruit(null);
                  setFormData({
                    name: "",
                    price: "",
                    original_price: "",
                    image: "",
                    rating: "4.5",
                    reviews: "0",
                    category: "tropical",
                    description: "",
                  });
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Daftar Buah */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {fruits.map((fruit) => (
              <tr key={fruit.id}>
                <td className="px-6 py-4 whitespace-nowrap">{fruit.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">${fruit.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {fruit.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => handleEdit(fruit)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(fruit.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
