import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bottom-0 left-0 w-full px-12 border-t border-[#443149]/60 bg-background py-4 z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        {/* Gauche */}
        <div className="md:flex-1 text-center md:text-left">
          © The 12th Door
        </div>

        {/* Centre */}
        <div className="space-x-4 text-center">
          <Link href="#" className="hover:underline">
            Terms of Service
          </Link>
          <Link href="#" className="hover:underline">
            Privacy Policy
          </Link>
        </div>

        {/* Droite */}
        <div className="md:flex-1 text-center md:text-right">
          {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
