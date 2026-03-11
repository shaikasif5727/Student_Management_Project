import React from 'react';
import '../styles/DeleteConfirmDialog.css';

const DeleteConfirmDialog = ({ studentName, onConfirm, onCancel, isLoading }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content confirm-dialog">
        <h3>Confirm Delete</h3>
        <p>
          Are you sure you want to delete <strong>{studentName}</strong>? This action cannot be
          undone.
        </p>
        <div className="modal-actions">
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="btn btn-danger"
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmDialog;
