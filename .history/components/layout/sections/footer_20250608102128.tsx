import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export const FooterSection = () => {
  return (
    <footer id="footer" className="container py-24 sm:py-32">
      <div className="p-10 bg-card border border-secondary rounded-2xl">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-8">
            <Link 
              href="/privacy-policy" 
              className="opacity-60 hover:opacity-100 text-lg font-medium"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms-of-use" 
              className="opacity-60 hover:opacity-100 text-lg font-medium"
            >
              Terms of Use
            </Link>
            <Link 
              href="/about" 
              className="opacity-60 hover:opacity-100 text-lg font-medium"
            >
              About
            </Link>
          </div>

          <Separator className="my-6" />
          
          <section className="text-center">
            <h3 className="text-sm opacity-60">
              &copy; 2024 AI Try-On. All rights reserved.
            </h3>
          </section>
        </div>
      </div>
    </footer>
  );
};
