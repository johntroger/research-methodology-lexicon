import type { Metadata } from "next";
import JournalSearchPage from "@/components/JournalSearchPage";

export const metadata: Metadata = {
  title: "Scholarly Journal Integrity & Index Verifier | VNResearch Dictionary",
  description:
    "Verify Scopus Quartile (Q1–Q4), Web of Science status, Scopus Discontinued Titles, Hijacked Journals, ABDC rankings, and Vietnam HĐGSNN professorial scoring.",
  alternates: {
    canonical: "/journals"
  }
};

export default function JournalsRoute() {
  return <JournalSearchPage />;
}
