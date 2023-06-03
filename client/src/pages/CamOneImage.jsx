import React from 'react'
import { useState } from 'react'
import Menu from '../components/Menu'
import Content from '../pages/Content'
import axios from 'axios'
const CamOneImage = () => {
  
  
    const [selectedImage, setSelectedImage] = useState(null)
    const [imageInfo, setImageInfo] = useState(null)
    const [methods, setMethods] = useState({
      cam:false, grad_cam:false,eigen_cam:false, eigen_cam_k_vect : false, pca_cam:false, pca_cam_k_vect : false, propa_cam:false
    })
    const [classification, setClassification] = useState(null)
    const [camImage, setCamImage] = useState(null)
    const [genInfo, setGenInfo] = useState({model:'mnist',kernel:'linear',thresh:0.0})
    const [error, setError] = useState(null)
  
  
    const handleImaeUpload = (e) => {
      if (error?.type == "missing_form_data"){
        setError(null)
      }
      setImageInfo(null)
      setClassification(null)
      // setMethods({
      //   cam:false, grad_cam:false,eigen_cam:false, eigen_cam_k_vect : false, pca_cam:false, pca_cam_k_vect : false, propa_cam:false
      // })
      const file = e.target.files[0]
      setSelectedImage(URL.createObjectURL(file))
      setImageInfo(file)
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      setError(null)
      if(imageInfo){
        
        const formData = new FormData()
        formData.append('image',imageInfo)
        formData.append('model', genInfo.model)
        formData.append('kernel', genInfo.kernel)
        formData.append('thresh', genInfo.thresh)
        try{
          const response = await axios.post('http://localhost:5000/api/classify', formData)
          const {classe, proba,pca_cam, propa_cam, eigen_cam, pca_cam_k_vect,eigen_cam_k_vect, error} = response.data
          if (error) {
            // Display the error message to the user
            setError({message : "Choisir le bon modèle pour ce type d'image SVP!", type : 'model_error'})
          }else{
            setClassification({classe, proba})
            setCamImage({pca_cam ,propa_cam, eigen_cam,pca_cam_k_vect,eigen_cam_k_vect});
          }
          // fetchImage(image_name)
        }catch(error){
          console.log(error);
        }
      }else{
        setError({ message : "L'image du test n'est pas chargée.", type:"missing_form_data"})
      }
    }
  
  return (
    <>
        <Menu handleImaeUpload={handleImaeUpload} handleSubmit={handleSubmit} methods={methods} setMethods={setMethods} genInfo={genInfo} setGenInfo={setGenInfo} />
        <Content selectedImage={selectedImage} imageInfo={imageInfo} classification={classification} methods={methods} camImage={camImage} error={error}  />
    </>
  )
}

export default CamOneImage