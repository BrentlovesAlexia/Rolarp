# Roblox React + TSX + Tailwind Project

A React + TypeScript (`.tsx`), Tailwind CSS (`style.css`), and Three.js application designed to match Roblox UI layouts.

## Technical Architecture
- **Framework:** React 18 + TypeScript (`.tsx` components)
- **Styling:** Tailwind CSS + `src/style.css`
- **3D Engine:** `@react-three/fiber` & `@react-three/drei` (Three.js)
- **Icons:** `lucide-react`
- **Build Tool:** Vite (pre-configured for GitHub Pages)

## How to Run Locally
1. Extract the project files.
2. Open terminal in the project directory.
3. Run `npm install`
4. Run `npm run dev` to launch local server.

## Deploying to GitHub Pages
1. Push this repository to GitHub.
2. Run `npm run build` to generate the static `dist/` folder.
3. Set GitHub Pages source branch to `dist` (or use GitHub Actions).
