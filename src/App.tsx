import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/layout/ScrollToTop';
import {
    HomePage,
    AboutPage,
    ProductsPage,
    ProductDetailPage,
    SolutionsPage,
    ContactPage
} from './pages';

/**
 * Main App component with routing configuration
 */
function App() {
    return (
        <Router
            basename={import.meta.env.BASE_URL}
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true
            }}
        >
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:productId" element={<ProductDetailPage />} />
                <Route path="/solutions" element={<SolutionsPage />} />
                <Route path="/contact" element={<ContactPage />} />
            </Routes>
        </Router>
    );
}

export default App;
