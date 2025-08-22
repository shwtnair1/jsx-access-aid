import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Copy, Download, CheckCircle2, AlertTriangle, FileText, GitCompare } from "lucide-react";
import { FixResult, generateDiff } from "@/lib/accessibility-fixer";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ResultsPanelProps {
  originalCode: string;
  result: FixResult | null;
  isLoading?: boolean;
}

const ResultsPanel = ({ originalCode, result, isLoading = false }: ResultsPanelProps) => {
  const { toast } = useToast();

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${label} copied to clipboard`,
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const downloadCode = () => {
    if (!result) return;
    
    const blob = new Blob([result.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'accessibility-fixed.jsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const diff = result ? generateDiff(originalCode, result.code) : [];
  const fixesByCategory = result ? result.fixes.reduce((acc, fix) => {
    if (!acc[fix.category]) acc[fix.category] = [];
    acc[fix.category].push(fix);
    return acc;
  }, {} as Record<string, typeof result.fixes>) : {};

  if (isLoading) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b bg-card">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-sm">Analysis Results</h3>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-sm text-muted-foreground">Analyzing accessibility issues...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b bg-card">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold text-sm text-muted-foreground">Analysis Results</h3>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto">
              <FileText className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Paste your code and click "Fix Accessibility" to see results</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center gap-3">
          <FileText className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-sm">Analysis Results</h3>
          {result.hasChanges ? (
            <Badge variant="default" className="bg-success text-success-foreground">
              {result.fixes.length} fixes applied
            </Badge>
          ) : (
            <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              No issues found
            </Badge>
          )}
        </div>
        {result.hasChanges && (
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => copyToClipboard(result.code, "Fixed code")}
              className="text-xs"
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={downloadCode}
              className="text-xs"
            >
              <Download className="h-3 w-3 mr-1" />
              Download
            </Button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="changes" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3 m-4 mb-0">
          <TabsTrigger value="changes" className="text-xs">
            <GitCompare className="h-3 w-3 mr-1" />
            Changes ({result.fixes.length})
          </TabsTrigger>
          <TabsTrigger value="diff" className="text-xs">
            <FileText className="h-3 w-3 mr-1" />
            Diff View
          </TabsTrigger>
          <TabsTrigger value="code" className="text-xs">
            <Copy className="h-3 w-3 mr-1" />
            Fixed Code
          </TabsTrigger>
        </TabsList>

        {/* Changes Tab */}
        <TabsContent value="changes" className="flex-1 p-4 pt-2 overflow-auto custom-scroll">
          {result.fixes.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-3">
                <CheckCircle2 className="h-12 w-12 text-success mx-auto" />
                <div>
                  <h4 className="font-medium text-success">Great job!</h4>
                  <p className="text-sm text-muted-foreground">No accessibility issues detected in your code.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(fixesByCategory).map(([category, fixes]) => (
                <Card key={category} className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="h-4 w-4 text-warning" />
                    <h4 className="font-medium text-sm">{category}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {fixes.length} {fixes.length === 1 ? 'fix' : 'fixes'}
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    {fixes.map((fix, index) => (
                      <div key={index} className="border-l-2 border-success/30 pl-3 py-1">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">{fix.action}</p>
                            <p className="text-xs text-muted-foreground">{fix.summary}</p>
                            <code className="text-xs bg-muted px-2 py-1 rounded">
                              {fix.selector}
                            </code>
                          </div>
                          {fix.line && (
                            <Badge variant="outline" className="text-xs">
                              Line {fix.line}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Diff Tab */}
        <TabsContent value="diff" className="flex-1 p-4 pt-2 overflow-auto custom-scroll">
          <div className="bg-code-background rounded-lg border">
            <div className="p-3 border-b border-code-muted/20">
              <h4 className="text-sm font-medium text-code-foreground">Code Diff</h4>
            </div>
            <div className="p-0">
              {diff.map((line, index) => (
                <div 
                  key={index} 
                  className={`px-4 py-1 text-xs font-mono border-l-4 ${
                    line.type === 'added' 
                      ? 'bg-success/10 border-success text-success' 
                      : line.type === 'removed' 
                      ? 'bg-error/10 border-error text-error' 
                      : 'bg-code-background border-transparent text-code-foreground'
                  }`}
                >
                  <span className="inline-block w-6 text-code-muted mr-3">
                    {line.lineNumber}
                  </span>
                  <span className="inline-block w-4 mr-2">
                    {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
                  </span>
                  {line.content}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Fixed Code Tab */}
        <TabsContent value="code" className="flex-1 p-4 pt-2">
          <Textarea
            value={result.code}
            readOnly
            className="h-full resize-none code-editor text-sm font-mono bg-code-background text-code-foreground custom-scroll"
            style={{ minHeight: '400px' }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsPanel;