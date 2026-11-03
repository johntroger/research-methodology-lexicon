import type { Metadata } from "next";
import LandingHomePage from "@/components/LandingHomePage";

export const metadata: Metadata = {
  title: "About & Overview | Research Methodology Lexicon",
  description:
    "Overview of the Research Methodology Lexicon: 1,872 peer-reviewed methodology terms, 148 statistical acronyms, empirical benchmarks, reviewer pitfalls, and verified APA 7th / BibTeX citations.",
  alternates: {
    canonical: "/about"
  }
};

export default function AboutPage() {
  return <LandingHomePage />;
}
