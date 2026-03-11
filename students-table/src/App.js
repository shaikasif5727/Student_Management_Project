import React, { useState, useEffect } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import DeleteConfirmDialog from './components/DeleteConfirmDialog';
import { exportToExcel } from './utils/excelUtils';
import './App.css';

const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  // Show success message for 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Show error message for 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Fetch all students from backend
  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/students`);
      if (!response.ok) throw new Error('Failed to fetch students');
      const data = await response.json();
      setStudents(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch students');
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Add Student
  const handleAddStudent = async (formData) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add student');
      }
      const newStudent = await response.json();
      setStudents((prev) => [newStudent, ...prev]);
      setShowForm(false);
      setSuccessMessage('Student added successfully!');
    } catch (err) {
      setError(err.message || 'Failed to add student');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Edit Student
  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  // Handle Update Student
  const handleUpdateStudent = async (formData) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/students/${editingStudent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update student');
      }
      const updatedStudent = await response.json();
      setStudents((prev) =>
        prev.map((student) =>
          student.id === editingStudent.id ? updatedStudent : student
        )
      );
      setEditingStudent(null);
      setShowForm(false);
      setSuccessMessage('Student updated successfully!');
    } catch (err) {
      setError(err.message || 'Failed to update student');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Delete Student
  const handleDeleteClick = (studentId) => {
    const student = students.find((s) => s.id === studentId);
    setDeleteConfirm({ id: studentId, name: student.name });
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (deleteConfirm) {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/students/${deleteConfirm.id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to delete student');
        }
        setStudents((prev) =>
          prev.filter((student) => student.id !== deleteConfirm.id)
        );
        setDeleteConfirm(null);
        setSuccessMessage('Student deleted successfully!');
      } catch (err) {
        setError(err.message || 'Failed to delete student');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle Cancel Form
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingStudent(null);
  };

  // Handle Export to Excel
  const handleExportExcel = () => {
    try {
      exportToExcel(students, 'students_data.xlsx');
      setSuccessMessage('Excel file downloaded successfully!');
    } catch (err) {
      setError(err.message || 'Failed to export to Excel');
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>📚 Students Management System</h1>
          <p>Manage student information efficiently</p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {/* Alert Messages */}
          {error && (
            <div className="alert alert-error">
              <span>❌ {error}</span>
              <button onClick={() => setError(null)} className="alert-close">✕</button>
            </div>
          )}
          {successMessage && (
            <div className="alert alert-success">
              <span>✅ {successMessage}</span>
              <button onClick={() => setSuccessMessage(null)} className="alert-close">✕</button>
            </div>
          )}

          <div className="controls-section">
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                disabled={isLoading}
                className="btn btn-primary btn-lg"
              >
                ➕ Add New Student
              </button>
            )}
            {students.length > 0 && (
              <button
                onClick={handleExportExcel}
                disabled={isLoading || showForm}
                className="btn btn-success btn-lg"
              >
                📥 Export to Excel
              </button>
            )}
          </div>

          <div className="content-section">
            {showForm && (
              <div className="form-section">
                <StudentForm
                  onSubmit={editingStudent ? handleUpdateStudent : handleAddStudent}
                  initialData={editingStudent}
                  isLoading={isLoading}
                  onCancel={handleCancelForm}
                />
              </div>
            )}

            <div className="list-section">
              <h2>📋 Students List ({students.length})</h2>
              {isLoading && !showForm && <div className="loading-spinner"></div>}
              {!isLoading && students.length === 0 && !showForm && (
                <div className="empty-state">
                  <p>No students yet. Click "Add New Student" to get started!</p>
                </div>
              )}
              {students.length > 0 && !isLoading && (
                <StudentList
                  students={students}
                  onEdit={handleEditStudent}
                  onDelete={handleDeleteClick}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      {deleteConfirm && (
        <DeleteConfirmDialog
          studentName={deleteConfirm.name}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteConfirm(null)}
          isLoading={isLoading}
        />
      )}

      <footer className="app-footer">
        <p>© 2026 Students Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
