// Global state
let attendanceList = JSON.parse(localStorage.getItem('attendance')) || [];
let html5QrcodeScanner;

// Demo student names
const demoStudents = [
  'John Smith', 'Alice Johnson', 'Bob Wilson',
  'Carol Davis', 'Emma Taylor'
];

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeScanner();
  updateAttendanceDisplay();
  bindEnterKeys();
});

// Bind Enter key events
function bindEnterKeys() {
  document.getElementById('student-name')
    .addEventListener('keypress', e => {
      if (e.key === 'Enter') markManualAttendance();
    });
  document.getElementById('qr-text')
    .addEventListener('keypress', e => {
      if (e.key === 'Enter') generateQR();
    });
}

// Initialize the QR scanner
function initializeScanner() {
  try {
    html5QrcodeScanner = new Html5QrcodeScanner(
      'qr-reader',
      { fps: 10, qrbox: { width: 300, height: 300 }, aspectRatio: 1.0 },
      false // verbose = false
    );
    html5QrcodeScanner.render(onScanSuccess, onScanError);
  } catch (error) {
    console.error('Scanner initialization failed:', error);
    document.getElementById('qr-reader').innerHTML = 
      '<p style="color: #ef4444;">Camera not available or permission denied</p>';
  }
}

function onScanSuccess(text) {
  addStudentAttendance(text);
  showTempMessage(`✅ Scanned: ${text}`, 'success');
}

function onScanError(err) {
  // Handle scan errors silently or log if desired
}

// Generate a single QR code from input text
function generateQR() {
  const text = document.getElementById('qr-text').value.trim();
  if (!text) {
    alert('Please enter a student name!');
    return;
  }
  createQRCode(text);
  document.getElementById('qr-text').value = '';
}

// Generate demo QR codes for predefined students
function generateBulkQR() {
  const container = document.getElementById('qr-output');
  container.innerHTML = '<h3 style="grid-column: 1/-1; text-align: center; color: #1f2937;">Demo QR Codes:</h3>';
  demoStudents.forEach(name => createQRCode(name));
  showNotification('✅ Generated 5 demo QR codes!', 'success');
}

// Create and display a QR code with label
function createQRCode(text) {
  const container = document.getElementById('qr-output');
  const item = document.createElement('div');
  item.className = 'qr-item';

  const canvasDiv = document.createElement('div');
  const label = document.createElement('h4');
  label.textContent = text;

  item.appendChild(canvasDiv);
  item.appendChild(label);
  container.appendChild(item);

  // Generate QR code using QRCode.js
  try {
    QRCode.toCanvas(canvasDiv, text, { 
      width: 150, 
      height: 150,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    }, err => {
      if (err) {
        console.error('QR code generation error:', err);
        canvasDiv.innerHTML = '<p style="color: #ef4444;">QR Generation Failed</p>';
      }
    });
  } catch (error) {
    console.error('QRCode library not loaded:', error);
    canvasDiv.innerHTML = '<p style="color: #ef4444;">QR Library Error</p>';
  }
}

// Add a student to the attendance list
function addStudentAttendance(name) {
  name = name.trim();
  if (!name) return;
  
  if (attendanceList.some(s => s.name.toLowerCase() === name.toLowerCase())) {
    showNotification(`${name} is already marked present!`, 'error');
    return;
  }
  
  const record = {
    name,
    time: new Date().toLocaleTimeString(),
    timestamp: Date.now()
  };
  attendanceList.push(record);
  saveAndRefresh();
  showNotification(`✅ ${name} marked present!`, 'success');
}

// Mark attendance via manual entry input
function markManualAttendance() {
  const name = document.getElementById('student-name').value.trim();
  if (!name) {
    alert('Please enter a student name!');
    return;
  }
  addStudentAttendance(name);
  document.getElementById('student-name').value = '';
}

// Refresh the attendance list display
function updateAttendanceDisplay() {
  const list = document.getElementById('attendance-list');
  const countElement = document.getElementById('attendance-count');
  
  countElement.textContent = attendanceList.length;
  list.innerHTML = '';
  
  if (!attendanceList.length) {
    list.innerHTML = '<p style="text-align:center;color:#6b7280;font-style:italic;">No students marked present yet.</p>';
    return;
  }
  
  attendanceList.forEach((s, i) => {
    const div = document.createElement('div');
    div.className = 'attendance-item';
    div.innerHTML = `
      <div class="student-info">
        <div class="student-name">${escapeHtml(s.name)}</div>
        <div class="student-time">⏰ ${s.time}</div>
      </div>
      <button class="remove-btn" onclick="removeStudent(${i})">Remove</button>
    `;
    list.appendChild(div);
  });
}

// Remove a student from attendance list
function removeStudent(idx) {
  if (idx < 0 || idx >= attendanceList.length) return;
  
  const name = attendanceList[idx].name;
  attendanceList.splice(idx, 1);
  saveAndRefresh();
  showNotification(`${name} removed from attendance`, 'info');
}

// Add demo students to attendance list
function addDemoStudents() {
  let added = 0;
  demoStudents.forEach(name => {
    if (!attendanceList.some(s => s.name.toLowerCase() === name.toLowerCase())) {
      attendanceList.push({
        name,
        time: new Date().toLocaleTimeString(),
        timestamp: Date.now()
      });
      added++;
    }
  });
  
  if (added) {
    saveAndRefresh();
    showNotification(`✅ Added ${added} demo students!`, 'success');
  } else {
    showNotification('All demo students are already present', 'info');
  }
}

// Export attendance list as CSV file
function exportAttendance() {
  if (!attendanceList.length) {
    alert('No attendance data to export!');
    return;
  }
  
  let csv = 'Student Name,Time,Date\n';
  attendanceList.forEach(s => {
    const date = new Date(s.timestamp).toLocaleDateString();
    csv += `"${s.name}","${s.time}","${date}"\n`;
  });
  
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `attendance_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  showNotification('📊 Attendance exported as CSV!', 'success');
}

// Clear the entire attendance list
function clearAttendance() {
  if (!attendanceList.length) {
    alert('No attendance data to clear!');
    return;
  }
  
  if (!confirm('Are you sure you want to clear all attendance records?')) return;
  
  attendanceList = [];
  saveAndRefresh();
  showNotification('🗑️ All attendance records cleared', 'info');
}

// Save attendance data and update UI
function saveAndRefresh() {
  localStorage.setItem('attendance', JSON.stringify(attendanceList));
  updateAttendanceDisplay();
}

// Show toast-style notification messages
function showNotification(msg, type) {
  // Remove existing notification
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = msg;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 3000);
}

// Show temporary result message below the scanner
function showTempMessage(msg, type) {
  const element = document.getElementById('qr-reader-results');
  if (element) {
    element.innerHTML = `<div class="${type}">${escapeHtml(msg)}</div>`;
    setTimeout(() => {
      element.innerHTML = '';
    }, 3000);
  }
}

// Utility function to escape HTML
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Service worker registration for PWA capability
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}