# Smart Attendance System

A modern, QR code-based attendance tracking system built with HTML, CSS, and JavaScript. Perfect for classrooms, workshops, and events.

## 🚀 Features

- **QR Code Generation**: Create unique QR codes for each student
- **Real-time Scanning**: Scan QR codes using device camera
- **Manual Entry**: Backup attendance marking option
- **Export Data**: Download attendance records as CSV
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Offline Storage**: Data persists using localStorage
- **Demo Mode**: Test with sample data

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **QR Libraries**: 
  - QRCode.js (Generation)
  - html5-qrcode (Scanning)
- **Storage**: localStorage for persistence
- **Responsive**: CSS Grid and Flexbox

## 📦 Quick Start

1. **Clone/Download** the project files
2. **Open** `index.html` in a web browser
3. **Allow camera permissions** for QR scanning
4. **Generate QR codes** for your students
5. **Start scanning** to mark attendance!

## 🌐 Deployment Options

### Option 1: Netlify (Recommended)
1. Create account at [netlify.com](https://netlify.com)
2. Drag & drop your project folder
3. Get instant live URL

### Option 2: Vercel
1. Create account at [vercel.com](https://vercel.com)
2. Connect GitHub repo or upload files
3. Deploy with one click

### Option 3: GitHub Pages
1. Upload files to GitHub repository
2. Enable GitHub Pages in settings
3. Access via `username.github.io/repo-name`

## 📱 Usage Instructions

### For Teachers/Administrators:
1. **Generate QR Codes**: Enter student names and create their unique QR codes
2. **Print/Share**: Distribute QR codes to students (printed cards or digital)
3. **Scan Attendance**: Use the scanner section to mark attendance
4. **Export Records**: Download CSV reports for record-keeping

### For Students:
1. **Receive QR Code**: Get your unique QR code from instructor
2. **Present Code**: Show QR code to the scanning device
3. **Confirmation**: Wait for attendance confirmation message

## 🔧 Customization

### Adding More Demo Students:
```javascript
const demoStudents = [
  'John Smith', 'Alice Johnson', 'Bob Wilson',
  'Carol Davis', 'Emma Taylor',
  'Your Student Name Here'  // Add more names
];
```

### Changing Colors:
Edit the CSS variables in `styles.css`:
```css
:root {
  --primary-color: #your-color-here;
  --secondary-color: #your-color-here;
}
```

## 🚫 Security Features

- **Unique QR Codes**: Each student gets a distinct code
- **No Duplicate Entries**: System prevents marking the same student twice
- **Input Validation**: Sanitizes all user inputs
- **Manual Entry Safeguards**: Alerts about potential misuse

## 📊 Data Export

The system exports attendance data in CSV format with:
- Student Name
- Time of Attendance
- Date of Attendance

## 🔍 Troubleshooting

### QR Codes Not Generating:
- Check that QRCode.js library is loaded
- Ensure internet connection for CDN resources
- Verify no JavaScript errors in console

### Camera Not Working:
- Grant camera permissions in browser
- Use HTTPS for secure contexts
- Check if camera is available/not in use

### Scanning Issues:
- Ensure good lighting conditions
- Hold QR code steady and close to camera
- Check if QR code is not damaged/blurred

## 📋 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 60+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers with camera support

## 🎯 Demo URLs

After deployment, your system will be accessible at:
- **Netlify**: `https://your-app-name.netlify.app`
- **Vercel**: `https://your-app-name.vercel.app`
- **GitHub Pages**: `https://username.github.io/repository-name`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Create Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 Perfect for Expo!

This project is ideal for showcasing at expos because:
- **Interactive Demo**: Visitors can scan QR codes live
- **Professional UI**: Modern, clean design
- **Real-world Application**: Solves actual attendance tracking problems
- **Technology Showcase**: Demonstrates QR codes, camera integration, and responsive design
- **Easy Setup**: Works on any device with a web browser

---

Made with ❤️ for efficient attendance tracking