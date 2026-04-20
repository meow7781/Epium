# Epium

A React Native e-commerce app built with Expo Router featuring QR code scanning, product browsing, and user management.

## 🚀 Features

### Core Features
- **Authentication & Onboarding** - Secure user registration and login
- **Product Catalog** - Browse and view individual products
- **Shopping Bag** - Add/manage items in cart
- **Wishlist** - Save favorite items
- **Checkout** - Seamless payment experience
- **Order Management** - View order history and track status
- **User Accounts** - Profile and settings management
- **Admin Dashboard** - Manage users and orders

### 🔍 QR Code Scanner (NEW)
- **Real-time QR Scanning** - Scan QR codes with live camera view
- **Individual Scan Tracking** - Each scan tracked with:
  - Scanned data/URL
  - Timestamp
  - Unique scan ID
- **Scan History** - View all scanned QR codes
- **Individual Delete** - Remove specific scans
- **Expo Go Compatible** - Works directly with Expo Go app
- **Camera Permissions** - Auto-requests camera access

## 🛠 Tech Stack

- **Framework**: React Native with Expo
- **Routing**: Expo Router
- **State Management**: Zustand
- **UI Components**: React Native
- **Icons**: Expo Vector Icons
- **Maps**: React Native Maps
- **Storage**: Async Storage + Secure Store
- **Animations**: React Native Reanimated
- **Camera**: Expo Camera + Barcode Scanner

## 📱 Installation & Setup

### Prerequisites
- Node.js (v18+)
- Expo CLI: `npm install -g expo-cli`
- Expo account (free): https://expo.dev

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/meow7781/Epium.git
   cd epium-iOS/frontend_new
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

## 🎮 Running the App

### Development Mode (Expo Go)
```bash
npm start
```

Then:
- **iOS**: Scan the QR code with your iPhone Camera app → tap "Open with Expo Go"
- **Android**: Open Expo Go app → tap "Scan QR Code" → scan the terminal QR code

### Platform-Specific

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 📸 QR Code Scanner Usage

1. Launch the app
2. Tap **"SCAN QR CODE"** button on the home page
3. Allow camera permissions when prompted
4. Point camera at any QR code
5. Scan automatically detects and displays:
   - Scanned data/URL
   - Time of scan
   - Scan history below
6. View all scans in the history list
7. Delete individual scans or clear all

### Example QR Codes to Test
- Product URLs: `https://example.com/product/123`
- Links: `https://github.com/meow7781/Epium`
- Contact Info: `vCard` format

## 📁 Project Structure

```
frontend_new/
├── app/
│   ├── _layout.tsx           # Root layout
│   ├── index.tsx             # Home/landing page
│   ├── scan.tsx              # QR scanner screen ✨ NEW
│   ├── (tabs)/               # Tab navigation
│   ├── auth/                 # Authentication screens
│   ├── product/              # Product details
│   ├── checkout/             # Checkout flow
│   ├── orders/               # Order history
│   ├── admin/                # Admin screens
│   └── ...
├── components/
│   ├── QRScanner.tsx         # QR scanner component ✨ NEW
│   ├── Themed.tsx
│   └── ...
├── constants/
│   ├── theme.ts              # Colors & typography
│   └── Colors.ts
├── store/
│   └── appStore.ts           # Zustand state
└── assets/
    ├── images/
    └── fonts/
```

## 🔧 Configuration

### Camera Permissions (app.json)
The app includes proper camera permission handling:
```json
"permissions": ["camera"],
"plugins": [
  "expo-camera",
  "expo-barcode-scanner"
]
```

### Environment Variables
Create a `.env` file if needed for API endpoints:
```
EXPO_PUBLIC_API_URL=https://your-api.com
```

## 📚 Scripts

```bash
npm start      # Start dev server (all platforms)
npm run ios    # Build for iOS simulator
npm run android # Build for Android emulator
npm run web    # Run web version
```

## 🚀 Deployment

### Build for App Stores

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**
   ```bash
   eas login
   ```

3. **Build for iOS**
   ```bash
   eas build --platform ios
   eas submit --platform ios
   ```

4. **Build for Android**
   ```bash
   eas build --platform android
   eas submit --platform android
   ```

5. **Web Deployment**
   ```bash
   npx expo export
   # Deploy the dist/ folder to Vercel, Netlify, etc.
   ```

## 🐛 Troubleshooting

### Camera Permission Issues
- Restart Expo Go app
- Clear app cache
- Grant permissions in device settings

### QR Code Not Scanning
- Ensure good lighting
- Position QR code in the green scan box
- QR code must be clear and not damaged

### Expo Go Connection Failed
- Check network connection
- Make sure dev server is running
- Use the same WiFi network

## 📝 Recent Changes

### v1.1.0 - QR Scanner Feature
- Added real-time QR code scanning
- Individual scan tracking with timestamps
- Scan history management
- Expo Go full compatibility

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Gaurav Paul**
- GitHub: [@meow7781](https://github.com/meow7781)
- Repository: [Epium](https://github.com/meow7781/Epium)

## 🔗 Links

- [Expo Documentation](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev)
- [Expo Router Guide](https://docs.expo.dev/router/introduction/)

---

**Made with ❤️ using React Native & Expo**