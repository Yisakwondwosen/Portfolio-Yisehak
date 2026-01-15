# 🚀 Quick Start Guide

## ⚡ Get Running in 3 Steps

### 1️⃣ Install Node.js (if needed)

Check if you have Node.js installed:
```bash
node --version
```

If you see a version number (v18+), skip to Step 2.

**If not installed:**
- **macOS**: Download from https://nodejs.org/ or run `brew install node`
- **Windows**: Download from https://nodejs.org/
- **Linux**: Run `sudo apt install nodejs npm` (Ubuntu/Debian)

### 2️⃣ Install Dependencies

```bash
npm install
```

This will take 1-2 minutes to download all required packages.

### 3️⃣ Set Your API Key & Run

1. Open `.env.local` file
2. Replace `your_api_key_here` with your Gemini API key
   - Get one free at: https://aistudio.google.com/app/apikey

3. Start the app:
```bash
npm run dev
```

4. Open your browser to: **http://localhost:3000**

## 🎉 That's It!

You should now see your portfolio running with:
- ✅ Newspaper-themed design
- ✅ Dark/Light mode toggle
- ✅ AI-powered press desk
- ✅ Responsive layout
- ✅ Smooth animations

## 🔥 Next Steps

1. **Customize Content**: Edit `constants.tsx` to add your own:
   - Name and bio
   - Projects
   - Events
   - Social links

2. **Update Contact Info**: Change email/phone in the "Letter to Editor" section

3. **Add Your Photo**: Replace the placeholder image URL in `App.tsx` (line 281)

## ❓ Having Issues?

**Port already in use?**
```bash
# Kill the process on port 3000
lsof -ti:3000 | xargs kill -9
```

**Dependencies not installing?**
```bash
# Clear cache and try again
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**AI not working?**
- Check your API key in `.env.local`
- Make sure there are no extra spaces
- Restart the dev server after changing `.env.local`

---

**Need more details?** See [SETUP.md](./SETUP.md) for comprehensive documentation.
