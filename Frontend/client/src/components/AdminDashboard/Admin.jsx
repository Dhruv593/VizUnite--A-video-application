import React from 'react'

function Admin() {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">Welcome Back, React Patterns</h1>
        <p>Seamless Video Management, Elevated Results.</p>
      </header>
      <div className="flex justify-around mb-8">
        <div className="bg-gray-800 p-4 rounded text-center">
          <p>Total views</p>
          <h2 className="text-2xl font-bold">221,234</h2>
        </div>
        <div className="bg-gray-800 p-4 rounded text-center">
          <p>Total subscribers</p>
          <h2 className="text-2xl font-bold">4,053</h2>
        </div>
        <div className="bg-gray-800 p-4 rounded text-center">
          <p>Total likes</p>
          <h2 className="text-2xl font-bold">63,021</h2>
        </div>
      </div>
      <div className="text-right mb-4">
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
          Upload video
        </button>
      </div>
      <table className="min-w-full bg-gray-800 rounded">
        <thead>
          <tr className="text-left">
            <th className="py-2 px-4 border-b border-gray-700">Status</th>
            <th className="py-2 px-4 border-b border-gray-700">Status</th>
            <th className="py-2 px-4 border-b border-gray-700">Uploaded</th>
            <th className="py-2 px-4 border-b border-gray-700">Rating</th>
            <th className="py-2 px-4 border-b border-gray-700">Date uploaded</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b border-gray-700">
              <input type="checkbox" checked className="form-checkbox h-5 w-5 text-purple-600" />
            </td>
            <td className="py-2 px-4 border-b border-gray-700">
              <span className="text-green-500">Published</span>
            </td>
            <td className="py-2 px-4 border-b border-gray-700">
              JavaScript Fundamentals: Variables and Data Types
            </td>
            <td className="py-2 px-4 border-b border-gray-700">
              <span className="text-green-400">921 likes</span> <span className="text-red-400">49 dislikes</span>
            </td>
            <td className="py-2 px-4 border-b border-gray-700">9/22/2023</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b border-gray-700">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-purple-600" />
            </td>
            <td className="py-2 px-4 border-b border-gray-700">
              <span className="text-orange-500">Unpublished</span>
            </td>
            <td className="py-2 px-4 border-b border-gray-700">
              React Hooks Explained: useState and useEffect
            </td>
            <td className="py-2 px-4 border-b border-gray-700">
              <span className="text-green-400">2520 likes</span> <span className="text-red-400">279 dislikes</span>
            </td>
            <td className="py-2 px-4 border-b border-gray-700">9/21/2023</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  )
}

export default Admin
