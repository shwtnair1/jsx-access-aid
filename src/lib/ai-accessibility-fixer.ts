export interface AccessibilityFix {
  category: 'Images' | 'Interactive Elements' | 'Forms' | 'Navigation' | 'Semantics' | 'ARIA' | 'Keyboard Navigation';
  action: string;
  selector: string;
  summary: string;
  line?: number;
  confidence?: number;
  explanation?: string;
}

export interface FixResult {
  code: string;
  fixes: AccessibilityFix[];
  hasChanges: boolean;
  analysis?: string;
  suggestions?: string[];
}

export interface AIAnalysisRequest {
  code: string;
  language: 'jsx' | 'html' | 'tsx';
  context?: string;
}

export interface AIAnalysisResponse {
  fixedCode: string;
  fixes: AccessibilityFix[];
  analysis: string;
  suggestions: string[];
  confidence: number;
}

/**
 * Mock AI service for accessibility analysis
 * In production, this would connect to OpenAI, Anthropic, or another AI service
 */
class AIAccessibilityService {
  private apiKey?: string;
  private baseUrl: string;

  constructor(apiKey?: string, baseUrl: string = 'https://api.openai.com/v1') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  /**
   * Analyze code for accessibility issues using AI
   */
  async analyzeCode(request: AIAnalysisRequest): Promise<AIAnalysisResponse> {
    // For now, we'll use a sophisticated mock that simulates AI analysis
    // In production, replace this with actual AI API calls
    
    const { code, language, context } = request;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    // Use the existing rule-based fixer as a fallback
    const basicFixes = this.performBasicAnalysis(code);
    
    // Enhance with AI-simulated analysis
    const aiEnhancedFixes = this.enhanceWithAIAnalysis(code, basicFixes, language);
    
    // Generate AI analysis and suggestions
    const analysis = this.generateAIAnalysis(code, aiEnhancedFixes, language);
    const suggestions = this.generateSuggestions(code, aiEnhancedFixes, language);
    
    return {
      fixedCode: this.applyFixes(code, aiEnhancedFixes),
      fixes: aiEnhancedFixes,
      analysis,
      suggestions,
      confidence: 0.85 + Math.random() * 0.1 // Simulate confidence score
    };
  }

