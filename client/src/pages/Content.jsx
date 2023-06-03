import React from 'react'

const Content = ({selectedImage, imageInfo, methods, classification, camImage, error}) => {
  return (
    <div className='w-9/12 h-screen dark:bg-gray-900 overflow-hidden'>
      <div className='w-full flex h-3/6 p-2'>
        <div className='w-6/12 flex items-center justify-center'>
          {
            error?.type == "missing_form_data" ? 
           ( <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
              <span className="font-medium">Avertissement!</span>{error.message}
            </div>) : 
            (selectedImage && <img src={selectedImage} alt="image de test de classification" className="h-full object-contain"/>)
          }
        </div>
        <div className='w-6/12 max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700'>         
          <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
              <div className="flex text-sm flex-col pb-3">
                  <dt className="mb-1  text-gray-500 dark:text-gray-400">Titre de fichier</dt>
                  <dd className=" font-semibold">{imageInfo? imageInfo.name : "-"}</dd>
              </div>
              <div className="flex text-sm flex-col py-3">
                  <dt className="mb-1  text-gray-500 dark:text-gray-400">Taille de fichier</dt>
                  <dd className=" font-semibold">{imageInfo?(imageInfo.size/1024).toFixed(2)+"KB" : "-"}</dd>
              </div>
              <div className="flex text-sm flex-col py-3">
                  <dt className="mb-1  text-gray-500 dark:text-gray-400">Classe</dt>
                  <dd className=" font-semibold bg-green-100 text-green-800 text-xs mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{classification? classification.classe : "-"}</dd>
              </div>
              <div className="flex text-sm flex-col py-3">
                  <dt className="mb-1  text-gray-500 dark:text-gray-400">Score</dt>
                  <dd className=" font-semibold">{classification? classification.proba.toFixed(2)+"%" : "-"}</dd>
              </div>
              
          </dl>

        </div>
      </div>
      <div className="w-full h-3/6">
          {
            error?.type == "model_error" ?( 
                  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">Erreur!</span> {error.message}
                  </div>
            ) : (
                  <table className='w-full h-full text-sm text-left text-gray-500 dark:text-gray-400'>
                    <thead className='text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                      <tr>
                        {methods.cam && <th scope="col" className="px-6 py-3 ">CAM</th>}
                        {methods.grad_cam && <th scope="col" className="px-6 py-3">Grad-CAM</th>}
                        {methods.eigen_cam && <th scope="col" className="px-6 py-3">Eigen-CAM</th>}
                        {methods.eigen_cam_k_vect && <th scope="col" className="px-6 py-3">Eigen-CAM<sub className="text-xs">k-vect</sub></th>}
                        {methods.pca_cam && <th scope="col" className="px-6 py-3">PCA-CAM</th>}
                        {methods.pca_cam_k_vect && <th scope="col" className="px-6 py-3">PCA-CAM<sub className="text-xs">k-vect</sub></th>}
                        {methods.propa_cam && <th scope="col" className="px-6 py-3">Propa-CAM</th>}
                      </tr>
                    </thead>
                    <tbody >
                      <tr className='h-48'>
                        {methods.cam && <td>{selectedImage && <img src={camImage?.cam ? `data:image/png;base64,${camImage.cam}` : selectedImage} alt="image de test de classification" className=" h-40"/>}</td>}
                        {methods.grad_cam && <td>{selectedImage && <img src={camImage?.grad_cam ? `data:image/png;base64,${camImage.grad_cam}` : selectedImage} alt="image de test de classification" className="h-40"/>}</td>}
                        {methods.eigen_cam && <td>{selectedImage && <img src={camImage?.eigen_cam ? `data:image/png;base64,${camImage.eigen_cam}` : selectedImage} alt="image de test de classification" className="h-40"/>}</td>}
                        {methods.eigen_cam_k_vect && <td>{selectedImage && <img src={camImage?.eigen_cam_k_vect ? `data:image/png;base64,${camImage.eigen_cam_k_vect}` : selectedImage} alt="image de test de classification" className="h-40"/>}</td>}
                        {methods.pca_cam && <td>{selectedImage && <img src={camImage?.pca_cam ? `data:image/png;base64,${camImage.pca_cam}` : selectedImage} alt="image de test de classification" className="h-40"/>}</td>}
                        {methods.pca_cam_k_vect && <td>{selectedImage && <img src={camImage?.pca_cam_k_vect ? `data:image/png;base64,${camImage.pca_cam_k_vect}` : selectedImage} alt="image de test de classification" className="h-40"/>}</td>}
                        {methods.propa_cam && <td>{selectedImage && <img src={camImage?.propa_cam ? `data:image/png;base64,${camImage.propa_cam}` : selectedImage} alt="image de test de classification" className="h-40"/>}</td>}
                      </tr>
                    </tbody>
                  </table>
            )
          }
      </div>
    </div>
  )
}

export default Content