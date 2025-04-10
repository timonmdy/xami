import { Route, BrowserRouter as Router, Routes } from "react-router";
import NotFoundPage from "./pages/lib/NotFoundPage";

export default function App() {

  return (
    <Router>
      <div className="flex min-h-screen max-w-screen bg-zinc-900 text-white">
        <>
          <div className={`flex flex-col w-full transition-all duration-300`}>
            <div className="flex-1 overflow-auto mt-16">
              <Routes>
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
          </div>
        </>
      </div>
    </Router>
  );
}
