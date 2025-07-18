# PropertyHub - Modern Real Estate Sales Platform

A comprehensive property sales website with PropertyGuru-inspired design, featuring advanced property listings, ticket management system, Google Maps integration, and direct sales contact functionality.

## 🚀 Features

- **Modern PropertyGuru-Style UI**: Professional real estate design with blue-green gradient theme
- **Advanced Property Listings**: Interactive property cards with image carousels and detailed information
- **Jira-Style Ticket Management**: Complete issue tracking system for each property
- **Google Maps Integration**: Interactive maps with custom property markers
- **Photo Upload System**: Image attachments for tickets and comments
- **WhatsApp & Instagram Integration**: Direct sales contact functionality
- **Responsive Design**: Optimized for all devices and screen sizes
- **JSON Data Management**: Easy property and ticket data customization
- **Search & Filter System**: Advanced property search with multiple filters
- **Featured Properties**: Highlight premium listings

## 📋 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Quick Start

1. **Clone the repository**
```bash
git clone <repository-url>
cd propertyhub
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open browser**
Navigate to `http://localhost:5173`

## 🛠️ Customization Guide

### For Real Estate Agencies & Developers

This platform is designed to be easily customizable for different real estate businesses:

#### 1. Property Data Customization

Edit `src/data/properties.json` to add your properties:

```json
{
  "id": "unique-property-id",
  "title": "Property Name",
  "type": "Condominium|HDB|Landed|Shophouse",
  "price": 2500000,
  "bedrooms": 3,
  "bathrooms": 2,
  "sqft": 1400,
  "location": {
    "address": "Full Property Address",
    "lat": 1.3521,
    "lng": 103.8198
  },
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "description": "Detailed property description",
  "amenities": ["Swimming Pool", "Gym", "Security"],
  "status": "Available|Under Offer|Sold",
  "agent": "Agent Name",
  "agentPhone": "+65 9123 4567",
  "dateAdded": "2024-01-15",
  "featured": true,
  "propertyType": "Sale",
  "tenure": "Freehold|99-year Leasehold",
  "psf": 1786
}
```

#### 2. Contact Information Setup

Update contact details in `src/components/Contact.tsx`:

```typescript
// WhatsApp Configuration
const whatsappNumber = "6591234567"; // Your WhatsApp number
const defaultMessage = "Hello! I'm interested in your property listings.";

// Instagram Handle
const instagramHandle = "your_instagram_handle";

// Email Configuration
const contactEmail = "contact@yourcompany.com";

// Office Information
const officeAddress = "Your Office Address";
const workingHours = "Mon - Fri: 9:00 AM - 7:00 PM";
```

#### 3. Company Branding

**Logo and Company Name**: Update in `src/components/Header.tsx`
```typescript
<h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
  Your Company Name
</h1>
```

**Color Scheme**: Modify in `tailwind.config.js`
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        secondary: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        }
      }
    }
  }
}
```

#### 4. Google Maps Setup

1. **Get Google Maps API Key**:
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Maps JavaScript API
   - Create and restrict API key

2. **Add API key to HTML**:
   Update `index.html`:
   ```html
   <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>
   ```

3. **Configure Map Settings**:
   Edit `src/components/PropertyMap.tsx` for custom styling and behavior

#### 5. Agent Information

Update agent details in property data:
```json
{
  "agent": "Your Agent Name",
  "agentPhone": "+65 9123 4567"
}
```

### 🎨 Design Customization

#### PropertyGuru-Style Elements
- **Color Palette**: Blue (#2563eb) and Green (#16a34a) gradients
- **Typography**: Clean, professional fonts with proper hierarchy
- **Cards**: Elevated property cards with hover effects
- **Buttons**: Gradient buttons with smooth transitions
- **Icons**: Lucide React icons for consistency

#### Responsive Breakpoints
- **Mobile**: < 768px (Stack layout, touch-friendly)
- **Tablet**: 768px - 1024px (2-column grid)
- **Desktop**: > 1024px (3-column grid)

## 🎫 Ticket Management System

### Features
- **Property-Specific Tickets**: Each property has its own ticket system
- **Status Tracking**: Open, In Progress, Resolved, Closed
- **Priority Levels**: Low, Medium, High, Critical
- **Photo Attachments**: Upload images with comments
- **Real-time Updates**: Instant status and comment updates
- **Search & Filter**: Find tickets by status, priority, or content

### Usage for Property Management
1. **Create Tickets**: Report maintenance issues, viewing feedback, or administrative tasks
2. **Track Progress**: Monitor ticket status and resolution timeline
3. **Photo Documentation**: Attach before/after photos for maintenance work
4. **Team Collaboration**: Add comments and updates for team communication

### Ticket Workflow
```
Open → In Progress → Resolved → Closed
```

## 🗺️ Google Maps Integration

### Features
- **Custom Property Markers**: Distinctive markers for each property
- **Info Windows**: Property details popup on marker click
- **Featured Property Highlighting**: Special markers for featured listings
- **Interactive Navigation**: Click markers to view property details
- **Responsive Map**: Adapts to different screen sizes

### Setup Instructions
1. **Enable APIs**: Maps JavaScript API in Google Cloud Console
2. **Set Billing**: Required for production use
3. **Restrict API Key**: Limit usage to your domain
4. **Test Integration**: Verify markers and info windows work correctly

## 📱 Sales Contact Integration

### WhatsApp Integration
- **Direct Messaging**: Click-to-chat functionality
- **Pre-filled Messages**: Contextual messages based on property interest
- **Agent-Specific Numbers**: Each property can have different agent contacts

### Instagram Integration
- **Business Profile**: Link to company Instagram account
- **Property Showcases**: Direct users to visual property content
- **Brand Building**: Increase social media presence

### Implementation
```typescript
// WhatsApp Contact
const handleWhatsAppClick = (phone: string, propertyTitle?: string) => {
  const message = propertyTitle 
    ? `Hello! I'm interested in ${propertyTitle}. Could you provide more information?`
    : "Hello! I'm interested in your property listings.";
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
};

