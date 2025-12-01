import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SavedGallery.css';

function SavedGallery() {
  const [savedForms, setSavedForms] = useState([]);
  const navigate = useNavigate();

  // Load saved forms from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('savedForms');
    if (saved) {
      setSavedForms(JSON.parse(saved));
    }
  }, []);

  // Handle viewing details
  const handleViewDetails = (form) => {
    navigate('/saved-details', { state: { formData: form } });
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      const updated = savedForms.filter((form) => form.id !== id);
      setSavedForms(updated);
      localStorage.setItem('savedForms', JSON.stringify(updated));
    }
  };

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <h1>📸 Saved Submissions</h1>
        <button onClick={() => navigate('/')} className="btn btn-new">
          + New Submission
        </button>
      </div>

      {savedForms.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h2>No saved submissions yet</h2>
          <p>Submit a form to see your submissions here</p>
          <button onClick={() => navigate('/')} className="btn btn-create">
            Create First Submission
          </button>
        </div>
      ) : (
        <div className="gallery-grid">
          {savedForms.map((form) => (
            <div key={form.id} className="card">
              <div className="card-image-container">
                <img
                  src={form.imagePreview}
                  alt={form.name}
                  className="card-image"
                  onClick={() => handleViewDetails(form)}
                  title="Click to view details"
                />
                <div className="card-overlay">
                  <button
                    className="btn-view"
                    onClick={() => handleViewDetails(form)}
                  >
                    👁️ View Details
                  </button>
                </div>
              </div>
              <div className="card-content">
                <h3>{form.name}</h3>
                <p className="card-email">{form.email}</p>
                {form.description && (
                  <p className="card-description">{form.description.substring(0, 60)}...</p>
                )}
                <div className="card-footer">
                  <span className="card-date">
                    {new Date(form.savedAt).toLocaleDateString()}
                  </span>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(form.id)}
                    title="Delete this submission"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedGallery;
