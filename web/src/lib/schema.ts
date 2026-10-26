import { z } from "zod";

export const CorpusVariantSchema = z.object({
  v: z.string(),
  vn: z.string(),
  rel: z.string().optional(),
  src: z.string().optional(),
  rel_en: z.string().optional(),
});

export const MethodologyTermSchema = z.object({
  id: z.string().min(1, "ID không được để trống"),
  term: z.string().min(1, "Thuật ngữ không được để trống"),
  ipa: z.string().optional().default(""),
  part_of_speech: z.string().optional().default("Noun"),
  vietnamese: z.string().min(1, "Bản dịch tiếng Việt không được để trống"),
  vietnamese_variants: z.array(z.string()).optional().default([]),
  domain_tags: z.array(z.string()).optional().default(["Phương pháp Nghiên cứu"]),
  category: z.string().optional().default(""),
  core_definition: z.string().min(1, "Định nghĩa cốt lõi không được để trống"),
  operational_mechanism: z.string().optional().default(""),
  paradigm_debates: z.string().optional().default(""),
  benchmarks: z.string().optional().default(""),
  pitfalls: z.string().optional().default(""),
  academic_example: z.string().optional().default(""),
  syntactic_patterns: z.string().optional().default(""),
  apa_reporting_rules: z.string().optional().default(""),
  reporting_tips: z.string().optional().default(""),
  vietnam_contextual_note: z.string().optional().default(""),
  seminal_citation: z.string().optional().default(""),
  apa_intext: z.string().optional().default(""),
  apa_reference: z.string().optional().default(""),
  corpus_variants: z.array(CorpusVariantSchema).optional().default([]),
  related_terms: z.array(z.string()).optional().default([]),
  tier: z.string().optional().default("flagship"),
  is_flagship: z.boolean().optional(),
  // English Monolingual Fields
  core_definition_en: z.string().optional(),
  operational_mechanism_en: z.string().optional(),
  benchmarks_en: z.string().optional(),
  pitfalls_en: z.string().optional(),
  paradigm_debates_en: z.string().optional(),
  domain_tags_en: z.array(z.string()).optional(),
}).passthrough();

export const AcademicAcronymSchema = z.object({
  full_name: z.string(),
  vietnamese: z.string(),
  purpose: z.string(),
  benchmark: z.string().optional().default(""),
  domain: z.string().optional(),
  purpose_en: z.string().optional(),
  benchmark_en: z.string().optional(),
  domain_en: z.string().optional(),
}).passthrough();

export const LexiconDatasetSchema = z.object({
  version: z.string().optional().default("1.0.0"),
  last_updated: z.string().optional().default(""),
  terms: z.array(MethodologyTermSchema),
});
