import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Play, Code, Upload } from "lucide-react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  onAnalyze: () => void;
  isLoading?: boolean;
}

const CodeEditor = ({ value, onChange, onAnalyze, isLoading = false }: CodeEditorProps) => {
  const handlePaste = (e: React.ClipboardEvent) => {
    // Enhanced paste handling
    const pastedText = e.clipboardData.getData('text');
    if (pastedText) {
      onChange(pastedText);
    }
  };

  const loadSampleCode = () => {
    const sampleCode = `<div className="user-profile">
  <img src="/avatar.jpg" className="avatar">
  <div className="info">
    <h2>John Doe</h2>
    <button onClick={handleEdit}>
      <svg viewBox="0 0 24 24">
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/>
      </svg>
    </button>
  </div>
  <div onClick={handleClick} className="clickable-area">
    Click me
  </div>
  <form>
    <input type="email" placeholder="Enter email">
    <input type="password" placeholder="Password">
  </form>
  <a href="/profile">
    <svg viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  </a>
</div>`;
    onChange(sampleCode);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center gap-2">
          <Code className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-sm">Input Code</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={loadSampleCode}
            className="text-xs"
          >
            <Upload className="h-3 w-3 mr-1" />
            Sample
          </Button>
          <Button 
            onClick={onAnalyze}
            disabled={isLoading || !value.trim()}
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          >
            <Play className="h-3 w-3 mr-1" />
            {isLoading ? 'Analyzing...' : 'Fix Accessibility'}
          </Button>
        </div>
      </div>

      {/* Code Input */}
      <div className="flex-1 p-4">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onPaste={handlePaste}
          placeholder="Paste your JSX or HTML code here..."
          className="h-full resize-none code-editor text-sm font-mono border-0 focus-visible:ring-0 bg-code-background text-code-foreground placeholder:text-code-muted custom-scroll"
          style={{
            minHeight: '400px'
          }}
        />
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t bg-muted/30 text-xs text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>Lines: {value.split('\n').length}</span>
          <span>Characters: {value.length}</span>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;