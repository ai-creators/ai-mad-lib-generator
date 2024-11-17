import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type Props = {
  showUnderYOffset?: number;
  className?: string;
  hasAnimation?: boolean;
};

const ScrollTopButton = ({
  showUnderYOffset = 300,
  className = "",
  hasAnimation = false,
}: Props) => {
  const [showTopBtn, setShowTopBtn] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > showUnderYOffset) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showUnderYOffset]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!showTopBtn) return null;

  return (
    <Button
      onClick={scrollToTop}
      className={`${className} ${
        hasAnimation ? "animate-bounce" : ""
      } fixed bottom-8 right-8 w-10 h-10 z-50 rounded-full`}
      aria-label="Scroll to top"
    >
      ↑
    </Button>
  );
};

export default ScrollTopButton;
