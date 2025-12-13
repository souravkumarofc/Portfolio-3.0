# Portfolio 2.0 - React Version

A modern, responsive portfolio website built with React, showcasing projects, skills, and experience.

## Features

- ✨ Modern React architecture with component-based design
- 📱 Fully responsive design with mobile menu
- 🎨 Beautiful UI with Tailwind CSS
- 📧 Contact form integration with EmailJS
- 🚀 Smooth scrolling navigation
- ⚡ Optimized performance

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
Portfolio-2.0-main/
├── public/
│   ├── images/          # Image assets
│   ├── index.html       # HTML template
│   └── Sourav Kumar.pdf # Resume PDF
├── src/
│   ├── components/      # React components
│   │   ├── Header.js
│   │   ├── Hero.js
│   │   ├── About.js
│   │   ├── Education.js
│   │   ├── Experience.js
│   │   ├── Projects.js
│   │   ├── Skills.js
│   │   ├── Expertise.js
│   │   ├── Contact.js
│   │   └── Footer.js
│   ├── hooks/           # Custom React hooks
│   │   ├── useScrollReveal.js
│   │   └── useSmoothScroll.js
│   ├── App.js           # Main app component
│   ├── App.css
│   ├── index.js         # Entry point
│   └── index.css        # Global styles
├── package.json
└── README.md
```

## Technologies Used

- React 18
- Tailwind CSS
- Font Awesome Icons
- EmailJS (for contact form)
- Google Fonts (Playfair Display, Inter)

## Customization

### Update Personal Information

Edit the following components to update your information:
- `src/components/Hero.js` - Hero section
- `src/components/About.js` - About section
- `src/components/Education.js` - Education details
- `src/components/Experience.js` - Work experience
- `src/components/Projects.js` - Project portfolio
- `src/components/Skills.js` - Technical skills
- `src/components/Contact.js` - Contact information

### EmailJS Configuration

The contact form uses EmailJS. To configure:
1. Update the service ID and template ID in `src/components/Contact.js`
2. Update the public key in the `useEffect` hook in `Contact.js`

## License

This project is open source and available under the MIT License.

