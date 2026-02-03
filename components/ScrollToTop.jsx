import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant' // Use 'instant' for immediate jump, or 'smooth' if specific smooth scroll is preferred (usually instant is better for page loads)
        });
    }, [pathname]);

    return null;
};

export default ScrollToTop;
