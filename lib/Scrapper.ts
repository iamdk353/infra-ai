import axios from "axios";
import * as cheerio from "cheerio";

function cleanText(text: string): string {
  return text
    .replace(/\[[0-9,\s]+\]/g, "") // remove [32], [33], [12,13] style refs
    .replace(/\s+/g, " ") // collapse multiple spaces/newlines
    .trim();
}

export async function scrapeToText(url: string): Promise<string> {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const base = new URL(url);
  const chunks: string[] = [];

  // Title
  const pageTitle = cleanText($("title").text());
  if (pageTitle) chunks.push(pageTitle);

  // Headings + Paragraphs + Lists
  $("h1, h2, h3, p, li").each((_, el) => {
    const text = cleanText($(el).text());
    if (text) chunks.push(text);
  });

  // Internal links (only text, no hrefs)
  const seen = new Set<string>();
  $("a").each((_, el) => {
    const text = cleanText($(el).text());
    const href = $(el).attr("href");
    if (text && href) {
      try {
        const absUrl = new URL(href, url);
        if (absUrl.hostname === base.hostname && !seen.has(text)) {
          seen.add(text);
          chunks.push(text);
        }
      } catch {
        /* ignore invalid */
      }
    }
  });

  // ✅ Continuous clean text, RAG-friendly
  return chunks.join(" ");
}
