import React from 'react';
import '../styles/StudentList.css';

const StudentList = ({ students, onEdit, onDelete, isLoading }) => {
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading students...</p>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="empty-state">
        <p>No students found. Add a new student to get started!</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="students-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td className="actions-cell">
                <button
                  onClick={() => onEdit(student)}
                  className="btn btn-sm btn-edit"
                  title="Edit student"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(student.id)}
                  className="btn btn-sm btn-delete"
                  title="Delete student"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
