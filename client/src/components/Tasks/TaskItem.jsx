import React from 'react';

const TaskItem = ({ task, onToggle, onDelete }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={task.status === 'complete'}
            onChange={() => onToggle(task._id)}
            className="mt-1 h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
          />
          <div>
            <h3 className={`text-lg font-medium ${
              task.status === 'complete' ? 'line-through text-gray-500' : 'text-gray-800'
            }`}>
              {task.title}
            </h3>
            <p className={`text-sm ${
              task.status === 'complete' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {task.description}
            </p>
            <div className="mt-2 flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => onDelete(task._id)}
          className="text-red-500 hover:text-red-700 focus:outline-none"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskItem; 