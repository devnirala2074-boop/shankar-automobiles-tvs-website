import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function SEOHead({ 
  title = "Shankar Automobiles | Authorized TVS Dealer – Sitapur, Surguja",
  description = "Shankar Automobiles is the authorized TVS two-wheeler dealership in Sitapur, Surguja, Chhattisgarh. Explore Apache series, Raider 125, Jupiter, Ronin, and iQube EV. Book a test ride or get on-road price quotes.",
}) {
  const location = useLocation();

  useEffect(() => {
    document.title = title;
    
    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', description);

    const currentUrl = window.location.origin + location.pathname;

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', currentUrl);

    // Update Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    // Scroll window to top on route change
    window.scrollTo(0, 0);
  }, [title, description, location.pathname]);

  return null;
}