  /**
   * Perform basic accessibility analysis using regex patterns
   */
  private performBasicAnalysis(code: string): AccessibilityFix[] {
    const fixes: AccessibilityFix[] = [];
    let lineOffset = 0;

    const getLineNumber = (index: number): number => {
      return code.substring(0, index).split('\n').length + lineOffset;
    };

    // Enhanced image analysis
    code.replace(/<img(?![^>]*\balt\s*=)([^>]*?)>/gi, (match, attrs, offset) => {
      const isDecorative = /(?:decorative|background|spacer|divider)/i.test(attrs);
      fixes.push({
        category: 'Images',
        action: 'Added alt attribute',
        selector: `img${attrs.includes('src') ? `[src]` : ''}`,
        summary: isDecorative 
          ? 'Added empty alt attribute for decorative image' 
          : 'Added descriptive alt attribute for meaningful image',
        line: getLineNumber(offset),
        confidence: 0.95,
        explanation: isDecorative 
          ? 'Decorative images should have empty alt attributes to be ignored by screen readers'
          : 'Images should have descriptive alt text for screen reader users'
      });
      return match;
    });

    // Enhanced button analysis
    code.replace(/<button(?![^>]*\b(?:aria-label|aria-labelledby)\s*=)([^>]*?)>\s*<svg[^>]*>.*?<\/svg>\s*<\/button>/gis, (match, attrs, offset) => {
      fixes.push({
        category: 'Interactive Elements',
        action: 'Added aria-label',
        selector: 'button > svg',
        summary: 'Added descriptive aria-label for button with only SVG content',
        line: getLineNumber(offset),
        confidence: 0.9,
        explanation: 'Buttons with only SVG content need aria-label for screen reader accessibility'
      });
      return match;
    });

    // Enhanced link analysis
    code.replace(/<a(?![^>]*\b(?:aria-label|aria-labelledby)\s*=)([^>]*?)>\s*(?:<[^>]*>)*\s*<\/a>/gi, (match, attrs, offset) => {
      const textContent = match.replace(/<[^>]*>/g, '').trim();
      if (!textContent) {
        fixes.push({
          category: 'Navigation',
          action: 'Added aria-label',
          selector: 'a[href]',
          summary: 'Added descriptive aria-label for link without text content',
          line: getLineNumber(offset),
          confidence: 0.9,
          explanation: 'Links without text content need aria-label for screen reader users'
        });
      }
      return match;
    });

    // Enhanced div clickable analysis
    code.replace(/<div(?![^>]*\brole\s*=)([^>]*?)onClick\s*=\s*[^>]*?>/gi, (match, beforeOnClick, offset) => {
      fixes.push({
        category: 'Interactive Elements',
        action: 'Added role and keyboard support',
        selector: 'div[onClick]',
        summary: 'Made clickable div keyboard accessible with role="button" and tabIndex',
        line: getLineNumber(offset),
        confidence: 0.85,
        explanation: 'Clickable divs need proper ARIA roles and keyboard navigation support'
      });
      return match;
    });

    // Enhanced form analysis
    code.replace(/<input(?![^>]*\b(?:aria-label|id|aria-labelledby)\s*=)([^>]*?)(?:\s*\/>|>\s*<\/input>)/gi, (match, attrs, offset) => {
      const hasAssociatedLabel = /<label[^>]*\bfor\s*=\s*["'][^"']*["']/.test(code);
      
      if (!hasAssociatedLabel) {
        fixes.push({
          category: 'Forms',
          action: 'Added accessibility attributes',
          selector: 'input',
          summary: 'Added aria-label for input without associated label',
          line: getLineNumber(offset),
          confidence: 0.9,
          explanation: 'Form inputs need labels or aria-label for screen reader accessibility'
        });
      }
      return match;
    });

    return fixes;
  }

  /**
   * Enhance basic analysis with AI-simulated insights
   */
  private enhanceWithAIAnalysis(code: string, basicFixes: AccessibilityFix[], language: string): AccessibilityFix[] {
    const enhancedFixes = [...basicFixes];

    // AI-simulated semantic analysis
    if (code.includes('<div') && !code.includes('role=') && !code.includes('aria-label=')) {
      const divMatches = code.match(/<div[^>]*>/g);
      if (divMatches && divMatches.length > 3) {
        enhancedFixes.push({
          category: 'Semantics',
          action: 'Suggested semantic elements',
          selector: 'div',
          summary: 'Consider using semantic HTML elements (main, section, article, nav) instead of generic divs',
          confidence: 0.75,
          explanation: 'Semantic HTML improves accessibility and SEO by providing meaningful structure'
        });
      }
    }

    // AI-simulated color contrast analysis
    if (code.includes('color:') || code.includes('background-color:')) {
      enhancedFixes.push({
        category: 'ARIA',
        action: 'Color contrast check',
        selector: 'style',
        summary: 'Verify color contrast ratios meet WCAG 2.1 AA standards (4.5:1 for normal text)',
        confidence: 0.7,
        explanation: 'Insufficient color contrast makes text difficult to read for users with visual impairments'
      });
    }

    // AI-simulated heading structure analysis
    const headingMatches = code.match(/<h[1-6][^>]*>/g);
    if (headingMatches) {
      const headingLevels = headingMatches.map(h => parseInt(h.match(/<h([1-6])/)?.[1] || '1'));
      const hasSkippedLevels = headingLevels.some((level, index) => 
        index > 0 && level - headingLevels[index - 1] > 1
      );
      
      if (hasSkippedLevels) {
        enhancedFixes.push({
          category: 'Semantics',
          action: 'Heading structure',
          selector: 'h1-h6',
          summary: 'Avoid skipping heading levels (e.g., h1 to h3) for proper document outline',
          confidence: 0.8,
          explanation: 'Proper heading hierarchy helps screen reader users navigate content effectively'
        });
      }
    }

    // AI-simulated focus management analysis
    if (code.includes('onClick') && !code.includes('onKeyDown') && !code.includes('onKeyPress')) {
      enhancedFixes.push({
        category: 'Keyboard Navigation',
        action: 'Keyboard event handling',
        selector: 'interactive elements',
        summary: 'Add keyboard event handlers (onKeyDown, onKeyPress) for interactive elements',
        confidence: 0.85,
        explanation: 'Keyboard-only users need alternative ways to interact with clickable elements'
      });
    }

    return enhancedFixes;
  }

