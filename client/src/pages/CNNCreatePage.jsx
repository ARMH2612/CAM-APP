import React, { useState } from 'react';

const CNNCreatePage = () => {
  const [numLayers, setNumLayers] = useState(0);
  const [numFCLayers, setNumFCLayers] = useState(0);
  const [kernelSizes, setKernelSizes] = useState([]);
  const [inChannels, setInChannelss] = useState([]);
  const [outChannels, setOutChannelss] = useState([]);
  const [activationFunctions, setActivationFunctions] = useState([]);

  const handleNumLayersChange = (e) => {
    setNumLayers(parseInt(e.target.value));
  };
  
  const handleNumLFCayersChange = (e) => {
    setNumFCLayers(parseInt(e.target.value));
  }

  const handleKernelSizeChange = (e, index) => {
    const updatedKernelSizes = [...kernelSizes];
    updatedKernelSizes[index] = parseInt(e.target.value);
    setKernelSizes(updatedKernelSizes);
  };

  const handleInChannelsChange = (e, index) => {
    const updatedInChannels = [...inChannels];
    updatedInChannels[index] = parseInt(e.target.value);
    setInChannelss(updatedInChannels);
  }

  const handleOutChannelsChange = (e, index) => {
    const updatedOutChannels = [...outChannels];
    updatedOutChannels[index] = parseInt(e.target.value);
    setOutChannelss(updatedOutChannels);
  }

  const handleActivationFunctionChange = (e, index) => {
    const updatedActivationFunctions = [...activationFunctions];
    updatedActivationFunctions[index] = e.target.value;
    setActivationFunctions(updatedActivationFunctions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the CNN configuration data to the backend
    const cnnConfig = {
      numLayers,
      kernelSizes,
      activationFunctions,
      inChannels,
      outChannels,
      numFCLayers
    };
    console.log(cnnConfig);
    // Make the API request to the backend for CNN creation
    // using axios or fetch API
    // ...
  };

  const renderFCLayerInputs = () => {
    const layerInputs = []
    for (let i = 0 ; i < numFCLayers; i++){
      layerInputs.push(
        <div key={i} className='w-full flex'>
          <div className='w-2/4'>

          </div>
        </div>
      )
    }
  }

  const renderLayerInputs = () => {
    const layerInputs = [];
    for (let i = 0; i < numLayers; i++) {
      layerInputs.push(
        <div key={i} className='w-full flex'>
            <div className='w-3/12'>
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kernel Size L {i + 1}: </label>
                <input
                    type="number"
                    min='1'
                    value={kernelSizes[i] || ''}
                    onChange={(e) => handleKernelSizeChange(e, i)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            <div className='w-3/12'>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">In Channels L {i + 1}: </label>
                <input
                    type="number"
                    min='1'
                    value={kernelSizes[i] || ''}
                    onChange={(e) => handleInChannelsChange(e, i)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            <div className='w-3/12'>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Out Channels L {i + 1}: </label>
                <input
                    type="number"
                    min='1'
                    value={kernelSizes[i] || ''}
                    onChange={(e) => handleOutChannelsChange(e, i)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            <div className='w-3/12'>
                <label htmlFor="activation_fx" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Activation Function L {i + 1}:</label>
                <select id="activation_fx" onChange={(e) => handleActivationFunctionChange(e, i)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value='ReLU'>ReLU</option>
                    <option value='Sigmoid'>Sigmoid</option>
                    <option value='Tanh'>Tanh</option>
                </select>
            </div>
        </div>
      );
    }
    return layerInputs;
  };

  return (
    <div className='w-full min-h-screen bg-gray-50 dark:bg-gray-700 p-3'>
      <div className='w-3/6'>
        <h2 className='mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>Create CNN</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of Layers: </label>
              <input
                type="number"
                value={numLayers}
                min='0'
                onChange={handleNumLayersChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Number of fully connected layers: </label>
              <input
                type="number"
                value={numFCLayers}
                min='0'
                onChange={handleNumLFCayersChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>
          {renderLayerInputs()}
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">Create CNN</button>
        </form>
      </div>
    </div>
  );
};

export default CNNCreatePage;
