import { getAllTerms, getAllAcronyms } from "@/lib/data-loader";
import DictionaryApp from "@/components/DictionaryApp";

export const dynamic = "force-static";

export default function HomePage() {
  const terms = getAllTerms();
  const acronyms = getAllAcronyms();

  return (
    <DictionaryApp
      initialTerms={terms}
      initialAcronyms={acronyms}
    />
  );
}
