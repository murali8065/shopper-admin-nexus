
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-16 border-t bg-card">
      <div className="container mx-auto px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-primary">Furniture Marketplace</h3>
            <p className="text-muted-foreground">
              Discover quality furniture for your home or office, connecting buyers and sellers with a passion for interior design.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-primary">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-primary">Shop</Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-primary">Categories</Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-primary">Offers</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold">Customer Service</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link to="/contact" className="hover:text-primary">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary">FAQ</Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-primary">Shipping</Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-primary">Returns</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold">Newsletter</h3>
            <p className="mb-4 text-muted-foreground">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full rounded-l-md border border-r-0 border-gray-300 bg-background p-2 focus:outline-none"
              />
              <button className="rounded-r-md bg-primary px-4 py-2 text-primary-foreground">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© 2023 Furniture Marketplace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
