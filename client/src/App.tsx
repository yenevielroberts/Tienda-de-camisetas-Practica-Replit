import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/Sidebar";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";

function Router() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Sidebar />
      
      {/* Main Content Area - Shifted by sidebar width on desktop */}
      <main className="md:pl-64 min-h-screen transition-all duration-300">
        <div className="container mx-auto px-4 py-20 md:py-12 md:px-8 max-w-7xl">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
