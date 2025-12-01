import { useLocation, useNavigate } from 'react-router-dom';
import './SavedDetails.css';

function SavedDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData;

  if (!formData) {
    return (
      <div className="error-container">
        <h2>No data found</h2>
        <p>Please select a submission from the gallery</p>
        <button onClick={() => navigate('/gallery')} className="btn btn-back">
          Back to Gallery
        </button>
      </div>
    );
  }

  return (
    <div className="saved-details-container">
      <div className="saved-header">
        <button onClick={() => navigate('/gallery')} className="btn btn-back">
          ← Back to Gallery
        </button>
        <h1>📋 Submission Details</h1>
      </div>

      <div className="saved-content">
        {/* Image Section */}
        <div className="saved-image-section">
          <h2>Uploaded Image</h2>
          <div className="image-display">
            <img
              src={formData.imagePreview}
              alt="Submitted"
              className="large-image"
            />
          </div>
          {formData.imageDetails && (
            <div className="saved-image-info">
              <h3>📊 Image Information</h3>
              <table className="saved-info-table">
                <tbody>
                  <tr>
                    <td className="label">File Name:</td>
                    <td className="value">{formData.imageDetails.name}</td>
                  </tr>
                  <tr>
                    <td className="label">File Type:</td>
                    <td className="value">{formData.imageDetails.type}</td>
                  </tr>
                  <tr>
                    <td className="label">File Size:</td>
                    <td className="value">
                      {(formData.imageDetails.size / 1024).toFixed(2)} KB
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Dimensions:</td>
                    <td className="value">
                      {formData.imageDetails.width} x {formData.imageDetails.height} px
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Last Modified:</td>
                    <td className="value">{formData.imageDetails.lastModified}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Data Section */}
        <div className="saved-data-section">
          <h2>👤 Personal Information</h2>
          <div className="saved-data-card">
            <div className="saved-data-item">
              <label>Name:</label>
              <p>{formData.name}</p>
            </div>
            <div className="saved-data-item">
              <label>Email:</label>
              <p>{formData.email}</p>
            </div>
            <div className="saved-data-item">
              <label>Description:</label>
              <p>{formData.description || 'No description provided'}</p>
            </div>
            <div className="saved-data-item">
              <label>Saved On:</label>
              <p>{new Date(formData.savedAt).toLocaleString()}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="saved-action-buttons">
            <button onClick={() => navigate('/gallery')} className="btn btn-gallery">
              ← Back to Gallery
            </button>
            <button onClick={() => navigate('/')} className="btn btn-new-submit">
              + New Submission
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavedDetails;
