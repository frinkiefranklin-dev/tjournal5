# TradeJournal 2090 - Futuristic Trading Analytics

A cutting-edge trading journal frontend built with Next.js 14, featuring a futuristic interface with glassmorphism effects, smooth animations, and advanced analytics.

## 🚀 Features

- **Futuristic UI**: Glassmorphism effects, neon accents, and smooth animations
- **Advanced Analytics**: Interactive charts and comprehensive trading statistics
- **Real-time Data**: Live updates and responsive interface
- **Mobile Responsive**: Optimized for all device sizes
- **Dark/Light Mode**: Adaptive theming with system preference detection
- **Secure Authentication**: JWT-based auth with token management

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form + Zod validation
- **Icons**: Lucide React

## 📦 Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment**:
   ```bash
   cp .env.local.example .env.local
   ```
   Update `NEXT_PUBLIC_API_URL` to point to your FastAPI backend.

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### Environment Variables

- `NEXT_PUBLIC_API_URL`: Your FastAPI backend URL (default: http://localhost:8000)

### API Integration

The frontend is designed to work seamlessly with your FastAPI backend. Ensure your backend is running and accessible at the configured URL.

## 📱 Pages & Features

### 🏠 Landing Page
- Futuristic hero section with animated elements
- Feature showcase with glassmorphism cards
- Call-to-action sections

### 🔐 Authentication
- **Sign Up**: Create new account with email/password
- **Sign In**: Secure login with JWT tokens
- **Auto-redirect**: Seamless navigation based on auth state

### 📊 Dashboard
- **Overview Cards**: Key metrics at a glance
- **Equity Curve**: Interactive performance chart
- **Recent Trades**: Quick access to latest positions
- **Quick Actions**: Fast navigation to key features

### 💹 Trades Management
- **Trade Table**: Sortable, filterable data grid
- **Add/Edit Forms**: Comprehensive trade entry with validation
- **Close Positions**: Easy trade closure with P&L calculation
- **Search & Filter**: Advanced filtering by pair, status, date

### 📈 Analytics
- **Performance Stats**: Win rate, R:R ratio, total profit
- **Equity Curve**: Visual account growth tracking
- **Interactive Charts**: Responsive data visualizations

### 👤 Profile
- **Account Settings**: User preferences and configuration
- **Security Options**: Password management and 2FA
- **Theme Controls**: Dark/light mode toggle

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#3b82f6 to #8b5cf6)
- **Success**: Green (#22c55e)
- **Warning**: Yellow (#eab308)
- **Error**: Red (#ef4444)
- **Neutral**: Slate tones

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold weights with gradient text effects
- **Body**: Regular weight with proper line spacing

### Components
- **Glass Cards**: Backdrop blur with subtle borders
- **Neon Buttons**: Glowing effects with hover animations
- **Interactive Elements**: Smooth transitions and micro-interactions

## 🔄 API Integration

### Authentication Flow
```typescript
// Login
POST /api/v1/auth/login
// Signup  
POST /api/v1/auth/signup
```

### Trades Management
```typescript
// Create trade
POST /api/v1/trades/
// List trades
GET /api/v1/trades/
// Update trade
PUT /api/v1/trades/{id}
// Close trade
PATCH /api/v1/trades/{id}/close
```

### Analytics
```typescript
// Summary stats
GET /api/v1/stats/summary
// Equity curve
GET /api/v1/stats/equity_curve
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Deploy to Vercel
```bash
npx vercel
```

## 🔮 Future Enhancements

- **AI Insights**: Machine learning-powered trade analysis
- **Social Features**: Community trading insights
- **Advanced Charts**: More visualization options
- **Mobile App**: React Native companion app
- **Real-time Updates**: WebSocket integration
- **Export Features**: PDF reports and data export

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the API integration guide

---

**TradeJournal 2090** - The future of trading analytics is here! 🚀