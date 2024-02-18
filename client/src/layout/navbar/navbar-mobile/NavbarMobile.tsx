import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import NavbarSidebar from "../navbar-sidebar/NavbarSidebar";

type Props = {
  className?: string;
};

const NavbarMobile = ({ className = "" }: Props) => {
  return (
    <div className={className}>
      <Sheet>
        <SheetTrigger className="p-2">
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0">
          <SheetHeader className="p-5">
            <div className="flex justify-start">
              <Link to="/" className="font-semibold">
                Ai Adlibs
              </Link>
            </div>
          </SheetHeader>
          <div className="p-1">
            <NavbarSidebar />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavbarMobile;
