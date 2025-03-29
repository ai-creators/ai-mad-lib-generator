import Container from "../containers/container";

export default function Footer() {
  return (
    <footer>
      {/* <Container className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
         
          <div>
            <h3 className="text-xl font-bold uppercase">Ai Adlibs</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Ai Generated Adlibs
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">Documentation</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground">
                  Getting Started
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground">
                  Integrations
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground">
                  Examples
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground">
                  SDKs
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground">
                  Changelog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground">
                  Status
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground">
                  Webhooks
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground">
                  Customers
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground">
                  Brand
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground">
                  Acceptable Use
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container> */}
      {/* Bottom Copyright and Socials */}
      <div className="border-t text-muted-foreground">
        <Container className="flex flex-col items-center justify-center px-4 py-4 text-center sm:px-6 md:flex-row lg:px-8">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} AiAdlibs. All rights reserved.
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
        </Container>
      </div>
    </footer>
  );
}
