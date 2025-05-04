import { Route, BrowserRouter as Router, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/lib/NotFoundPage";
import Navbar from "./custom/Navbar/Navbar";

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen max-w-screen bg-background text-text-primary">
        <Navbar /> 
        {/* Content Area */}
        <div className={`flex flex-col w-full transition-all duration-300`}>
          {/* Main Content */}
          <div className="flex-1 overflow-auto mt-16"> 
            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
        
      </div>
    </Router>
  );
}