import { Link, useLocation } from "wouter";
import { Home, Info, Menu, X, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Sidebar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Inicio", icon: Home },
    { href: "/about", label: "Acerca de", icon: Info },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 text-white flex items-center justify-center font-bold">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <span className="font-heading font-bold text-lg hidden sm:inline">TrendTees</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <div
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer
                      ${
                        isActive
                          ? "text-primary font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      }
                    `}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="sm">
              Login
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Comprar
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-8">
                {links.map((link) => {
                  const Icon = link.icon;
                  const isActive = location === link.href;
                  return (
                    <Link key={link.href} href={link.href}>
                      <div
                        className={`
                          flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer
                          ${
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:text-foreground"
                          }
                        `}
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon className="h-4 w-4" />
                        {link.label}
                      </div>
                    </Link>
                  );
                })}
                <div className="border-t pt-4 space-y-2">
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Comprar
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
