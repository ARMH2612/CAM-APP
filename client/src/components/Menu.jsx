import React from 'react'


const Menu = ({handleImaeUpload, methods, setMethods, handleSubmit,genInfo, setGenInfo}) => {


  return (
    <div className='h-screen w-3/12 bg-gray-50 dark:bg-gray-700 p-2'>
      <div className='mb-3'>          
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="test_image">Choisissez une image</label>
        <input onChange={handleImaeUpload} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"  id="test_image" type="file" />
        <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="test_image_help">Choisir une image pour la classification et l'explication visuelle</div>
      </div>
      
      <div className='mb-2'>       
        <label htmlFor="modeles" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choisissez un modèle</label>
        <select id="modeles" onChange={(e)=>{setGenInfo({... genInfo, model : e.target.value})}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value='mnist'>Modèle MNIST</option>
          <option value='svhn'>Modèle SVHN</option>
          <option value='cifar'>Modèle CIFAR-10</option>
          <option>Modèle ...</option>
        </select>
      </div>
      
      <div className='mb-2'>       
        <label htmlFor="kernels" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choisissez le noyau</label>
        <select id="kernels" onChange={(e)=>{setGenInfo({... genInfo, kernel : e.target.value})}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value='linear'>Linear</option>
          <option value='cosine'>Cosine</option>
          <option value='rbf'>RBF</option>
          <option value='sigmoid'>Sigmoid</option>
          <option value='poly'>Poly</option>
        </select>
      </div>

      <div className="mb-2">
        <label htmlFor="thresh" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seuil</label>
        <input type="number" id="thresh" onChange={(e)=>{setGenInfo({... genInfo, thresh : e.target.value})}} min="0" max="1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
      </div> 

      <fieldset>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Les methodes de generations de CAM</label>
        <div className="flex items-center mb-2">
            <input id="cam" onChange={(e)=>{setMethods({...methods, cam:e.target.checked})}} type="checkbox" value="CAM" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="cam" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">CAM</label>
        </div>

        <div className="flex items-center mb-2">
            <input id="grad-cam" onChange={(e)=>{setMethods({...methods, grad_cam:e.target.checked})}} type="checkbox" value="GRAD-CAM" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="grad-cam" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Grad-CAM</label>
        </div>
        
        <div className="flex items-center mb-2">
            <input id="eigen-cam" onChange={(e)=>{setMethods({...methods, eigen_cam:e.target.checked})}} type="checkbox" value="EIGEN-CAM" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="eigen-cam" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Eigen-CAM</label>
        </div>

        <hr className='mb-2' />
        <div className="mb-2">
            <input id="eigen-cam-k-vect" onChange={(e)=>{setMethods({...methods, eigen_cam_k_vect:e.target.checked})}} type="checkbox" value="EIGEN-CAM-K-VECT" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="eigen-cam-k-vect" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Eigen-CAM<sub className="text-xs">k-vect</sub></label>
        </div>
        <div className="flex items-center mb-2">
            <input id="pca-cam" onChange={(e)=>{setMethods({...methods, pca_cam:e.target.checked})}} type="checkbox" value="PCA-CAM" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="pca-cam" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">PCA-CAM</label>
        </div>

        <div className="flex items-center mb-2">
            <input id="pca-cam-k-vect" onChange={(e)=>{setMethods({...methods, pca_cam_k_vect:e.target.checked})}} type="checkbox" value="PCA-CAM-K-VECT" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="pca-cam-k-vect" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">PCA-CAM<sub className="text-xs">k-vect</sub></label>
        </div>
          
        <div className="flex items-center mb-2">
            <input id="propa-cam" onChange={(e)=>{setMethods({...methods, propa_cam:e.target.checked})}} type="checkbox" value="PROPA-CAM" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="propa-cam" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">PROPA-CAM</label>
        </div>

      </fieldset>

      <div>
        <button type="submit" onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Lancer</button>
      </div>
    </div>
  )
}

export default Menu