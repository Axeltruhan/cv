import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import TemplateSelection from "@/pages/TemplateSelection";
import { useEffect, useState } from "react";

// Componente che controlla se l'utente ha già selezionato un template
function HomeRedirect() {
  const [loading, setLoading] = useState(true);
  const [redirectTo, setRedirectTo] = useState("/templates");
  
  useEffect(() => {
    // Controlla se l'utente ha già selezionato un template
    const selectedTemplate = localStorage.getItem('selectedTemplate');
    if (selectedTemplate) {
      setRedirectTo("/editor");
    } else {
      setRedirectTo("/templates");
    }
    setLoading(false);
  }, []);
  
  if (loading) {
    return <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }
  
  return <Redirect to={redirectTo} />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomeRedirect} />
      <Route path="/templates" component={TemplateSelection} />
      <Route path="/editor" component={Home} />
      <Route component={NotFound} />
    </Switch>
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
