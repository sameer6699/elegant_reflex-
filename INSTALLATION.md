# React Native Expo Game - Installation Guide

This guide will walk you through installing and running this React Native Expo project on Windows.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

### 1. Node.js (v18 or higher recommended)
- Download from: https://nodejs.org/
- Verify installation:
  ```bash
  node --version
  npm --version
  ```

### 2. Git (Optional but recommended)
- Download from: https://git-scm.com/download/win

### 3. Expo Go App (for mobile testing)
- **Android**: Install from [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
- **iOS**: Install from [App Store](https://apps.apple.com/app/expo-go/id982107779)

### 4. Code Editor (Optional)
- Visual Studio Code: https://code.visualstudio.com/
- Or any editor of your choice

---

## Installation Steps

### Step 1: Navigate to Project Directory

Open PowerShell or Command Prompt and navigate to your project directory:

```bash
cd "C:\Users\HP\OneDrive\Desktop\React-native-game"
```

### Step 2: Install Dependencies

Install all project dependencies using npm:

```bash
npm install
```

**Note**: This will install all packages listed in `package.json`. The installation may take a few minutes.

**Alternative**: If you prefer using yarn:
```bash
yarn install
```

### Step 3: Verify Installation

Check if all dependencies are installed correctly:

```bash
npm list --depth=0
```

---

## Running the Project

### Option 1: Development Server (Recommended)

Start the Expo development server:

```bash
npm run dev
```

Or use the Expo CLI directly:

```bash
npx expo start
```

**What happens next:**
1. A QR code will appear in your terminal
2. You'll see options to:
   - Press `a` to open on Android emulator
   - Press `i` to open on iOS simulator
   - Press `w` to open in web browser
   - Scan QR code with Expo Go app on your phone

### Option 2: Run on Specific Platform

**For Web:**
```bash
npx expo start --web
```

**For Android:**
```bash
npx expo start --android
```
*(Requires Android Studio and emulator setup)*

**For iOS:**
```bash
npx expo start --ios
```
*(Requires macOS and Xcode)*

---

## Troubleshooting

### Issue: `npm install` fails

**Solution 1**: Clear npm cache
```bash
npm cache clean --force
npm install
```

**Solution 2**: Delete node_modules and package-lock.json, then reinstall
```bash
rmdir /s /q node_modules
del package-lock.json
npm install
```

### Issue: Port already in use

**Solution**: Kill the process using the port or use a different port
```bash
npx expo start --port 8082
```

### Issue: Expo CLI not found

**Solution**: Install Expo CLI globally
```bash
npm install -g expo-cli
```

Or use npx (recommended):
```bash
npx expo start
```

### Issue: TypeScript errors

**Solution**: Run type checking
```bash
npm run typecheck
```

### Issue: Metro bundler cache issues

**Solution**: Clear Metro bundler cache
```bash
npx expo start --clear
```

---

## Project Scripts

The following scripts are available in this project:

- `npm run dev` - Start the Expo development server
- `npm run build:web` - Build for web platform
- `npm run lint` - Run ESLint to check code quality
- `npm run typecheck` - Run TypeScript type checking

---

## Project Structure

```
React-native-game/
├── app/                    # App screens and routes (Expo Router)
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Home screen
│   │   ├── game.tsx       # Game screen
│   │   ├── leaderboard.tsx # Leaderboard screen
│   │   └── settings.tsx   # Settings screen
│   └── _layout.tsx        # Root layout
├── assets/                 # Images and static assets
├── constants/              # App constants and themes
├── hooks/                  # Custom React hooks
├── app.json               # Expo configuration
├── package.json           # Dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

---

## Additional Setup (If Needed)

### For Android Development

1. Install Android Studio: https://developer.android.com/studio
2. Set up Android Virtual Device (AVD)
3. Enable Developer Options on your Android device
4. Enable USB Debugging

### For iOS Development (macOS only)

1. Install Xcode from App Store
2. Install Xcode Command Line Tools:
   ```bash
   xcode-select --install
   ```
3. Install CocoaPods:
   ```bash
   sudo gem install cocoapods
   ```

---

## Environment Variables (If Applicable)

If this project uses environment variables (like Supabase keys), create a `.env` file in the root directory:

```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Next Steps

1. ✅ Install Node.js
2. ✅ Run `npm install`
3. ✅ Run `npm run dev`
4. 📱 Open Expo Go app on your phone
5. 📷 Scan the QR code from terminal
6. 🎮 Start playing!

---

## Need Help?

- Expo Documentation: https://docs.expo.dev/
- React Native Documentation: https://reactnative.dev/
- Expo Community: https://forums.expo.dev/

---

## Quick Start Commands Summary

```bash
# 1. Navigate to project
cd "C:\Users\HP\OneDrive\Desktop\React-native-game"

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Scan QR code with Expo Go app or press 'w' for web
```

---

**Happy Coding! 🚀**

