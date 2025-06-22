
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Menu, Briefcase, Code, Lightbulb, Users, Mail, GraduationCap, ChevronDown, BookOpen } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';

// Define navigation links
const mainNavLinks = [
  { href: '/', label: 'Home', icon: <Lightbulb className="mr-2 h-5 w-5" /> },
  { href: '/projects', label: 'Projects', icon: <Code className="mr-2 h-5 w-5" /> },
  { href: '/contact', label: 'Contact', icon: <Mail className="mr-2 h-5 w-5" /> },
];

const aboutMeLinks = [
  { href: '/experience', label: 'Experience', icon: <Briefcase className="mr-2 h-5 w-5" /> },
  { href: '/education', label: 'Education', icon: <GraduationCap className="mr-2 h-5 w-5" /> },
  { href: '/skills', label: 'Skills', icon: <Users className="mr-2 h-5 w-5" /> },
];

const blogLink = { 
  href: 'https://dms-r.medium.com', 
  label: 'Blog', 
  icon: <BookOpen className="mr-2 h-5 w-5" />, 
  target: '_blank' 
};

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAboutMeActive = aboutMeLinks.some(link => link.href === pathname);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300 border-b",
      isScrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-background/60 backdrop-blur-sm"
    )}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-3xl font-headline font-bold text-primary hover:text-accent transition-colors" aria-label="ElegantFolio Home">
          dpublic
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {mainNavLinks.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              asChild
              className={cn(
                "text-foreground hover:bg-accent/20 hover:text-accent transition-all duration-200 px-3 py-2 text-sm",
                pathname === link.href ? "text-accent font-semibold border-b-2 border-accent rounded-none" : ""
              )}
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}

          {/* About Me Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className={cn("flex items-center text-foreground hover:bg-accent/20 hover:text-accent transition-all duration-200 px-3 py-2 text-sm",
                isAboutMeActive && "text-accent font-semibold border-b-2 border-accent rounded-none"
              )}>
                About Me <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {aboutMeLinks.map(link => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href} className="flex items-center gap-2">
                    {link.icon}
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Blog Link */}
          <Button
            variant="ghost"
            asChild
            className="text-foreground hover:bg-accent/20 hover:text-accent transition-all duration-200 px-3 py-2 text-sm"
          >
            <Link href={blogLink.href} target={blogLink.target} rel="noopener noreferrer">{blogLink.label}</Link>
          </Button>
          
          <ThemeToggle className="ml-2" />
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <ThemeToggle className="mr-2" />
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                <Menu className="h-7 w-7 text-primary" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-background p-6">
              <SheetHeader>
                <SheetTitle className="sr-only">Main Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-1 mt-4">
                <SheetClose asChild>
                  <Link href="/" className="mb-4 text-2xl font-headline font-bold text-primary px-3">
                    ElegantFolio
                  </Link>
                </SheetClose>
                
                {mainNavLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center rounded-md p-3 text-lg font-medium transition-colors hover:bg-primary/10",
                          pathname === link.href ? "text-primary bg-primary/5" : "text-foreground"
                        )}
                      >
                        {link.icon}
                        {link.label}
                      </Link>
                  </SheetClose>
                ))}

                {/* About Me Accordion for mobile */}
                <Accordion type="single" collapsible className="w-full" defaultValue={isAboutMeActive ? "about-me" : undefined}>
                  <AccordionItem value="about-me" className="border-b-0">
                    <AccordionTrigger className="flex items-center rounded-md p-3 text-lg font-medium transition-colors hover:bg-primary/10 hover:no-underline [&[data-state=open]]:bg-primary/5">
                      <Users className="mr-2 h-5 w-5" />
                      About Me
                    </AccordionTrigger>
                    <AccordionContent className="pl-8">
                      {aboutMeLinks.map((link) => (
                        <SheetClose asChild key={link.href}>
                          <Link
                            href={link.href}
                            className={cn(
                              "flex items-center rounded-md py-2 px-3 text-base font-medium transition-colors hover:bg-primary/10",
                              pathname === link.href ? "text-primary bg-primary/5" : "text-foreground"
                            )}
                          >
                            {link.icon}
                            {link.label}
                          </Link>
                        </SheetClose>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <SheetClose asChild>
                  <Link
                    href={blogLink.href}
                    target={blogLink.target}
                    rel="noopener noreferrer"
                    className="flex items-center rounded-md p-3 text-lg font-medium transition-colors hover:bg-primary/10 text-foreground"
                  >
                    {blogLink.icon}
                    {blogLink.label}
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
