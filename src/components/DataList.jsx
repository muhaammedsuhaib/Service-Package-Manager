import React from "react";

const DataList = ({ packageData }) => {

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{packageData.title}</h1>
        <p className="text-gray-600 mb-4">{packageData.description}</p>
        <p className="text-lg font-semibold text-gray-800 mb-2">
          Price: {packageData.price > 0 ? `${packageData.currency} ${packageData.price}` : 'Free'}
        </p>
      </div>

      {/* service Package Task */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Service Tasks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {packageData.servicePackageTasks.map((task) => (
          <div key={packageData.id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">{packageData.title}</h3>
            <p className="text-gray-600">
              <span className="font-medium">Estimated Time:</span> {packageData.estimatedMinutes} minutes
            </p>
            {packageData.description && (
              <div className="mt-2 text-gray-600" dangerouslySetInnerHTML={{ __html: packageData.description }}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataList;
