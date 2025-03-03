export default function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          {/* Brand Column */}
          <div>
            <h3 className="text-xl font-bold uppercase">Ai Adlibs</h3>
            <p className="mt-4 text-sm">Online Competitive Coding</p>
          </div>
          {/* Documentation Links */}
          <div>
            <h4 className="mb-4 font-semibold">Documentation</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground text-sm">
                  Getting Started
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground text-sm">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground text-sm">
                  Integrations
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground text-sm">
                  Examples
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground text-sm">
                  SDKs
                </a>
              </li>
            </ul>
          </div>
          {/* Resources Links */}
          <div>
            <h4 className="mb-4 font-semibold">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground text-sm">
                  Changelog
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground text-sm">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground text-sm">
                  Status
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground text-sm">
                  Webhooks
                </a>
              </li>
            </ul>
          </div>
          {/* Company Links */}
          <div>
            <h4 className="mb-4 font-semibold">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground text-sm">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground text-sm">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground text-sm">
                  Customers
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground text-sm">
                  Brand
                </a>
              </li>
            </ul>
          </div>
          {/* Legal Links */}
          <div>
            <h4 className="mb-4 font-semibold">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground text-sm">
                  Acceptable Use
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground text-sm">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Bottom Copyright and Socials */}
      <div className="text-muted-foreground border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-4 py-4 sm:px-6 md:flex-row lg:px-8">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Algowars. All rights reserved.
          </p>
          <div className="mt-4 flex space-x-4 md:mt-0">
            <a href="#" className="">
              <span className="sr-only">Facebook</span>
              {/* Insert your Facebook icon SVG or component here */}
            </a>
            <a href="#" className="">
              <span className="sr-only">Twitter</span>
              {/* Insert your Twitter icon SVG or component here */}
            </a>
            <a href="#" className="">
              <span className="sr-only">LinkedIn</span>
              {/* Insert your LinkedIn icon SVG or component here */}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
