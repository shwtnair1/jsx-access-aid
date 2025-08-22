export interface AIConfig {
  provider: 'openai' | 'anthropic' | 'mock' | 'custom';
  apiKey?: string;
  baseUrl?: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
  timeout?: number;
}

export const defaultAIConfig: AIConfig = {
  provider: 'mock', // Default to mock for development
  apiKey: process.env.VITE_OPENAI_API_KEY || process.env.VITE_ANTHROPIC_API_KEY,
  baseUrl: process.env.VITE_AI_BASE_URL,
  model: process.env.VITE_AI_MODEL || 'gpt-4',
  maxTokens: 2000,
  temperature: 0.1, // Low temperature for consistent results
  timeout: 30000, // 30 seconds
};

/**
 * AI Service Configuration
 * 
 * To use real AI services:
 * 1. Set VITE_OPENAI_API_KEY in your .env file for OpenAI
 * 2. Set VITE_ANTHROPIC_API_KEY in your .env file for Anthropic
 * 3. Change provider to 'openai' or 'anthropic' in the config
 * 4. Optionally set VITE_AI_BASE_URL for custom endpoints
 */
export const aiConfig: AIConfig = {
  ...defaultAIConfig,
  // Override with environment variables or custom settings
  provider: (process.env.VITE_AI_PROVIDER as AIConfig['provider']) || 'mock',
};

/**
 * Accessibility analysis prompt template
 */
export function getAccessibilityPromptTemplate(language: string, code: string): string {
  return `
You are an expert accessibility consultant analyzing web code for WCAG 2.1 compliance.

Analyze the following ${language} code for accessibility issues:

\`\`\`${language}
${code}
\`\`\`

Please provide:
1. A list of accessibility issues found with their severity (critical/moderate/low)
2. Specific fixes for each issue
3. An overall analysis summary
4. Recommendations for improvement

Focus on:
- ARIA attributes and roles
- Keyboard navigation
- Screen reader compatibility
- Color contrast
- Semantic HTML
- Form accessibility
- Image alt text
- Focus management

Return your response in JSON format:
{
  "issues": [
    {
      "category": "Images|Interactive Elements|Forms|Navigation|Semantics|ARIA|Keyboard Navigation",
      "action": "specific action taken",
      "selector": "CSS selector",
      "summary": "brief description",
      "line": line number,
      "confidence": 0.0-1.0,
      "explanation": "detailed explanation"
    }
  ],
  "fixedCode": "code with fixes applied",
  "analysis": "overall analysis summary",
  "suggestions": ["array of improvement suggestions"]
}
`;
}

/**
 * Get AI service configuration based on provider
 */
export function getAIServiceConfig(provider: AIConfig['provider'] = aiConfig.provider) {
  switch (provider) {
    case 'openai':
      return {
        baseUrl: 'https://api.openai.com/v1',
        model: aiConfig.model || 'gpt-4',
        headers: {
          'Authorization': `Bearer ${aiConfig.apiKey}`,
          'Content-Type': 'application/json',
        },
      };
    case 'anthropic':
      return {
        baseUrl: 'https://api.anthropic.com/v1',
        model: aiConfig.model || 'claude-3-sonnet-20240229',
        headers: {
          'x-api-key': aiConfig.apiKey,
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01',
        },
      };
    case 'mock':
    default:
      return {
        baseUrl: 'mock',
        model: 'mock-ai',
        headers: {},
      };
  }
}

/**
 * Validate AI configuration
 */
export function validateAIConfig(config: AIConfig = aiConfig): string[] {
  const errors: string[] = [];

  if (config.provider !== 'mock' && !config.apiKey) {
    errors.push(`API key is required for ${config.provider} provider`);
  }

  if (config.provider === 'openai' && !config.apiKey?.startsWith('sk-')) {
    errors.push('Invalid OpenAI API key format');
  }

  if (config.provider === 'anthropic' && !config.apiKey?.startsWith('sk-ant-')) {
    errors.push('Invalid Anthropic API key format');
  }

  return errors;
}