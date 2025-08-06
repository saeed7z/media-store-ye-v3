# SMM Panel - Arabic Social Media Marketing Platform

## Overview

This is a comprehensive Arabic SMM (Social Media Marketing) panel website that serves as a digital storefront for social media marketing services. The platform enables users to purchase followers, likes, views, and engagement services across various social media platforms including Instagram, TikTok, YouTube, and Twitter. The website is designed with full Arabic language support (RTL layout) and uses a white and sky blue color scheme to provide a clean, professional appearance.

## User Preferences

Preferred communication style: Simple, everyday language in Arabic.

## System Architecture

### Frontend Architecture
- **Technology Stack**: Pure HTML5, CSS3, and vanilla JavaScript (no backend dependencies)
- **UI Framework**: Bootstrap 5 with RTL support for responsive design
- **Language Support**: Full Arabic localization with right-to-left (RTL) layout
- **Color Scheme**: White and sky blue theme with CSS custom properties for consistent branding
- **Responsive Design**: Mobile-first approach using Bootstrap grid system

### Page Structure
The application follows a multi-page structure with the following key pages:
- **Homepage** (`index.html`): Welcome page with service overview and featured packages
- **Services** (`pages/services.html`): Categorized service listings with pricing
- **Order Management** (`pages/order.html`): Service ordering form with platform selection
- **Order Tracking** (`pages/track.html`): Order status checking interface
- **User Authentication**: Login (`pages/login.html`) and registration (`pages/register.html`)
- **User Dashboard** (`pages/dashboard.html`): Personal order history and account management
- **Static Pages**: About us (`pages/about.html`) and contact (`pages/contact.html`)

### State Management
- **Client-Side Storage**: Uses localStorage for persistent data storage including cart items, user authentication, and selected services
- **Cart System**: Shopping cart functionality with add/remove items and total calculation
- **User Session**: Simple authentication state management using localStorage

### Component Organization
- **CSS Architecture**: Modular CSS with separate files for main styles (`css/style.css`) and RTL-specific adjustments (`css/rtl.css`)
- **JavaScript Modules**: Functionality split across specialized files:
  - `js/main.js`: Core application initialization and utilities
  - `js/services.js`: Service data management and display logic
  - `js/cart.js`: Shopping cart and order management
  - `js/currency.js`: Multi-currency conversion and price formatting (YER, SAR, USD)
  - `js/payment.js`: Payment method selection and form handling

### Data Structure
- **Services Data**: Hard-coded service catalog with structured data including pricing, delivery times, and features
- **Platform Support**: Instagram, TikTok, YouTube, Twitter, and other social media platforms
- **Service Types**: Followers, likes, views, comments, and engagement services with different quality tiers

### Form Handling
- **Order Processing**: Client-side form validation and order creation with local storage
- **User Registration**: Account creation with form validation (stored locally)
- **Contact Forms**: Simple contact and inquiry forms

## External Dependencies

### CDN Resources
- **Bootstrap 5.3.0**: RTL-enabled CSS framework from jsDelivr CDN for responsive UI components
- **Font Awesome 6.0.0**: Icon library from Cloudflare CDN for consistent iconography throughout the interface

### Third-Party Integrations
- **Social Media Platforms**: The service catalog targets major social media platforms (Instagram, TikTok, YouTube, Twitter) but operates independently without direct API integrations
- **Communication Channels**: Placeholder integrations for WhatsApp, Telegram, and Instagram for customer support

### Browser APIs
- **Local Storage**: For persistent client-side data storage of user sessions, cart items, and preferences
- **DOM APIs**: Standard browser APIs for dynamic content manipulation and form handling

Note: This is a frontend-only application with no backend infrastructure. All data is managed client-side using localStorage, and the service catalog uses static data structures defined in JavaScript files.

## Recent Enhancements (January 2025)

### Legal Pages & Compliance
- Added comprehensive Terms of Use page (`pages/terms.html`) in Arabic
- Added Privacy Policy page (`pages/privacy.html`) in Arabic  
- Updated all page footers with proper copyright notice
- Linked legal pages in navigation and footer menus

### Multi-Currency System
- Implemented dynamic currency conversion between Yemeni Rial (YER), Saudi Riyal (SAR), and US Dollar (USD)
- Added currency selector to order form and services display
- Real-time price conversion using base rates: YER (250:1), SAR (3.75:1), USD (1:1)
- Created `js/currency.js` module for currency management

### Enhanced Payment Methods
- Integrated multiple payment options in order flow:
  - Credit/debit card forms with validation (Visa, MasterCard)
  - PayPal integration setup for future backend connection
  - Local Yemeni bank transfer options (Al-Qutibi, Al-Kuraimi, Al-Omqi, Al-Shabakat)
- Added payment receipt upload functionality with image preview
- Created `js/payment.js` module for payment form management

### User Experience Improvements
- Enhanced order form layout with 3-column design (currency, quantity, total price)
- Added currency symbols and proper RTL text alignment
- Improved form validation and user feedback messages
- Better visual organization of payment methods with collapsible sections