import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { taskAPI } from '../../services/api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      let response;
      if (filter === 'all') {
        response = await taskAPI.getAllTasks();
      } else {
        const status = filter === 'completed' ? 'complete' : 'incomplete';
        response = await taskAPI.getTasksByStatus(status);
      }
      setTasks(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching tasks');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (newTask) => {
    try {
      const response = await taskAPI.createTask(newTask);
      setTasks([...tasks, response.data]);
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating task');
    }
  };

  const toggleTask = async (taskId) => {
    try {
      const task = tasks.find(t => t._id === taskId);
      const response = await taskAPI.updateTask(taskId, {
        status: task.status === 'complete' ? 'incomplete' : 'complete'
      });
      setTasks(tasks.map(t => t._id === taskId ? response.data : t));
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating task');
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await taskAPI.deleteTask(taskId);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting task');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Task Manager</h1>
        <TaskForm onAddTask={addTask} />
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
          {error}
        </div>
      )}

      <div className="mb-4 flex space-x-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-md ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded-md ${
            filter === 'active'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-md ${
            filter === 'completed'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Completed
        </button>
      </div>

      {loading ? (
        <div className="text-center py-4">Loading tasks...</div>
      ) : (
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No tasks found</p>
          ) : (
            tasks.map(task => (
              <TaskItem
                key={task._id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default TaskList; 