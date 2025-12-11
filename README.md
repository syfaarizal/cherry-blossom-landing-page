# Tech Studio Landing Page

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

A modern landing page with a tech studio theme featuring stunning cyberpunk design and visual effects. Built using pure HTML, CSS, and JavaScript without any frameworks.

## 📸 Preview

This landing page showcases a tech/gaming workspace with aesthetic red neon lighting, complete with glass morphism effects and smooth parallax animations.

## ✨ Key Features

- **🎨 Modern Design** - Glass morphism effect with backdrop blur
- **🌈 Color Scheme** - Dark theme with red neon accent (#ff3250)
- **💫 Interactive Animations** - Parallax effect following mouse movement
- **📱 Responsive Design** - Looks perfect on all screen sizes
- **⚡ Performance** - Lightweight, fast loading, no dependencies
- **🎯 Typography** - Clear and readable fonts with text-shadow

## 🎭 Visual Components

### Navigation
- Logo with red neon gradient
- Navigation menu with hover effect
- Smooth scroll to sections

### Hero Section
- Large heading with text shadow
- Informative description
- CTA button with hover animation
- Timeline indicator

### Footer Info
- Instagram handle
- Design credits
- Timestamp

### Visual Effects
- Fullscreen background image
- Glass morphism overlay
- Background glow effects
- Parallax animation
- Smooth transitions

## 🚀 Getting Started

### 1. Clone or Download
```bash
git clone https://github.com/syfaarizal/cherry-blossom-landing-page.git
cd tech-studio-landing
```

### 2. Open File
Simply open the `index.html` file in your favorite browser. No installation or build process needed!

```bash
# Or use a live server
python -m http.server 8000
# Open http://localhost:8000
```

### 3. Customize
Edit the HTML file to change content, colors, or replace the background image as needed.

## 📁 File Structure

```
tech-studio-landing/
│
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    ├──js/
    │  └── index.js
    └── img/
```

## 🎨 Customization

### Change Theme Colors
Find and replace these color codes in the CSS:
```css
/* Primary colors */
#ff3250  /* Main neon red */
#ff1744  /* Secondary neon red */

/* Background */
rgba(10, 5, 10, 0.85)  /* Dark overlay */
```

### Change Background Image
Edit the `<img>` tag inside `.bg-wrapper`:
```html
<img src="./assets/img/KaiShiPose0.6.png" alt="Tech Background" class="bg-image">
```

### Change Content
Edit these sections to change the text:
```html
<h1>Tech<br>Studio.</h1>
<p class="description">Your description here</p>
```

## 🛠️ Technologies Used

- **HTML5** - Structure and markup
- **CSS3** - Styling with modern features:
  - Flexbox for layout
  - CSS Grid (optional)
  - Backdrop Filter for blur effect
  - Linear Gradients
  - Text Shadows
  - Transitions & Animations
- **JavaScript (Vanilla)** - Interactivity:
  - Smooth scroll
  - Parallax effect
  - Click animations
  - Event listeners

## 📱 Browser Support

| Browser | Support |
|---------|---------|
| Chrome  | ✅ Latest |
| Firefox | ✅ Latest |
| Safari  | ✅ Latest |
| Edge    | ✅ Latest |
| Opera   | ✅ Latest |

**Note:** Backdrop-filter may not be supported in older browsers.

## 🎯 JavaScript Features

### Smooth Scroll
```javascript
// Smooth navigation to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        // ... smooth scroll logic
    });
});
```

### Parallax Effect
```javascript
// Parallax effect following mouse movement
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    // ... parallax logic
});
```

### Button Animation
```javascript
// Click animation on button
document.querySelector('.cta-button').addEventListener('click', function() {
    this.style.transform = 'scale(0.95)';
    // ... animation logic
});
```

## 🎨 Design Tips

1. **Background Image**: Use high-quality images (minimum 1920x1080px)
2. **Contrast**: Ensure text remains readable with the background used
3. **Loading Speed**: Compress images for faster loading
4. **Accessibility**: Use alt text on images
5. **Mobile First**: Test on various screen sizes

## 📝 Changelog

### Version 1.0.0 (2024-12-11)
- ✨ Initial release
- 🎨 Glass morphism design
- 💫 Parallax animations
- 📱 Responsive layout
- 🎯 Interactive elements

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork this project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Syifa**
- GitHub: [@syfarizal](https://github.com/syfaarizal)
- Instagram: [@syfaarizal](https://instagram.com/syfaarizal)

## 🙏 Credits & Inspiration

- Background image concept from gaming/tech workspace setup
- Color scheme inspired by cyberpunk aesthetics
- Typography and layout inspired by modern landing pages

## 📞 Support

If you have any questions or need help:
- 📧 Email: syifairgi@gmail.com
- 💬 Instagram: @syfaarizal
- 🐛 Issues: [GitHub Issues](https://github.com/syfarizal/cherry-blossom-landing-page/issues)

---

⭐ Don't forget to give this project a star if you found it helpful!

**Made with ❤️ and ☕**