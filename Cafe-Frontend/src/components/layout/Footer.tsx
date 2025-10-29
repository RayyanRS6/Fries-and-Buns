const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8 text-sm text-muted-foreground flex items-center justify-between">
        <p>
          © {new Date().getFullYear()} Fries & Buns. All rights reserved.
        </p>
        <nav className="flex gap-4">
          <a href="#privacy" className="hover:text-foreground motion-smooth">Privacy</a>
          <a href="#terms" className="hover:text-foreground motion-smooth">Terms</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
