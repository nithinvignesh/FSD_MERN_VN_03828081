import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ImageFormComponent from './ImageFormComponent'
import DetailsPage from './DetailsPage'
import SavedGallery from './SavedGallery'
import SavedDetails from './SavedDetails'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ImageFormComponent />} />
        <Route path="/details" element={<DetailsPage />} />
        <Route path="/gallery" element={<SavedGallery />} />
        <Route path="/saved-details" element={<SavedDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
