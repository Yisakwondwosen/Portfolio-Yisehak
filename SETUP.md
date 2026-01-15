# The Yishak Gazette - Portfolio Setup Guide

## 🎯 Overview

A stunning newspaper-themed portfolio website built with React, TypeScript, and Vite. Features an AI-powered press desk using Google's Gemini API with grounding capabilities.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

3. **Gemini API Key**
   - Get your free API key from: https://aistudio.google.com/app/apikey

## 🚀 Installation Steps

### Step 1: Install Node.js (if not already installed)

**For macOS:**
```bash
# Using Homebrew (recommended)
brew install node

# Or download the installer from nodejs.org
```

**Verify installation:**
```bash
node --version  # Should show v18.x.x or higher
npm --version   # Should show 9.x.x or higher
```

### Step 2: Install Project Dependencies

Navigate to the project directory and install dependencies:

```bash
cd /Users/mabook/Downloads/yishak-gazette
npm install
```

This will install:
- React 18.3.1
- React DOM 18.3.1
- Lucide React (icons)
- Google GenAI SDK
- Vite (build tool)
- TypeScript
- All necessary type definitions

### Step 3: Configure Environment Variables

1. Open the `.env.local` file in the project root
2. Add your Gemini API key:

```env
GEMINI_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual Gemini API key.

### Step 4: Run the Development Server

```bash
npm run dev
```

The application will start on: **http://localhost:3000**

## 🎨 Features

### 1. **Newspaper-Themed Design**
- Classic broadsheet typography
- Vintage newspaper aesthetics
- Dark/Light mode toggle
- Responsive design for all devices

### 2. **AI Press Desk**
- Powered by Google Gemini 2.0 Flash with grounding
- Real-time web search integration
- Professional journalistic responses
- Source citations from verified web resources

### 3. **Sections**
- **The Chronicle**: Personal timeline and biography
- **Feature Archives**: Project portfolio
- **Press Desk**: AI-powered inquiry system
- **Global Correspondences**: Events and talks
- **Letter to Editor**: Contact form

### 4. **Interactive Elements**
- Animated ticker tape
- Hover effects and transitions
- Mobile-responsive navigation
- Smooth scrolling

## 📁 Project Structure

```
yishak-gazette/
├── App.tsx                 # Main application component
├── index.tsx              # React entry point
├── index.html             # HTML template
├── index.css              # Global styles
├── constants.tsx          # Data constants (projects, events, social links)
├── types.ts               # TypeScript type definitions
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies and scripts
├── .env.local            # Environment variables (API keys)
└── components/
    ├── SectionHeader.tsx  # Reusable section header
    ├── TimelineItem.tsx   # Timeline component
    └── CreativityCard.tsx # Project card component

```

## 🛠️ Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Customization

### Update Personal Information

Edit `constants.tsx` to customize:

1. **Personal Info**
   - Name
   - Role
   - Biography

2. **Projects**
   - Add/remove projects
   - Update descriptions
   - Change icons

3. **Events**
   - Update event images
   - Modify titles and categories

4. **Social Links**
   - Add/remove social media links
   - Update URLs

### Styling

- **Colors**: Modify Tailwind classes in components
- **Fonts**: Update Google Fonts in `index.html`
- **Typography**: Adjust font sizes and weights in components

## 🔧 Troubleshooting

### Issue: "Command not found: npm"
**Solution**: Install Node.js from https://nodejs.org/

### Issue: "Module not found" errors
**Solution**: Run `npm install` to install all dependencies

### Issue: AI Press Desk not working
**Solution**: 
1. Check that `GEMINI_API_KEY` is set in `.env.local`
2. Verify the API key is valid
3. Check browser console for errors

### Issue: Port 3000 already in use
**Solution**: 
- Kill the process using port 3000, or
- Change the port in `vite.config.ts`

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add `GEMINI_API_KEY` to environment variables
4. Deploy!

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Add environment variables in Netlify dashboard

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key for AI features | Yes |

## 🎨 Design Philosophy

This portfolio follows a **newspaper broadsheet aesthetic** inspired by classic publications like The New York Times and The Guardian. Key design principles:

- **Typography-first**: Bold, serif headlines with clean sans-serif body text
- **High contrast**: Black and white color scheme with subtle grays
- **Structured layout**: Grid-based design mimicking newspaper columns
- **Vintage touches**: Drop caps, decorative dividers, and classic ornaments
- **Modern interactions**: Smooth animations and hover effects

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Support

For issues or questions:
- Email: yishak@dotoit.com
- Check the browser console for error messages
- Ensure all dependencies are installed correctly

---

**Built with ❤️ using React, TypeScript, Vite, and Google Gemini AI**
