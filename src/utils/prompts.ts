import { TranslationMatch } from "@/types";

export function createTranslationPrompt(
  segment: string | null,
  examples: TranslationMatch | null
) {
  if (!segment || !examples) {
    throw new Error("Source segment or examples is/are missing");
  }

  let examplesString = "";
  examples.matches.forEach((match) => {
    examplesString += `
    Dutch (Source):
    ${match.sourceText}

    French (Target):
    ${match.targetText}
    `;
  });

  return `
  Below are some key instructions for translating legal texts:
  - Use the exact legal terminology from the examples provided.
  - For fixed expressions and terms that have legal equivalents in the target language (French in this case), use the same translations provided in the examples.
  - If a term in the new sentence corresponds to one in the examples, use the same term from the example translation, even if a more general translation exists.
  - Ensure that the translation follows the same formal, legal tone and structure as the examples.

  Examples:
  ${examplesString}

  Now, translate this new sentence, using the same legal terms where applicable:

  Dutch (Source):
  ${segment}


  French (Target):
  `;
}
