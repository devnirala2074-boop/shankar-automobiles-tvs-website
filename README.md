# SHANKAR AUTOMOBILES – PREMIUM TVS DEALERSHIP WEBSITE

A customer-facing, high-performance web experience for **Shankar Automobiles**, an authorized TVS Motor two-wheeler dealership located in Sitapur, Surguja, Chhattisgarh, India.

---

## 📌 Verified Business Profile

- **Dealership Name:** Shankar Automobiles (Shankar Auto Mobiles)
- **Brand:** TVS Motor Company
- **Category:** Two-Wheeler Sales, Certified Service & Genuine Spares
- **Positioning:** Authorized TVS Dealer – Sitapur, Surguja
- **Tagline:** *"Your Trusted TVS Two-Wheeler Destination"*
- **Location:** NH-43, Ward No. 15, Mulazimpara, In front of Central Bank of India, Sitapur, Surguja, Chhattisgarh — 497111
- **Instagram:** [instagram.com/shankarautomobiles_](https://www.instagram.com/shankarautomobiles_/)
- **Justdial Listing:** [Justdial Verified Dealership Profile](https://www.justdial.com/Surguja/Shankar-Auto-Mobiles-Sitapur/9999P7774-7774-131228235826-F4D3_BZDET)

---

## 🚀 Key Project Principles

1. **Customer-Facing Architecture Only:**
   - ❌ NO Admin Dashboard or Login
   - ❌ NO User Authentication
   - ❌ NO Unnecessary Backend or Database
   - ✅ Seamless WhatsApp-powered direct conversion for all customer enquiries and bookings
2. **Data Integrity & Honesty:**
   - Sourced from verified TVS Motor official data and local Sitapur listing
   - Clear disclosures separating official TVS catalogue figures from live showroom inventory
   - Transparent ex-showroom vs. on-road pricing notes (RTO, road tax, and insurance)
   - Centralized configuration in `src/data/dealership.js` for instant updates

---

## 🛠️ Technology Stack

- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS (Modern TVS Racing Red, Obsidian & Charcoal Dark Automotive Palette)
- **Routing:** React Router DOM (v7)
- **Icons:** Lucide React + custom automotive SVG icons
- **SEO & Structured Data:** Semantic HTML5, Open Graph, Twitter Cards, `sitemap.xml`, `robots.txt`, and Schema.org `AutoDealer` JSON-LD
- **Deployment Target:** Vercel (Configured with `vercel.json` SPA rewrite rules)

---

## 📂 Website Architecture & Pages

| Route | Page | Description |
| :--- | :--- | :--- |
| `/` | **Home** | Cinematic Hero banner, Category filter, Featured TVS lineup, Advantage pillars, Offers preview, Google Maps snippet, and dual CTAs. |
| `/vehicles` | **Catalogue** | Complete interactive catalogue with category filters (Motorcycles, Scooters, Electric EV, Utility), search bar, and spec cards. |
| `/vehicles/:slug` | **Vehicle Details** | High-res image gallery, colorway visualizer, quick highlights, full specs table, related models, and WhatsApp quote / test ride buttons. |
| `/offers` | **Offers & Finance** | Verified TVS finance schemes (TVS Credit, HDFC, SBI), low down payment assistance, exchange evaluation, and EMI calculator request. |
| `/services` | **Services & Spares** | Authorized TVS periodic maintenance, TVS TRU4 oil, EV battery checkups, and instant appointment request via WhatsApp. |
| `/about` | **About Dealership** | Dealership location on NH-43 Sitapur, showroom experience, TVS racing heritage, operating standards, and comprehensive FAQs. |
| `/gallery` | **Gallery** | Responsive photo gallery with category filter (Showroom, Motorcycles, Scooters, EV, Deliveries) and full-screen lightbox modal. |
| `/contact` | **Contact Us** | Full physical address, operating hours, interactive WhatsApp inquiry form, test ride trigger, and responsive embedded Google Map. |
| `*` | **404 Not Found** | Sleek racing-themed page not found screen with return routes. |

---

## ⚡ Direct Customer Interaction Features

- **Direct WhatsApp Integration:** Pre-fills structured messages for all vehicles, test rides, financing, and service appointments with clean digits formatting.
- **Test Ride Request Modal:** Validates customer name, phone number, vehicle selection, and preferred date before launching WhatsApp.
- **On-Road Price Enquiry Modal:** Captures variant preference and down payment considerations.
- **Service Appointment Modal:** Allows customers to specify maintenance needs, vehicle model, and schedule.
- **Floating WhatsApp Button:** Fixed at bottom-right with tooltip and notification badge for maximum conversion.
- **Google Maps Navigation:** One-tap "Get Directions" linking directly to the verified Sitapur coordinates on NH-43.

---

## ⚙️ How to Configure Contact Information

Dealership phone numbers, WhatsApp lines, operating hours, and social media handles can be updated in a single file:

```javascript
// File: src/data/dealership.js
export const DEALERSHIP = {
  name: "Shankar Automobiles",
  contact: {
    phoneDisplay: "+91 94060 00000",
    whatsappNumber: "919406000000", // Digits only for wa.me API
    timings: {
      hours: "9:30 AM – 7:30 PM",
      days: "Monday – Sunday",
    },
  },
  // ...
};
```

---

## 💻 Local Development

1. Clone or open the repository:
   ```bash
   cd e:\PROJECTS\shankar-automobiles-website
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```
5. Preview production build locally:
   ```bash
   npm run preview
   ```

---

## 🚀 Vercel Deployment

This project is fully prepared for zero-configuration Vercel deployment:

1. Push this repository to GitHub or GitLab.
2. In your [Vercel Dashboard](https://vercel.com), click **Add New Project** and select this repository.
3. Vercel automatically detects:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Deploy! The included `vercel.json` ensures all deep routes (`/vehicles/tvs-apache-rr-310`, `/offers`, `/contact`, etc.) work seamlessly without 404 errors.
