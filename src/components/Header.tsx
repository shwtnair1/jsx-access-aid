import { Accessibility, Github, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Accessibility className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Accessibility Fixer</h1>
              <p className="text-xs text-muted-foreground">Automated JSX/HTML accessibility improvements</p>
            </div>
            <Badge variant="secondary" className="ml-2 text-xs">
              Beta
            </Badge>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open('https://github.com', '_blank')}
              className="text-sm"
            >
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://buymeacoffee.com', '_blank')}
              className="text-sm border-primary/20 hover:border-primary/40"
            >
              <Heart className="h-4 w-4 mr-2 text-red-500" />
              Support
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;