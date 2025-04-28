import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome, {user?.name}!
        </h1>
        <p className="text-gray-600 mb-6">
          Manage your tasks and stay organized with our task management system.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to="/tasks"
                className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                View All Tasks
              </Link>
              <Link
                to="/tasks/new"
                className="block w-full bg-green-600 text-white text-center py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
              >
                Create New Task
              </Link>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Task Summary</h2>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Total Tasks:</span> Coming soon
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Completed Tasks:</span> Coming soon
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Pending Tasks:</span> Coming soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 