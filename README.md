# 🎨 Frontend Developer Test — My Project

Hey! 👋 This is my submission for the Frontend Developer Test. The goal here was simple:  
Take the provided Figma design and bring it to life using **Next.js with TypeScript**.

I built this project using **shadcn/ui** for the UI components and **Tailwind CSS** for styling (love the flexibility it gives!).  
For the charts, I decided to mix it up a bit — I used both **Chart.js** and **Recharts** to show different kinds of data visualizations.

---

## 📄 Project Description

This is a fully responsive web project where I carefully replicated the provided Figma design. It works smoothly across desktop and tablet screens. The app includes interactive elements like buttons and charts, all functional and neatly styled with Tailwind CSS + shadcn/ui components.

Charts were added using **Chart.js** for simple graphs and **Recharts** for more advanced and responsive ones.

---

## 🔗 Live Demo (Vercel)

[👉 Click here to see the live site on Vercel](https://noemdek-one.vercel.app/)

---

## 🛠️ Tech Stack

Here’s everything I used:

- **Next.js (with TypeScript)** – For the app framework and routing.
- **Tailwind CSS** – For styling and layout.
- **shadcn/ui** – Pre-built, accessible UI components based on Tailwind and Radix UI.
- **Chart.js** – For lightweight, simple charts.
- **Recharts** – For more advanced, interactive charts.
- **clsx** – To handle conditional class names easily.

---
## 📦 External Libraries & Tools
I used some external libraries/tools to make this project cleaner and more functional.  
| Library      Purpose                                    
|--------------------------------------------------------
| `next`        Framework for server-side rendering & routing 
| `typescript`  Static typing for safer development        
| `tailwindcss`  Utility-first CSS framework              
| `shadcn/ui`   UI components (built on Radix UI + Tailwind CSS) 
| `chart.js`    Lightweight charts                          
| `recharts`    Advanced, responsive charts                
| `clsx`        Utility for conditional classNames         

## 📐 My Assumptions & Design Decisions

- **Responsiveness:** Focused mainly on desktop and tablet views, since that was the requirement.
- I used **mock data** for the charts and some sections, as the main goal was layout & interactivity.
- For charts, I wanted to show flexibility, so I combined two libraries — each handles different scenarios well.
- Kept things simple with local state and hooks; no need for external state management here.
- I intentionally kept the design minimal and clean, closely following the Figma file’s spacing, colors, and typography.
- Styling is fully handled by **Tailwind CSS** 

---

## 🏃‍♂️ Run Locally

If you'd like to run this project on your machine:

```bash
# Clone the project
git clone https://github.com/mannycodes-j/noemdek
cd your-repo

# Install dependencies
npm install

# Start the dev server
npm run dev


