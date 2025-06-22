
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
const homeLink = { href: '/', label: 'Home', icon: <Lightbulb className="mr-2 h-5 w-5" /> };

const aboutMeTitle = 'About Me';
const aboutMeLinks = [
  { href: '/experience', label: 'Experience', icon: <Briefcase className="mr-2 h-5 w-5" /> },
  { href: '/education', label: 'Education', icon: <GraduationCap className="mr-2 h-5 w-5" /> },
  { href: '/skills', label: 'Skills', icon: <Users className="mr-2 h-5 w-5" /> },
];

const projectsLink = { href: '/projects', label: 'Projects', icon: <Code className="mr-2 h-5 w-5" /> };
const blogLink = { 
  href: 'https://dms-r.medium.com', 
  label: 'Blog', 
  icon: <BookOpen className="mr-2 h-5 w-5" />, 
  target: '_blank' 
};
const contactLink = { href: '/contact', label: 'Contact', icon: <Mail className="mr-2 h-5 w-5" /> };

const navLinks = [
  homeLink,
  // "About Me" is handled separately
  projectsLink,
  blogLink,
  contactLink,
];

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
  
  const NavButton = ({ href, label }: { href: string; label: string }) => (
    <Button
      variant="ghost"
      asChild
      className={cn(
        "text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors px-3 lg:px-4 py-2",
        pathname === href && "bg-muted text-foreground"
      )}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );

  const ExternalNavButton = ({ href, label }: { href: string; label: string }) => (
     <Button
      variant="ghost"
      asChild
      className="text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors px-3 lg:px-4 py-2"
    >
      <Link href={href} target="_blank" rel="noopener noreferrer">{label}</Link>
    </Button>
  );
  
  const MobileNavLink = ({ href, label, icon, onClose }: { href: string; label: string; icon: React.ReactNode; onClose: () => void; }) => (
     <Link
        href={href}
        onClick={onClose}
        className={cn(
          "flex items-center rounded-md p-3 text-base font-medium transition-colors hover:bg-muted",
          pathname === href ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
        )}
      >
        {icon}
        {label}
      </Link>
  );
  
  const MobileExternalNavLink = ({ href, label, icon, target, onClose }: { href: string; label: string; icon: React.ReactNode; target?: string, onClose: () => void; }) => (
    <Link
      href={href}
      target={target}
      rel="noopener noreferrer"
      onClick={onClose}
      className="flex items-center rounded-md p-3 text-base font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
    >
      {icon}
      {label}
    </Link>
  );


  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300 border-b",
      isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-background/60 backdrop-blur-sm"
    )}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-3xl font-headline font-bold text-primary hover:text-accent transition-colors" aria-label="dpublic Home">
          dpublic
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          <NavButton href={homeLink.href} label={homeLink.label} />
          
          {/* About Me Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className={cn("flex items-center text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors px-3 lg:px-4 py-2",
                isAboutMeActive && "bg-muted text-foreground"
              )}>
                {aboutMeTitle} <ChevronDown className="ml-1 h-4 w-4" />
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

          <NavButton href={projectsLink.href} label={projectsLink.label} />
          <ExternalNavButton href={blogLink.href} label={blogLink.label} />
          <NavButton href={contactLink.href} label={contactLink.label} />
          
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
            <SheetContent side="right" className="w-[280px] bg-background p-4">
              <SheetHeader>
                 <SheetTitle asChild>
                    <Link href="/" onClick={() => setIsSheetOpen(false)} className="mb-4 text-2xl font-headline font-bold text-primary text-left">
                      dpublic
                    </Link>
                 </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-1 mt-4">
                <MobileNavLink href={homeLink.href} label={homeLink.label} icon={homeLink.icon} onClose={() => setIsSheetOpen(false)} />

                {/* About Me Accordion for mobile */}
                <Accordion type="single" collapsible className="w-full" defaultValue={isAboutMeActive ? "about-me" : undefined}>
                  <AccordionItem value="about-me" className="border-b-0">
                    <AccordionTrigger
                      className={cn(
                        "flex w-full items-center rounded-md p-3 text-base font-medium transition-colors hover:bg-muted hover:no-underline justify-start",
                        isAboutMeActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Users className="mr-2 h-5 w-5" />
                      {aboutMeTitle}
                    </AccordionTrigger>
                    <AccordionContent className="pl-4 pt-1">
                      {aboutMeLinks.map((link) => (
                        <MobileNavLink key={link.href} href={link.href} label={link.label} icon={link.icon} onClose={() => setIsSheetOpen(false)} />
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <MobileNavLink href={projectsLink.href} label={projectsLink.label} icon={projectsLink.icon} onClose={() => setIsSheetOpen(false)} />
                <MobileExternalNavLink href={blogLink.href} label={blogLink.label} icon={blogLink.icon} target={blogLink.target} onClose={() => setIsSheetOpen(false)} />
                <MobileNavLink href={contactLink.href} label={contactLink.label} icon={contactLink.icon} onClose={() => setIsSheetOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
