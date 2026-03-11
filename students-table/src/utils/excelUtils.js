import * as XLSX from 'xlsx';

export const exportToExcel = (students, fileName = 'students.xlsx') => {
  if (students.length === 0) {
    alert('No students to export');
    return;
  }

  // Prepare data for Excel
  const dataForExport = students.map((student) => ({
    Name: student.name,
    Email: student.email,
    Age: student.age,
  }));

  // Create workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(dataForExport);

  // Set column widths
  const columnWidths = [
    { wch: 20 }, // Name
    { wch: 30 }, // Email
    { wch: 10 }, // Age
  ];
  worksheet['!cols'] = columnWidths;

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');

  // Download file
  XLSX.writeFile(workbook, fileName);
};

export const generateStudentId = () => {
  return `student_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
