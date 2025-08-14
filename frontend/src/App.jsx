import Dashboard from "./pages/Dashboard";
import "./App.css";

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <h1 className="text-xl font-semibold">Income Tax Calculator (Old vs New)</h1>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">
        <Dashboard />
      </main>
      <footer className="text-center text-sm text-gray-500 py-6">
        Phase 3 • MERN + Minimal UI
      </footer>
    </div>
  );
}
