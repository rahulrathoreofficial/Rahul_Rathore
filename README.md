# Rahul Rathore Portfolio — Production Ready

## 📁 Folder Structure

```
portfolio/
├── index.html          ← Main website file
├── images/
│   ├── rahul-bw.jpg    ← Black & white portrait (About section)
│   └── rahul-color.jpg ← Color campus photo (About section)
└── assets/
    └── Rahul_Rathore_CV.pdf  ← Your CV/Resume PDF (add this!)
```

## ⚡ Quick Start

1. **Upload everything** to your web host (GitHub Pages, Netlify, Vercel, etc.)
2. **Replace placeholder links** in `index.html` (search for `TODO` or `YOUR_`)
3. **Add your CV PDF** to `assets/Rahul_Rathore_CV.pdf`
4. **Done!**

## 🔗 Links to Update

Open `index.html` and find/replace these placeholders:

| Placeholder | What to Replace With |
|-------------|---------------------|
| `YOUR_LINKEDIN_USERNAME` | Your LinkedIn profile URL |
| `YOUR_GITHUB_USERNAME` | Your GitHub profile URL |
| `YOUR_X_USERNAME` | Your Twitter/X handle |
| `your.email@example.com` | Your email address |
| `https://rahulrathore.dev` | Your actual domain |
| `#` (demoLink/codeLink) | Real project URLs |

## 📝 Blog Articles

The blog section has 3 placeholder articles. To make them clickable:
- Replace `Read Article` spans with `<a href="your-article-url">` links
- Or remove the blog section entirely if you don't need it

## 🎨 Themes

- **Mono** (default): Dark, minimalist, white accent
- **Mint**: Light, fresh, green accent
- Toggle via the button in the top-right nav
- Theme preference is saved in browser localStorage

## 🖼️ Images

- Both photos are already optimized and placed
- The B&W photo has a grayscale→color hover effect
- The color photo has a caption overlay
- To swap photos, just replace the files in `/images/` with the same filenames

## 📱 Deployment Options

### GitHub Pages (Free)
1. Create a repo named `yourusername.github.io`
2. Upload these files to the repo
3. Your site goes live at `https://yourusername.github.io`

### Netlify (Free, Custom Domain)
1. Drag & drop this folder to [netlify.com](https://netlify.com)
2. Connect your custom domain in Settings

### Vercel (Free)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in this folder
3. Follow prompts

## 🐛 Known Issues / Notes

- The contact form is frontend-only (shows a success message but doesn't actually send email)
- To make it functional, connect to: Formspree, EmailJS, or a backend
- Custom cursor is hidden on mobile (touch devices)
- All animations respect `prefers-reduced-motion` — accessible by default

## 📧 Contact Form Setup (Optional)

### Option A: Formspree (Easiest)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form, get your endpoint URL
3. In `index.html`, find `<form class="contact-form" id="contactForm">`
4. Change it to: `<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">`
5. Remove the JavaScript form handler

### Option B: EmailJS
1. Sign up at [emailjs.com](https://emailjs.com)
2. Add their SDK script to `<head>`
3. Replace the form submit handler with EmailJS send function

---

Built with ♥ by Rahul Rathore
