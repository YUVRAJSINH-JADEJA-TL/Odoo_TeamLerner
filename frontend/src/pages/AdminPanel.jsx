export default function AdminPanel() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-red-600">Admin Panel</h2>
      <div className="mt-4 bg-white p-4 shadow rounded">
        <p>Moderate item listings here: approve or reject user submissions.</p>
        <ul className="mt-4 space-y-2">
          <li className="flex justify-between items-center border p-2 rounded">
            <span>Item Title 1</span>
            <div>
              <button className="bg-green-600 text-white px-3 py-1 rounded mr-2">Approve</button>
              <button className="bg-red-600 text-white px-3 py-1 rounded">Reject</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}