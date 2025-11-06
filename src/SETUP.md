# Portfolio Setup Guide

## Fixed Issues ✅

1. **DOM Nesting Error** - Fixed `<motion.div>` inside `<p>` tag in Footer component
2. **Theme Provider** - Updated Sonner component to use our custom ThemeProvider instead of next-themes

## Installation Steps

### 1. Install Required Dependencies

```bash
npm install lucide-react motion sonner@2.0.3
```

**What each package does:**
- `lucide-react` - Icon library (Github, Mail, Phone, etc.)
- `motion` - Animation library (formerly Framer Motion)
- `sonner@2.0.3` - Toast notifications for the contact form

### 2. Run the Development Server

```bash
npm run dev
```

The portfolio should now load at `http://localhost:3000` (or your configured port).

## Project Structure

```
├── App.tsx                          # Main app component
├── components/
│   ├── About.tsx                    # About section with animations
│   ├── Contact.tsx                  # Contact form with glassmorphism
│   ├── Footer.tsx                   # Footer with social links
│   ├── Header.tsx                   # Navbar with dark mode toggle
│   ├── Hero.tsx                     # Hero section with 3D card
│   ├── ParticleBackground.tsx       # Animated particle effects
│   ├── Projects.tsx                 # Project showcase
│   ├── Skills.tsx                   # Skills with progress bars
│   ├── ThemeProvider.tsx            # Dark mode management
│   └── ui/                          # shadcn/ui components
└── styles/
    └── globals.css                  # Global styles & Tailwind config
```

## Features

✨ **Design Features:**
- Glassmorphism effects throughout
- 3D transforms and depth
- Asymmetric layouts
- Geometric patterns and animated shapes
- Gradient borders and backgrounds
- Modern rounded corners
- Particle animations

🎨 **Sections:**
- Hero with animated stats card
- About with mission cards
- Skills with progress bars & language icons
- Projects with masonry layout
- Contact form with glassmorphism
- Footer with social links

🌙 **Dark Mode:**
- Toggle in header
- Persistent theme (localStorage)
- Smooth transitions

⚡ **Animations:**
- Framer Motion powered
- Hover effects
- Scroll animations
- Floating particles
- Rotating icons
- Pulsing glows

## Customization

### Change Your Info

Edit these files:
- **Name & Title**: `/components/Hero.tsx` (lines 49-65)
- **About Text**: `/components/About.tsx` (lines 79-82)
- **Contact Info**: `/components/Contact.tsx` (lines 16-28)
- **Social Links**: `/components/Footer.tsx` (lines 7-12)

### Change Colors

Main gradient colors used:
- Primary: `from-red-600 via-purple-600 to-pink-600`
- To change, search and replace throughout files

### Add More Projects

Edit `/components/Projects.tsx` and add to the `projects` array (lines 9-42)

### Add More Skills

Edit `/components/Skills.tsx`:
- Skill categories (lines 9-33)
- Languages (lines 35-44)

## Troubleshooting

### If nothing shows up:
1. Check console for errors
2. Make sure all dependencies are installed
3. Clear browser cache
4. Restart dev server

### If styles look broken:
1. Check `styles/globals.css` is loaded
2. Verify Tailwind CSS is working
3. Check for CSS conflicts

### If animations don't work:
1. Verify `motion` is installed correctly
2. Check browser console for Motion errors
3. Try: `npm install motion --force`

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

**Note:** Some animations work best in Chrome due to better CSS support.

## Performance Tips

- Images are lazy-loaded via `ImageWithFallback`
- Animations use `will-change` for GPU acceleration
- Scroll animations only trigger once with `viewport={{ once: true }}`

## Need Help?

Common issues:
- **Blank page**: Check console for import errors
- **No animations**: Verify motion is installed
- **Toast not working**: Check sonner@2.0.3 is installed
- **Dark mode not working**: Check ThemeProvider in App.tsx

---

**Built with:**
- React + TypeScript
- Tailwind CSS v4.0
- Motion (Framer Motion)
- shadcn/ui components
- Lucide React icons

Enjoy your new portfolio! 🚀
