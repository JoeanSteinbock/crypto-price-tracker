import Link from "next/link";
import { Github, Twitter, Youtube } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 bg-gray-50 border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col justify-between items-center md:flex-row">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} CryptoTick.live. All rights reserved.
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
              Cryptocurrency data provided by CoinGecko API.
            </p>
          </div>
          
          <div className="flex flex-col gap-4 items-center sm:flex-row">
            <div className="flex gap-3">
              <Link 
                href="https://www.youtube.com/@CryptoTickLive" 
                target="_blank"
                className="text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                aria-label="YouTube Channel"
              >
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
            
            <div className="flex gap-4 text-sm">
              <Link 
                href="mailto:info@cryptotick.live"
                className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 