// Instagram Contact
const handleInstagramClick = () => {
  window.open('https://instagram.com/your_handle', '_blank');
};
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options

#### 1. Netlify (Recommended)
```bash
# Build the project
npm run build

# Deploy to Netlify
# Upload the 'dist' folder or connect GitHub repository
```

#### 2. Vercel
```bash
npm install -g vercel
vercel --prod
```

#### 3. Traditional Web Hosting
1. Run `npm run build`
2. Upload contents of `dist` folder to your web server
3. Configure server for SPA routing

### Environment Variables
Create `.env.production`:
```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_WHATSAPP_NUMBER=6591234567
VITE_INSTAGRAM_HANDLE=your_instagram_handle
VITE_CONTACT_EMAIL=contact@yourcompany.com
```

## 🔧 Development

### Project Structure
```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section with search
│   ├── PropertyCard.tsx # Property display cards
│   ├── PropertyMap.tsx  # Google Maps integration
│   ├── TicketCard.tsx   # Individual ticket display
│   ├── TicketManager.tsx # Ticket management system
│   ├── Contact.tsx      # Contact section
│   └── PropertiesSection.tsx # Property listings
├── data/               # JSON data files
│   ├── properties.json # Property listings data
│   └── tickets.json    # Ticket system data
├── hooks/              # Custom React hooks
│   └── useTickets.ts   # Ticket management logic
├── types/              # TypeScript definitions
│   └── index.ts        # Type definitions
└── App.tsx             # Main application component
```

### Adding New Features

#### New Property Types
1. Update `Property` interface in `src/types/index.ts`
2. Add new type options to filters and forms
3. Update property card display logic

#### Additional Ticket Fields
1. Extend `Ticket` interface with new fields
2. Update ticket creation and display forms
3. Modify filtering and search logic

#### Custom Map Styles
1. Edit map styles in `src/components/PropertyMap.tsx`
2. Customize marker icons and info windows
3. Add new map interaction features

## 📊 Analytics & Tracking

### Recommended Analytics
- **Google Analytics**: Track page views and user behavior
- **Property Views**: Monitor which properties get most attention
- **Contact Conversions**: Track WhatsApp and form submissions
- **Search Patterns**: Analyze popular search terms and filters

### Implementation
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔒 Security Considerations

- **API Key Security**: Restrict Google Maps API key to your domain
- **Contact Form Protection**: Implement spam protection (reCAPTCHA)
- **Image Upload Validation**: Validate file types and sizes
- **Data Privacy**: Comply with local privacy regulations
- **HTTPS**: Always use HTTPS in production

## 🚀 Performance Optimization

- **Image Optimization**: Use WebP format and lazy loading
- **Code Splitting**: Automatic bundle optimization with Vite
- **Caching**: Implement proper browser caching headers
- **CDN**: Use CDN for static assets
- **Minification**: Automatic CSS and JS minification

## 🐛 Troubleshooting

### Common Issues

**Google Maps not loading**:
- Check API key configuration
- Verify billing is enabled in Google Cloud
- Check browser console for errors
- Ensure API key has proper restrictions

**Images not displaying**:
- Verify image URLs are accessible
- Check CORS settings for external images
- Ensure proper image formats (JPG, PNG, WebP)

**WhatsApp links not working**:
- Verify phone number format (include country code)
- Test on mobile devices
- Check URL encoding for special characters

**Responsive layout issues**:
- Test on actual devices, not just browser resize
- Check Tailwind CSS classes
- Verify viewport meta tag in HTML

### Support Resources
- **Documentation**: This README file
- **Issue Tracking**: Use the ticket system for bug reports
- **Community**: Join real estate tech communities
- **Professional Support**: Contact development team

## 📄 License

This project is available for commercial use. Perfect for:
- Real estate agencies
- Property developers
- Property management companies
- Individual real estate agents
- Property investment firms

## 🤝 Contributing

We welcome contributions to improve the platform:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For technical support or customization requests:
- **Email**: contact@propertyhub.sg
- **WhatsApp**: +65 9123 4567
- **Instagram**: @propertyhub_sg

---

*This modern property sales platform combines cutting-edge technology with proven real estate practices. Perfect for agencies looking to provide exceptional digital experiences to their clients.*