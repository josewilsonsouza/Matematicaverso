import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ArrowLeft, Menu, X } from 'lucide-react';

interface NavigationHeaderProps {
  showBackButton?: boolean;
}

const NavigationHeader: React.FC<NavigationHeaderProps> = ({ showBackButton = false }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 glassmorphism">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {showBackButton && (
            <Link to="/" className="p-2 rounded-full glassmorphism hover:bg-white/20 transition-colors">
              <ArrowLeft className="h-5 w-5 text-white" />
            </Link>
          )}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 animate-pulse"></div>
            <h1 className="text-xl font-display font-bold space-text-gradient">Matematic∂verso</h1>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/" active={isHomePage}>Home</NavLink>
          <NavLink to="/about" active={location.pathname === '/about'}>About</NavLink>
          <NavLink to="/explore" active={location.pathname === '/explore'}>Explore</NavLink>
        </nav>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-full glassmorphism hover:bg-white/20 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5 text-white" />
          ) : (
            <Menu className="h-5 w-5 text-white" />
          )}
        </button>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-space-deep/95 z-40 animate-fade-in">
          <div className="flex flex-col p-6 space-y-4">
            <MobileNavLink to="/" active={isHomePage} onClick={() => setMobileMenuOpen(false)}>Home</MobileNavLink>
            <MobileNavLink to="/about" active={location.pathname === '/about'} onClick={() => setMobileMenuOpen(false)}>About</MobileNavLink>
            <MobileNavLink to="/explore" active={location.pathname === '/explore'} onClick={() => setMobileMenuOpen(false)}>Explore</MobileNavLink>
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, active, children }) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "text-sm font-medium transition-colors hover:text-white/90",
        active ? "text-white" : "text-white/70"
      )}
    >
      {children}
    </Link>
  );
};

interface MobileNavLinkProps extends NavLinkProps {
  onClick?: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, active, onClick, children }) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center text-base font-medium py-2 transition-colors hover:text-white",
        active ? "text-white" : "text-white/70"
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default NavigationHeader;
