# 🎨 Customization Guide

## Quick Customization Checklist

### 1. Personal Information (constants.tsx)

**Location**: `/constants.tsx` lines 19-25

```typescript
export const PERSONAL_INFO = {
  name: "Your Name Here",
  role: "Your Title | Your Company",
  bio: `Your compelling biography here...
  
  Second paragraph with more details...`,
};
```

**What to change:**
- Replace "Yishak Wendosen" with your name
- Update role/title
- Write your own biography (2-3 paragraphs recommended)

---

### 2. Projects (constants.tsx)

**Location**: `/constants.tsx` lines 27-46

```typescript
export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Your Project Name",
    description: "Brief description of your project",
    icon: <Briefcase className="w-6 h-6" />,
  },
  // Add more projects...
];
```

**Available icons** (import from lucide-react):
- `Briefcase` - Business/work projects
- `Code` - Development projects
- `Layers` - Multi-layered projects
- `Globe` - International/web projects
- `Rocket` - Startups/launches
- `Heart` - Passion projects
- `Zap` - Fast/innovative projects

**How to add more projects:**
1. Copy an existing project object
2. Change the `id` to a unique number
3. Update title and description
4. Choose an appropriate icon

---

### 3. Events/Talks (constants.tsx)

**Location**: `/constants.tsx` lines 48-67

```typescript
export const EVENTS: EventTalk[] = [
  {
    id: "1",
    title: "Event Name",
    image: "https://images.unsplash.com/photo-...",
    category: "Category"
  },
];
```

**Finding good images:**
- Use Unsplash: https://unsplash.com/
- Search for: "conference", "presentation", "team meeting", "workshop"
- Copy the image URL (add `?q=80&w=1000&auto=format&fit=crop`)

**Categories:**
- "Conference"
- "Workshop"
- "Talk"
- "Partnership"
- "Accelerator"
- "Award"

---

### 4. Social Links (constants.tsx)

**Location**: `/constants.tsx` lines 69-75

```typescript
export const SOCIAL_LINKS: SocialLink[] = [
  { name: "LinkedIn", url: "https://linkedin.com/in/yourprofile", icon: <Linkedin className="w-5 h-5" /> },
  { name: "Github", url: "https://github.com/yourusername", icon: <Github className="w-5 h-5" /> },
  // Add more...
];
```

**Update these URLs** with your actual profiles!

**Available social icons:**
- LinkedIn
- Github
- Twitter
- Mail
- Phone
- Send (Telegram)
- Instagram
- Facebook
- Youtube

---

### 5. Profile Photo (App.tsx)

**Location**: `/App.tsx` line 281

```typescript
<img 
  src="YOUR_IMAGE_URL_HERE"
  alt={PERSONAL_INFO.name}
  className="w-full h-[550px] md:h-[700px] object-cover grayscale transition-all duration-1000 group-hover:grayscale-0"
/>
```

**Options for your photo:**
1. **Use Unsplash** (temporary):
   - Find a professional photo
   - Copy the URL
   
2. **Host your own** (recommended):
   - Add image to `/public` folder
   - Use: `src="/your-photo.jpg"`
   
3. **Use a CDN**:
   - Upload to Imgur, Cloudinary, etc.
   - Use the direct image URL

---

### 6. Contact Information (App.tsx)

**Email** - Location: `/App.tsx` line 495

```typescript
<a href="mailto:your@email.com" className="...">your@email.com</a>
```

**Phone** - Location: `/App.tsx` line 506

```typescript
<a href="tel:+1234567890" className="...">+1 234 567 890</a>
```

**Location** - Location: `/App.tsx` line 517

```typescript
<p className="text-xl md:text-2xl font-bold">Your City, Country</p>
```

---

### 7. Color Scheme (App.tsx)

The app uses a black/white theme, but you can customize:

**Background colors:**
- Light mode: `bg-[#fafafa]` (off-white)
- Dark mode: `bg-[#0a0a0a]` (near-black)

**To change to a different color:**

Find and replace in `App.tsx`:
- `bg-[#fafafa]` → `bg-[#yourcolor]`
- `bg-[#0a0a0a]` → `bg-[#yourcolor]`

