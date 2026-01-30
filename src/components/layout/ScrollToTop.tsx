import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component to ensure page scrolls to top on navigation headers
 */
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant' // Instant scroll is often better for full page transitions than smooth
        });
    }, [pathname]);

    return null;
};

export default ScrollToTop;
