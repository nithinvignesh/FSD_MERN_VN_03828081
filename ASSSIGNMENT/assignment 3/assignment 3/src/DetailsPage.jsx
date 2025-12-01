import { useLocation, useNavigate } from 'react-router-dom';
import './DetailsPage.css';

function DetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, imagePreview, imageDetails } = location.state || {};

  // Redirect to home if no data is passed
  if (!formData) {
    return (
      <div className="error-container">
        <h2>No data found</h2>
        <p>Please submit the form first</p>
        <button onClick={() => navigate('/')} className="btn btn-back">
          Go Back to Form
        </button>
      </div>
    );
  }

  // Handle save to gallery
  const handleSaveToGallery = () => {
    // Get existing saved forms from localStorage
    const existingSaved = localStorage.getItem('savedForms');
    const savedForms = existingSaved ? JSON.parse(existingSaved) : [];

    // Create new form object with unique ID
    const newForm = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      description: formData.description,
      imagePreview: imagePreview,
      imageDetails: imageDetails,
      savedAt: new Date().toISOString(),
    };

    // Add to saved forms
    savedForms.push(newForm);
    localStorage.setItem('savedForms', JSON.stringify(savedForms));

    alert('✅ Submission saved successfully!');
    navigate('/gallery');
  };

  return (
    <div className="details-container">
      <div className="details-header">
        <button onClick={() => navigate('/')} className="btn btn-back">
          ← Back to Form
        </button>
        <h1>Submitted Details</h1>
      </div>

      <div className="details-content">
        {/* Image Section */}
        <div className="image-section">
          <h2>Uploaded Image</h2>
          <div className="image-display">
            <img src={imagePreview} alt="Submitted" className="detail-image" />
          </div>
          {imageDetails && (
            <div className="image-info">
              <h3>Image Information</h3>
              <table className="info-table">
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
                    <td className="value">{(imageDetails.size / 1024).toFixed(2)} KB</td>
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
          )}
        </div>

        {/* Form Data Section */}
        <div className="form-data-section">
          <h2>Personal Information</h2>
          <div className="data-card">
            <div className="data-item">
              <label>Name:</label>
              <p>{formData.name}</p>
            </div>
            <div className="data-item">
              <label>Email:</label>
              <p>{formData.email}</p>
            </div>
            <div className="data-item">
              <label>Description:</label>
              <p>{formData.description || 'No description provided'}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button onClick={() => navigate('/')} className="btn btn-edit">
              Edit and Resubmit
            </button>
            <button
              onClick={handleSaveToGallery}
              className="btn btn-save"
            >
              ✅ Save & View Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
