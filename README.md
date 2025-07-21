# Job Portal Dashboard

A modern job portal dashboard built with **React.js (Vite)** and **Tailwind CSS** for the frontend, and **FastAPI** with **SQLite** for the backend (optional). The app allows users to browse jobs, view details, and apply.

---

## 🛠 Tech Stack

### Frontend
- **React.js** (with [Vite](https://vitejs.dev/))
- **Tailwind CSS** for utility-first styling
- **Lucide Icons** for modern SVG icons

### Backend (Optional)
- **FastAPI** – Python web framework
- **SQLite** – Lightweight database

---

## 📁 Project Structure

```bash
├── public/              # Static files (company logos)
├── src/
│   ├── components/      # React components (JobCard, JobGrid, etc.)
│   ├── types/           # TypeScript interfaces (Job type)
│   ├── App.tsx          # Main app
│   └── main.tsx         # Entry point
├── backend/             # FastAPI app (if backend is enabled)
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
