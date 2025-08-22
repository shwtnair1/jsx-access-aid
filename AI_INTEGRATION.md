# AI-Powered Accessibility Fixer

This application now uses advanced AI to analyze and fix accessibility issues in your code. The AI system provides comprehensive analysis, intelligent suggestions, and confidence scores for each identified issue.

## Features

### 🤖 AI-Powered Analysis
- **Intelligent Issue Detection**: AI analyzes your code for accessibility issues beyond basic pattern matching
- **Confidence Scoring**: Each issue comes with a confidence score indicating AI certainty
- **Contextual Suggestions**: AI provides contextual recommendations based on your specific code
- **Comprehensive Analysis**: Covers WCAG 2.1 guidelines, ARIA, semantic HTML, and more

### 📊 Enhanced UI
- **AI Analysis Tab**: Dedicated tab showing AI insights and recommendations
- **Confidence Indicators**: Visual confidence bars for each identified issue
- **Smart Suggestions**: AI-powered improvement recommendations
- **Professional Interface**: Clean, enterprise-ready design

### 🔧 Technical Capabilities
- **Language Detection**: Automatically detects JSX/HTML/TSX
- **Fallback Support**: Graceful degradation to basic analysis if AI is unavailable
- **Configurable**: Easy setup for different AI providers
- **Extensible**: Framework ready for additional AI services

## Configuration

### Environment Variables

Create a `.env` file in your project root:

```env
# AI Provider (mock, openai, anthropic)
VITE_AI_PROVIDER=mock

# OpenAI Configuration
VITE_OPENAI_API_KEY=sk-your-openai-api-key
VITE_AI_MODEL=gpt-4

# Anthropic Configuration
VITE_ANTHROPIC_API_KEY=sk-ant-your-anthropic-api-key

# Custom AI Service
VITE_AI_BASE_URL=https://your-custom-ai-service.com
```

### AI Providers

#### 1. Mock AI (Default)
- **Use Case**: Development and testing
- **Features**: Simulated AI responses with realistic delays
- **Setup**: No configuration required

#### 2. OpenAI
- **Use Case**: Production with GPT-4
- **Features**: Advanced language model analysis
- **Setup**: Set `VITE_AI_PROVIDER=openai` and `VITE_OPENAI_API_KEY`

#### 3. Anthropic
- **Use Case**: Production with Claude
- **Features**: Strong reasoning capabilities
- **Setup**: Set `VITE_AI_PROVIDER=anthropic` and `VITE_ANTHROPIC_API_KEY`

#### 4. Custom AI Service
- **Use Case**: Self-hosted or custom AI solutions
- **Features**: Full control over AI implementation
- **Setup**: Set `VITE_AI_BASE_URL` and implement custom service

## Usage

### Basic Usage
1. Paste your JSX/HTML code in the input area
2. Click "Fix Accessibility" to start AI analysis
3. Review results in the Overview tab
4. Check AI Analysis tab for detailed insights
5. Copy or download the fixed code

### Advanced Features

#### AI Analysis Tab
- **Analysis Summary**: AI's overall assessment of your code
- **Recommendations**: Contextual suggestions for improvement
- **Confidence Levels**: Visual indicators of AI certainty for each issue

#### Confidence Scoring
- **90-100%**: Critical issues requiring immediate attention
- **70-89%**: Important issues that should be addressed
- **50-69%**: Moderate issues for consideration
- **Below 50%**: Minor suggestions

## Technical Implementation

### File Structure
```
src/
├── lib/
│   ├── ai-accessibility-fixer.ts    # Main AI service
│   ├── ai-config.ts                 # AI configuration
│   └── accessibility-fixer.ts       # Legacy basic fixer
├── pages/
│   └── Index.tsx                    # Updated UI with AI features
```

### Key Components

#### AIAccessibilityService
- Handles AI API communication
- Provides fallback to basic analysis
- Manages configuration and authentication

#### AI Configuration
- Centralized configuration management
- Environment variable support
- Provider-specific settings

#### Enhanced UI
- New AI Analysis tab
- Confidence score visualization
- Improved loading states

## Development

### Adding New AI Providers

1. Update `AIConfig` interface in `ai-config.ts`
2. Add provider case in `getAIServiceConfig()`
3. Implement provider-specific logic in `AIAccessibilityService`

### Customizing AI Prompts

Modify the prompt template in `ai-config.ts`:

```typescript
export function getAccessibilityPromptTemplate(language: string, code: string): string {
  return `Your custom prompt here...`;
}
```

### Testing AI Integration

```bash
# Test with mock AI (default)
npm run dev

# Test with OpenAI
VITE_AI_PROVIDER=openai VITE_OPENAI_API_KEY=your-key npm run dev

# Test with Anthropic
VITE_AI_PROVIDER=anthropic VITE_ANTHROPIC_API_KEY=your-key npm run dev
```

## Troubleshooting

### Common Issues

1. **AI Analysis Fails**
   - Check API key configuration
   - Verify network connectivity
   - Review console for error messages

2. **Slow Response Times**
   - AI analysis includes realistic delays
   - Consider using faster AI models
   - Check API rate limits

3. **Incorrect Analysis**
   - AI responses may vary
   - Review confidence scores
   - Use fallback basic analysis if needed

### Debug Mode

Enable debug logging by setting:

```env
VITE_DEBUG_AI=true
```

## Future Enhancements

- [ ] Real-time AI analysis as you type
- [ ] Multiple AI provider support
- [ ] Custom AI model training
- [ ] Accessibility compliance reports
- [ ] Integration with CI/CD pipelines
- [ ] Team collaboration features

## Contributing

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.