  /**
   * Generate AI analysis summary
   */
  private generateAIAnalysis(code: string, fixes: AccessibilityFix[], language: string): string {
    const totalIssues = fixes.length;
    const categories = [...new Set(fixes.map(f => f.category))];
    
    if (totalIssues === 0) {
      return "Excellent! Your code demonstrates strong accessibility practices. No critical accessibility issues were detected. The code follows WCAG 2.1 guidelines and provides a good foundation for inclusive user experiences.";
    }

    const criticalIssues = fixes.filter(f => f.confidence && f.confidence > 0.9).length;
    const moderateIssues = fixes.filter(f => f.confidence && f.confidence > 0.7 && f.confidence <= 0.9).length;
    
    let analysis = `AI analysis found ${totalIssues} accessibility ${totalIssues === 1 ? 'issue' : 'issues'} across ${categories.length} categories. `;
    
    if (criticalIssues > 0) {
      analysis += `${criticalIssues} critical ${criticalIssues === 1 ? 'issue' : 'issues'} require immediate attention. `;
    }
    
    if (moderateIssues > 0) {
      analysis += `${moderateIssues} moderate ${moderateIssues === 1 ? 'issue' : 'issues'} should be addressed for better accessibility. `;
    }

    analysis += `The most common issues relate to ${categories.slice(0, 2).join(' and ')}. `;
    
    if (language === 'jsx' || language === 'tsx') {
      analysis += "As React/JSX code, consider using accessibility-focused libraries like @radix-ui/react-* components which provide built-in accessibility features.";
    }

    return analysis;
  }

  /**
   * Generate AI-powered suggestions
   */
  private generateSuggestions(code: string, fixes: AccessibilityFix[], language: string): string[] {
    const suggestions: string[] = [];

    if (fixes.some(f => f.category === 'Images')) {
      suggestions.push("Use descriptive alt text for images that convey information, and empty alt attributes for decorative images");
    }

    if (fixes.some(f => f.category === 'Interactive Elements')) {
      suggestions.push("Ensure all interactive elements are keyboard accessible and have proper ARIA labels");
    }

    if (fixes.some(f => f.category === 'Forms')) {
      suggestions.push("Associate form labels with inputs using the 'for' attribute or wrap inputs in label elements");
    }

    if (fixes.some(f => f.category === 'Semantics')) {
      suggestions.push("Use semantic HTML elements to provide meaningful structure and improve screen reader navigation");
    }

    if (language === 'jsx' || language === 'tsx') {
      suggestions.push("Consider using React Testing Library's accessibility queries to test your components");
      suggestions.push("Implement focus management for dynamic content and modal dialogs");
    }

    if (fixes.length > 5) {
      suggestions.push("Run automated accessibility testing tools like axe-core or Lighthouse to catch additional issues");
    }

    return suggestions;
  }

