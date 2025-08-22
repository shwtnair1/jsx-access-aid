export interface AccessibilityFix {
  category: 'Images' | 'Interactive Elements' | 'Forms' | 'Navigation';
  action: string;
  selector: string;
  summary: string;
  line?: number;
}

export interface FixResult {
  code: string;
  fixes: AccessibilityFix[];
  hasChanges: boolean;
}

/**
 * Main accessibility fixer function
 * Analyzes JSX/HTML code and applies common accessibility fixes
 */
export function fixAccessibility(sourceCode: string): FixResult {
  const fixes: AccessibilityFix[] = [];
  let code = sourceCode;
  let lineOffset = 0;

  // Helper to track line numbers
  const getLineNumber = (index: number): number => {
    return sourceCode.substring(0, index).split('\n').length + lineOffset;
  };

  // Fix 1: <img> tags without alt attribute
  code = code.replace(/<img(?![^>]*\balt\s*=)([^>]*?)>/gi, (match, attrs, offset) => {
    fixes.push({
      category: 'Images',
      action: 'Added alt attribute',
      selector: `img${attrs.includes('src') ? `[src]` : ''}`,
      summary: 'Added empty alt attribute for decorative image',
      line: getLineNumber(offset)
    });
    return `<img${attrs} alt="">`;
  });

  // Fix 2: <button> with only SVG child - add aria-label
  code = code.replace(/<button(?![^>]*\baria-label\s*=)([^>]*?)>\s*<svg[^>]*>.*?<\/svg>\s*<\/button>/gis, (match, attrs, offset) => {
    fixes.push({
      category: 'Interactive Elements',
      action: 'Added aria-label',
      selector: 'button > svg',
      summary: 'Added aria-label for button with only SVG content',
      line: getLineNumber(offset)
    });
    return match.replace('<button', '<button aria-label="Button"');
  });

  // Fix 3: <a> tags with no text content - add aria-label
  code = code.replace(/<a(?![^>]*\baria-label\s*=)([^>]*?)>\s*(?:<[^>]*>)*\s*<\/a>/gi, (match, attrs, offset) => {
    // Check if there's actual text content
    const textContent = match.replace(/<[^>]*>/g, '').trim();
    if (!textContent) {
      fixes.push({
        category: 'Navigation',
        action: 'Added aria-label',
        selector: 'a[href]',
        summary: 'Added aria-label for link without text content',
        line: getLineNumber(offset)
      });
      return match.replace('<a', '<a aria-label="Link"');
    }
    return match;
  });

  // Fix 4: <div> with onClick - add role="button" and tabIndex="0"
  code = code.replace(/<div(?![^>]*\brole\s*=)([^>]*?)onClick\s*=\s*[^>]*?>/gi, (match, beforeOnClick, offset) => {
    let replacement = match;
    
    if (!replacement.includes('role=')) {
      replacement = replacement.replace('<div', '<div role="button"');
    }
    
    if (!replacement.includes('tabIndex')) {
      replacement = replacement.replace('<div', '<div tabIndex={0}');
    }

    fixes.push({
      category: 'Interactive Elements',
      action: 'Added role and tabIndex',
      selector: 'div[onClick]',
      summary: 'Made clickable div keyboard accessible',
      line: getLineNumber(offset)
    });

    return replacement;
  });

  // Fix 5: <input> without label or aria-label
  code = code.replace(/<input(?![^>]*\b(?:aria-label|id)\s*=)([^>]*?)(?:\s*\/>|>\s*<\/input>)/gi, (match, attrs, offset) => {
    // Skip if there's a label with for attribute that might match
    const hasAssociatedLabel = /<label[^>]*\bfor\s*=\s*["'][^"']*["']/.test(sourceCode);
    
    if (!hasAssociatedLabel) {
      fixes.push({
        category: 'Forms',
        action: 'Added aria-label',
        selector: 'input',
        summary: 'Added aria-label for input without associated label',
        line: getLineNumber(offset)
      });
      
      if (match.endsWith('/>')) {
        return match.replace('/>', ' aria-label="Input" />');
      } else {
        return match.replace('>', ' aria-label="Input">');
      }
    }
    return match;
  });

  return {
    code: code.trim(),
    fixes,
    hasChanges: fixes.length > 0
  };
}

/**
 * Generate a simple diff view between original and fixed code
 */
export function generateDiff(original: string, fixed: string): Array<{
  type: 'added' | 'removed' | 'unchanged';
  content: string;
  lineNumber?: number;
}> {
  const originalLines = original.split('\n');
  const fixedLines = fixed.split('\n');
  
  const diff: Array<{
    type: 'added' | 'removed' | 'unchanged';
    content: string;
    lineNumber?: number;
  }> = [];
  
  let originalIndex = 0;
  let fixedIndex = 0;
  
  while (originalIndex < originalLines.length || fixedIndex < fixedLines.length) {
    const originalLine = originalLines[originalIndex] || '';
    const fixedLine = fixedLines[fixedIndex] || '';
    
    if (originalLine === fixedLine) {
      diff.push({
        type: 'unchanged',
        content: originalLine,
        lineNumber: originalIndex + 1
      });
      originalIndex++;
      fixedIndex++;
    } else if (originalIndex >= originalLines.length) {
      diff.push({
        type: 'added',
        content: fixedLine,
        lineNumber: fixedIndex + 1
      });
      fixedIndex++;
    } else if (fixedIndex >= fixedLines.length) {
      diff.push({
        type: 'removed',
        content: originalLine,
        lineNumber: originalIndex + 1
      });
      originalIndex++;
    } else {
      // Simple heuristic: if next line matches, this line was changed
      if (originalLines[originalIndex + 1] === fixedLines[fixedIndex + 1]) {
        diff.push({
          type: 'removed',
          content: originalLine,
          lineNumber: originalIndex + 1
        });
        diff.push({
          type: 'added',
          content: fixedLine,
          lineNumber: fixedIndex + 1
        });
        originalIndex++;
        fixedIndex++;
      } else {
        diff.push({
          type: 'unchanged',
          content: originalLine,
          lineNumber: originalIndex + 1
        });
        originalIndex++;
        fixedIndex++;
      }
    }
  }
  
  return diff;
}