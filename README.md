# 🤖 AI-Powered Accessibility Fixer

> Transform your JSX/HTML into accessible, inclusive code using advanced AI analysis

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC.svg)](https://tailwindcss.com/)

A modern web application that uses artificial intelligence to analyze and fix accessibility issues in your code. Built with React, TypeScript, and Tailwind CSS, it provides comprehensive WCAG 2.1 compliance analysis with intelligent suggestions and confidence scoring.

## ✨ Features

### 🤖 AI-Powered Analysis
- **Intelligent Issue Detection**: Advanced AI analysis beyond basic pattern matching
- **Confidence Scoring**: Each issue comes with a confidence level (0-100%)
- **Contextual Suggestions**: AI provides specific recommendations based on your code
- **Comprehensive Coverage**: WCAG 2.1, ARIA, semantic HTML, keyboard navigation

### 🎨 Professional Interface
- **Clean Design**: Modern, enterprise-ready UI with professional color scheme
- **Real-time Analysis**: Instant feedback with AI-powered insights
- **Multiple Views**: Overview, AI Analysis, Fixed Code, and Changes tabs
- **Responsive Layout**: Works seamlessly on desktop and mobile devices

### 🔧 Technical Excellence
- **Language Detection**: Automatically detects JSX/HTML/TSX
- **Fallback Support**: Graceful degradation if AI is unavailable
- **Configurable**: Easy setup for different AI providers
- **Extensible**: Framework ready for additional AI services

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-accessibility-fixer.git
   cd ai-accessibility-fixer
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎯 Usage

### Basic Workflow

1. **Paste Your Code**: Input JSX, HTML, or TSX code in the left panel
2. **AI Analysis**: Click "Fix Accessibility" to start AI-powered analysis
3. **Review Results**: Check the Overview tab for identified issues
4. **AI Insights**: Visit the AI Analysis tab for detailed recommendations
5. **Get Fixed Code**: Copy or download the accessibility-compliant code

### AI Analysis Features

- **Overview Tab**: Quick summary of all accessibility issues
- **AI Analysis Tab**: Detailed AI insights with confidence scores
- **Fixed Code Tab**: Complete code with all fixes applied
- **Changes Tab**: Side-by-side comparison of original vs fixed code

## ⚙️ Configuration

### AI Providers

The application supports multiple AI providers for accessibility analysis:

#### 1. Mock AI (Default)
Perfect for development and testing - no configuration required.

#### 2. OpenAI
For production use with GPT-4 analysis.

Create a `.env` file:
```env
VITE_AI_PROVIDER=openai
VITE_OPENAI_API_KEY=sk-your-openai-api-key
VITE_AI_MODEL=gpt-4
```

#### 3. Anthropic
Alternative AI provider with Claude models.

```env
VITE_AI_PROVIDER=anthropic
VITE_ANTHROPIC_API_KEY=sk-ant-your-anthropic-api-key
```

#### 4. Custom AI Service
For self-hosted or custom AI solutions.

```env
VITE_AI_PROVIDER=custom
VITE_AI_BASE_URL=https://your-custom-ai-service.com
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_AI_PROVIDER` | AI service provider | `mock` |
| `VITE_OPENAI_API_KEY` | OpenAI API key | - |
| `VITE_ANTHROPIC_API_KEY` | Anthropic API key | - |
| `VITE_AI_BASE_URL` | Custom AI service URL | - |
| `VITE_AI_MODEL` | AI model to use | `gpt-4` |

## 🏗️ Architecture

### Project Structure
```
├── src/
│   ├── components/          # React components
│   ├── lib/
│   │   ├── ai-accessibility-fixer.ts    # Main AI service
│   │   ├── ai-config.ts                 # AI configuration
│   │   └── accessibility-fixer.ts       # Legacy basic fixer
│   ├── pages/
│   │   └── Index.tsx                    # Main application page
│   └── index.css                        # Global styles
├── public/                 # Static assets
├── tailwind.config.ts      # Tailwind configuration
└── package.json           # Dependencies and scripts
```

### Key Components

- **AIAccessibilityService**: Handles AI API communication and analysis
- **AI Configuration**: Centralized configuration management
- **Enhanced UI**: Professional interface with AI-specific features
- **Fallback System**: Graceful degradation when AI is unavailable

## 🎨 Design System

### Color Palette
- **Primary**: Professional blue (`#3B82F6`)
- **Background**: Clean slate grays
- **Success**: Green for positive feedback
- **Warning**: Amber for important notices
- **Error**: Red for critical issues

### Typography
- **Font**: System fonts with excellent readability
- **Hierarchy**: Clear heading structure
- **Accessibility**: High contrast ratios for all text

## 🔍 Accessibility Features

The application itself follows accessibility best practices:

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: ARIA labels and semantic HTML
- **Color Contrast**: WCAG 2.1 AA compliant
- **Focus Management**: Clear focus indicators
- **Responsive Design**: Works on all screen sizes

## 🧪 Testing

### Development Testing
```bash
# Run linting
npm run lint

# Type checking
npm run type-check

# Build for production
npm run build
```

### AI Integration Testing
```bash
# Test with mock AI (default)
npm run dev

# Test with OpenAI
VITE_AI_PROVIDER=openai VITE_OPENAI_API_KEY=your-key npm run dev

# Test with Anthropic
VITE_AI_PROVIDER=anthropic VITE_ANTHROPIC_API_KEY=your-key npm run dev
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Maintain accessibility standards
- Add tests for new functionality
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team**: For the amazing framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Radix UI**: For accessible component primitives
- **OpenAI/Anthropic**: For AI capabilities
- **WCAG Guidelines**: For accessibility standards

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/ai-accessibility-fixer/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/ai-accessibility-fixer/discussions)
- **Email**: support@yourdomain.com

## 🔮 Roadmap

- [ ] Real-time AI analysis as you type
- [ ] Multiple AI provider support
- [ ] Custom AI model training
- [ ] Accessibility compliance reports
- [ ] Integration with CI/CD pipelines
- [ ] Team collaboration features
- [ ] Mobile app version
- [ ] VS Code extension

---

<div align="center">

**Made with ❤️ for a more accessible web**

[Star on GitHub](https://github.com/yourusername/ai-accessibility-fixer) • [Report Bug](https://github.com/yourusername/ai-accessibility-fixer/issues) • [Request Feature](https://github.com/yourusername/ai-accessibility-fixer/issues)

</div>