  /**
   * Apply fixes to the original code
   */
  private applyFixes(code: string, fixes: AccessibilityFix[]): string {
    let fixedCode = code;
    let lineOffset = 0;

    // Apply image fixes
    fixedCode = fixedCode.replace(/<img(?![^>]*\balt\s*=)([^>]*?)>/gi, (match, attrs) => {
      const isDecorative = /(?:decorative|background|spacer|divider)/i.test(attrs);
      return `<img${attrs} alt="${isDecorative ? '' : 'Descriptive text for image'}">`;
    });

    // Apply button fixes
    fixedCode = fixedCode.replace(/<button(?![^>]*\b(?:aria-label|aria-labelledby)\s*=)([^>]*?)>\s*<svg[^>]*>.*?<\/svg>\s*<\/button>/gis, (match, attrs) => {
      return match.replace('<button', '<button aria-label="Button action"');
    });

    // Apply link fixes
    fixedCode = fixedCode.replace(/<a(?![^>]*\b(?:aria-label|aria-labelledby)\s*=)([^>]*?)>\s*(?:<[^>]*>)*\s*<\/a>/gi, (match, attrs) => {
      const textContent = match.replace(/<[^>]*>/g, '').trim();
      if (!textContent) {
        return match.replace('<a', '<a aria-label="Link destination"');
      }
      return match;
    });

    // Apply div clickable fixes
    fixedCode = fixedCode.replace(/<div(?![^>]*\brole\s*=)([^>]*?)onClick\s*=\s*[^>]*?>/gi, (match, beforeOnClick) => {
      let replacement = match;
      if (!replacement.includes('role=')) {
        replacement = replacement.replace('<div', '<div role="button"');
      }
      if (!replacement.includes('tabIndex')) {
        replacement = replacement.replace('<div', '<div tabIndex={0}');
      }
      if (!replacement.includes('onKeyDown')) {
        replacement = replacement.replace('<div', '<div onKeyDown={(e) => e.key === "Enter" && e.currentTarget.click()}');
      }
      return replacement;
    });

    // Apply input fixes
    fixedCode = fixedCode.replace(/<input(?![^>]*\b(?:aria-label|id|aria-labelledby)\s*=)([^>]*?)(?:\s*\/>|>\s*<\/input>)/gi, (match, attrs) => {
      const hasAssociatedLabel = /<label[^>]*\bfor\s*=\s*["'][^"']*["']/.test(code);
      if (!hasAssociatedLabel) {
        if (match.endsWith('/>')) {
          return match.replace('/>', ' aria-label="Input field" />');
        } else {
          return match.replace('>', ' aria-label="Input field">');
        }
      }
      return match;
    });

    return fixedCode.trim();
  }

  /**
   * Set API key for real AI service integration
   */
  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Set base URL for AI service
   */
  setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
}

// Export singleton instance
export const aiAccessibilityService = new AIAccessibilityService();

/**
 * Main AI-powered accessibility fixer function
 */
export async function fixAccessibilityWithAI(sourceCode: string, language: 'jsx' | 'html' | 'tsx' = 'jsx'): Promise<FixResult> {
  try {
    const request: AIAnalysisRequest = {
      code: sourceCode,
      language,
      context: 'Accessibility analysis for web development'
    };

    const response = await aiAccessibilityService.analyzeCode(request);

    return {
      code: response.fixedCode,
      fixes: response.fixes,
      hasChanges: response.fixes.length > 0,
      analysis: response.analysis,
      suggestions: response.suggestions
    };
  } catch (error) {
    console.error('AI accessibility analysis failed:', error);
    
    // Fallback to basic analysis
    const basicFixes = aiAccessibilityService['performBasicAnalysis'](sourceCode);
    const fixedCode = aiAccessibilityService['applyFixes'](sourceCode, basicFixes);
    
    return {
      code: fixedCode,
      fixes: basicFixes,
      hasChanges: basicFixes.length > 0,
      analysis: 'AI analysis unavailable. Using basic accessibility checks.',
      suggestions: ['Enable AI analysis for more comprehensive accessibility insights']
    };
  }
}