
import NavBar from './components/NavBar'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CamOneImage from './pages/CamOneImage';
import CNNCreatePage from './pages/CNNCreatePage';

function App() {


  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <div className='flex'>
          <Routes>
            <Route path='/' element={<CamOneImage/>} />
            <Route path='/new-cnn' element={<CNNCreatePage/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
