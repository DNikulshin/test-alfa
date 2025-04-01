import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router";
import ListPage from "./pages/ListPage";
import CreatePage from "./pages/CreatePage";
import DetailPage from "./pages/DetailPage";

const App = () => {
  return (
    <Router basename="/test-alfa">
      <Routes>
        <Route path="/" element={<Navigate to="/products"/> } />
        <Route path="/products" element={<ListPage />} />
        <Route path="/create-product" element={<CreatePage />} />
        <Route path="/products/:id" element={<DetailPage />} />
        <Route />
        <Route path="*" element={<Navigate to="/products"/> } />
      </Routes>
    </Router>
  );
};

export default App;
