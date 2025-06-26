"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../shared/Logo";

const Footer = () => {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];

  const handlePdfOpen = (pdfName: string) => {
    // Placeholder for PDF opening functionality
    window.open(`/pdfs/${pdfName}.pdf`, "_blank");
  };

  return (
    <footer className="w-full bg-secondary-50 dark:bg-secondary-900 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 lg:col-span-1">
            <Logo className="mb-4" />
            <p className="text-secondary-600 dark:text-secondary-300 mt-4">
              Empowering businesses with innovative solutions and cutting-edge
              technology.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/${currentLocale}/faq`}
                  className="text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href={`/${currentLocale}/careers`}
                  className="text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => handlePdfOpen("legal-disclaimer")}
                  className="text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Legal Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePdfOpen("privacy-policy")}
                  className="text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePdfOpen("terms-conditions")}
                  className="text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="text-secondary-600 dark:text-secondary-300">
                Email: contact@company.com
              </li>
              <li className="text-secondary-600 dark:text-secondary-300">
                Phone: +1 (555) 123-4567
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-secondary-200 dark:border-secondary-700">
          <p className="text-center text-secondary-600 dark:text-secondary-300">
            © {new Date().getFullYear()} Company Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