**Popular alternatives:**
- Cream: `bg-[#f5f5dc]`
- Navy: `bg-[#001f3f]`
- Charcoal: `bg-[#2c2c2c]`

---

### 8. Typography

**Headline Font** (currently Playfair Display):

Location: `/index.html` line 11

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@700;900&display=swap" rel="stylesheet">
```

Then update CSS in `/index.html` line 18:
```css
.serif {
    font-family: 'YourFont', serif;
}
```

**Popular serif alternatives:**
- Merriweather
- Lora
- Crimson Text
- EB Garamond

**Body Font** (currently Inter):

Same process, but update line 14 in `index.html`

**Popular sans-serif alternatives:**
- Roboto
- Open Sans
- Poppins
- Montserrat

---

### 9. Masthead Title (App.tsx)

**Location**: `/App.tsx` lines 166-168

```typescript
<a href="#" className="...">
  The {firstName} <span className="not-italic">{lastName}</span>
</a>
```

**Customization ideas:**
- "The [YourName] Chronicle"
- "The [YourName] Times"
- "The [YourName] Post"
- "[YourName] Daily"

---

### 10. Section Titles

You can rename any section by finding and replacing:

| Current | Location | Change to |
|---------|----------|-----------|
| "The Chronicle" | Multiple places | "My Story", "About Me" |
| "Feature Archives" | App.tsx line 408 | "My Work", "Portfolio" |
| "Press Desk" | App.tsx line 344 | "Ask Me Anything", "AI Assistant" |
| "Global Correspondences" | App.tsx line 437 | "Speaking", "Events" |
| "Letter to Editor" | App.tsx line 474 | "Get in Touch", "Contact" |

---

## 🎨 Advanced Customization

### Add a New Section

1. **Create the section** in `App.tsx` inside the `<main>` tag:

```typescript
<section id="newsection" className="space-y-32">
  <SectionHeader title="New Section" />
  <div>
    {/* Your content here */}
  </div>
</section>
```

2. **Add navigation link** in the nav menu (line 176):

```typescript
{ label: 'New Section', id: 'newsection' }
```

3. **Add to mobile menu** (line 218):

```typescript
{ label: 'New Section', id: 'newsection' }
```

4. **Add to footer** (line 578):

```typescript
{ label: 'New Section', id: 'newsection' }
```

---

### Change Animation Speed

Find transition classes and modify:
- `transition-all` → controls what animates
- `duration-500` → animation length (in ms)
- `hover:scale-110` → hover effect intensity

---

### Disable Dark Mode

If you only want light mode:

1. Remove the theme toggle button (lines 193-199)
2. Remove dark mode classes (all `dark:` prefixes)
3. Set a fixed background color

---

## 📝 Content Writing Tips

### Biography
- Start with a hook (interesting fact or achievement)
- Keep it conversational but professional
- 2-3 paragraphs max
- Include your mission/vision

### Project Descriptions
- Lead with the problem you solved
- Keep it to 1-2 sentences
- Focus on impact, not technical details
- Use active voice

### AI Press Desk Prompt
Location: `/App.tsx` lines 82-99

Customize the AI's personality and knowledge by editing the prompt:
- Add more context about your work
- Change the tone (formal, casual, technical)
- Add specific talking points

---

## 🚀 Quick Wins

### 1. Update Everything in 10 Minutes
1. Edit `constants.tsx` (5 min)
2. Update contact info in `App.tsx` (2 min)
3. Change photo URL (1 min)
4. Set API key in `.env.local` (1 min)
5. Test: `npm run dev` (1 min)

### 2. Make It Yours
- Choose 3-5 of your best projects
- Write a compelling bio
- Get a professional photo
- Add real social links

### 3. Polish
- Test on mobile
- Check all links work
- Proofread all text
- Test the AI press desk

---

## 🎯 Before You Deploy

- [ ] All personal info updated
- [ ] Real photo added
- [ ] Contact details correct
- [ ] Social links working
- [ ] Projects are your actual work
- [ ] Bio is proofread
- [ ] Tested on mobile
- [ ] AI press desk working
- [ ] No placeholder text remaining
- [ ] All images loading

---

**Need help?** Check the console for errors or refer to `SETUP.md` for troubleshooting!
