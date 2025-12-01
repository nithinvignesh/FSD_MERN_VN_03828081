import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ImageFormComponent.css';

function ImageFormComponent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageDetails, setImageDetails] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Get image details when clicking on image
  const handleImageClick = () => {
    if (formData.image) {
      const details = {
        name: formData.image.name,
        type: formData.image.type,
        size: formData.image.size,
        lastModified: new Date(formData.image.lastModified).toLocaleString(),
        width: null,
        height: null,
      };

      // Get image dimensions
      const img = new Image();
      img.onload = () => {
        details.width = img.width;
        details.height = img.height;
        setImageDetails(details);
        setShowDetails(true);
      };
      img.src = imagePreview;
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Navigate to details page with form data
    navigate('/details', {
      state: {
        formData: formData,
        imagePreview: imagePreview,
        imageDetails: imageDetails,
      },
    });
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      description: '',
      image: null,
    });
    setImagePreview(null);
    setImageDetails(null);
    setShowDetails(false);
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <div className="form-header">
          <h1>Image Upload Form</h1>
          <button onClick={() => navigate('/gallery')} className="btn btn-gallery-link">
            📸 View Gallery
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Description Input */}
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter description"
              rows="4"
            ></textarea>
          </div>

          {/* Image Upload */}
          <div className="form-group">
            <label htmlFor="image">Upload Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              required
            />
          </div>

          {/* Form Buttons */}
          <div className="button-group">
            <button type="submit" className="btn btn-submit">
              Submit
            </button>
            <button type="reset" className="btn btn-reset" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>
      </div>

      {/* Image Preview Section */}
      {imagePreview && (
        <div className="preview-section">
          <h2>Image Preview</h2>
          <div className="image-preview-container">
            <img
              src={imagePreview}
              alt="Preview"
              className="preview-image"
              onClick={handleImageClick}
              title="Click to see image details"
            />
            <p className="click-hint">👆 Click image for details</p>
          </div>
        </div>
      )}

      {/* Image Details Modal */}
      {showDetails && imageDetails && (
        <div className="modal-overlay" onClick={() => setShowDetails(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Image Details</h2>
              <button
                className="close-btn"
                onClick={() => setShowDetails(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <table className="details-table">
                <tbody>
                  <tr>
                    <td className="label">File Name:</td>
                    <td className="value">{imageDetails.name}</td>
                  </tr>
                  <tr>
                    <td className="label">File Type:</td>
                    <td className="value">{imageDetails.type}</td>
                  </tr>
                  <tr>
                    <td className="label">File Size:</td>
                    <td className="value">
                      {(imageDetails.size / 1024).toFixed(2)} KB
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Dimensions:</td>
                    <td className="value">
                      {imageDetails.width} x {imageDetails.height} px
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Last Modified:</td>
                    <td className="value">{imageDetails.lastModified}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-close"
                onClick={() => setShowDetails(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageFormComponent;
