import { HeroSection } from "@/features/home";

export const revalidate = 60;

export default function Page() {
  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden">
      <div className="h-full flex items-center justify-center">
        <HeroSection />
      </div>
    </div>
  );
}
