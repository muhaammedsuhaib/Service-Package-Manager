import React from 'react';
import { FaClock, FaTasks } from 'react-icons/fa'; 
import { packageData } from './data';


const Task = ({ task }) => {
  return (
    <div
      className={`p-4 border-l-4 ${task.isSubtask ? 'ml-4 border-gray-400' : 'border-blue-500'} bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg mb-4`}
    >
      <h3 className="text-lg font-semibold flex items-center">
        <FaTasks className="mr-2 text-blue-600" /> {/* Task Icon */}
        {task.title}
      </h3>
      {task.description && (
        <p className="text-gray-700 mt-2" dangerouslySetInnerHTML={{ __html: task.description }} />
      )}
      <p className="text-gray-500 flex items-center mt-2">
        <FaClock className="mr-1 text-gray-500" /> {/* Clock Icon */}
        Estimated time: <span className="font-bold">{task.estimatedMinutes}</span> minutes
      </p>

      {task.subTasks.length > 0 && (
        <div className="mt-4 border-t border-gray-300 pt-2">
          {task.subTasks.map(subTask => (
            <Task key={subTask.id} task={subTask} />
          ))}
        </div>
      )}
    </div>
  );
};

const App = () => {
  const { title, description, servicePackageTasks } = packageData;

  const organizeTasks = (tasks) => {
    const taskMap = {};
    const rootTasks = [];

    tasks.forEach(task => {
      taskMap[task.id] = { ...task, subTasks: [] };
    });

    tasks.forEach(task => {
      if (task.parentServicePackageTaskId) {
        taskMap[task.parentServicePackageTaskId].subTasks.push(taskMap[task.id]);
      } else {
        rootTasks.push(taskMap[task.id]);
      }
    });

    return rootTasks;
  };

  const organizedTasks = organizeTasks(servicePackageTasks);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-blue-700">{title}</h1>
        <p className="mt-2 text-gray-600">{description}</p>

        {organizedTasks.map(task => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default App;
