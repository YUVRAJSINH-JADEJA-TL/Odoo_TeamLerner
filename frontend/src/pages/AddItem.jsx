import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function AddItem() {
  const [form, setForm] = useState({ title: '', description: '', category: '', type: '', size: '', condition: '', tags: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Item listed successfully!');
  };

  return (
    <>
      <Navbar/>
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded-xl">
        <h2 className="text-xl font-bold text-green-700 mb-4">List a New Clothing Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" />
          <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="w-full p-2 border rounded" />
          <input name="type" value={form.type} onChange={handleChange} placeholder="Type" className="w-full p-2 border rounded" />
          <input name="size" value={form.size} onChange={handleChange} placeholder="Size" className="w-full p-2 border rounded" />
          <input name="condition" value={form.condition} onChange={handleChange} placeholder="Condition" className="w-full p-2 border rounded" />
          <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma-separated)" className="w-full p-2 border rounded" />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
        </form>
      </div>
    </>
  );
}