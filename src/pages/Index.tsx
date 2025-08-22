import { useState } from "react";
import Header from "@/components/Header";
import CodeEditor from "@/components/CodeEditor";
import ResultsPanel from "@/components/ResultsPanel";
import { fixAccessibility, FixResult } from "@/lib/accessibility-fixer";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [sourceCode, setSourceCode] = useState('');
  const [result, setResult] = useState<FixResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!sourceCode.trim()) {
      toast({
        title: "No code provided",
        description: "Please paste some JSX or HTML code to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call delay for better UX
    setTimeout(() => {
      try {
        const fixResult = fixAccessibility(sourceCode);
        setResult(fixResult);
        
        if (fixResult.hasChanges) {
          toast({
            title: "Analysis complete",
            description: `Found and fixed ${fixResult.fixes.length} accessibility ${fixResult.fixes.length === 1 ? 'issue' : 'issues'}`,
          });
        } else {
          toast({
            title: "Great job!",
            description: "No accessibility issues detected in your code",
          });
        }
      } catch (error) {
        console.error('Analysis error:', error);
        toast({
          title: "Analysis failed", 
          description: "An error occurred while analyzing your code",
          variant: "destructive",
        });
      } finally {
        setIsAnalyzing(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-120px)]">
          {/* Input Panel */}
          <Card className="flex flex-col shadow-elegant">
            <CodeEditor
              value={sourceCode}
              onChange={setSourceCode}
              onAnalyze={handleAnalyze}
              isLoading={isAnalyzing}
            />
          </Card>

          {/* Results Panel */}
          <Card className="flex flex-col shadow-elegant">
            <ResultsPanel
              originalCode={sourceCode}
              result={result}
              isLoading={isAnalyzing}
            />
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-xs text-muted-foreground">
          <div className="space-y-2">
            <p>
              Built for frontend developers who care about accessibility. 
              <span className="text-primary ml-1 font-medium">Make the web accessible for everyone.</span>
            </p>
            <p>
              Supports JSX, HTML, and React components. More features coming soon.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;