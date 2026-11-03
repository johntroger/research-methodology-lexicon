import type { Metadata } from "next";
import LandingHomePage from "@/components/LandingHomePage";
import { getLexiconStats } from "@/lib/data-loader";

export const metadata: Metadata = {
  title: "About & Overview | Research Methodology Lexicon",
  description:
    "Overview of the Research Methodology Lexicon: Peer-reviewed methodology terms, statistical acronyms, empirical benchmarks, reviewer pitfalls, and verified APA 7th / BibTeX citations.",
  alternates: {
    canonical: "/about"
  }
};

export default function AboutPage() {
  const stats = getLexiconStats();
  return <LandingHomePage initialStats={stats} />;
}
