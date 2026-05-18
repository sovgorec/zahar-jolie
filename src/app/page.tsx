import { HomePage } from "@/components/home/home-page";
import { PageTransition } from "@/components/motion/page-transition";

export default function Page() {
  return (
    <PageTransition>
      <HomePage />
    </PageTransition>
  );
}
