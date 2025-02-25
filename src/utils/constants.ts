export const languages = {
  en_US: "English (USA)",
  en_GB: "English (UK)",
  en_CA: "English (Canada)",
  en_AU: "English (Australia)",
  en_IN: "English (India)",
  en_NZ: "English (New Zealand)",

  es_ES: "Spanish (Spain)",
  es_MX: "Spanish (Mexico)",
  es_AR: "Spanish (Argentina)",
  es_CO: "Spanish (Colombia)",
  es_PE: "Spanish (Peru)",

  fr_FR: "French (France)",
  fr_CA: "French (Canada)",
  fr_BE: "French (Belgium)",
  fr_CH: "French (Switzerland)",

  de_DE: "German (Germany)",
  de_AT: "German (Austria)",
  de_CH: "German (Switzerland)",
  de_BE: "German (Belgium)",

  it_IT: "Italian",
  it_CH: "Italian (Switzerland)",

  pt_PT: "Portuguese (Portugal)",
  pt_BR: "Portuguese (Brazil)",

  zh_CN: "Chinese (Simplified)",
  zh_TW: "Chinese (Traditional)",
  zh_HK: "Chinese (Hong Kong)",

  ja_JP: "Japanese",

  ru_RU: "Russian",

  ar_SA: "Arabic (Saudi Arabia)",
  ar_EG: "Arabic (Egypt)",
  ar_AE: "Arabic (UAE)",
  ar_KW: "Arabic (Kuwait)",

  nl_NL: "Dutch (Netherlands)",
  nl_BE: "Dutch (Belgium)",

  ko_KR: "Korean",

  hi_IN: "Hindi",

  sv_SE: "Swedish",

  da_DK: "Danish",

  fi_FI: "Finnish",

  pl_PL: "Polish",

  tr_TR: "Turkish",

  el_GR: "Greek",

  cs_CZ: "Czech",

  hu_HU: "Hungarian",

  ro_RO: "Romanian",

  th_TH: "Thai",

  vi_VN: "Vietnamese",

  id_ID: "Indonesian",
} as const;

export const languageToCodeMap = {
  "English (USA)": "en_US",
  "English (UK)": "en_GB",
  "English (Canada)": "en_CA",
  "English (Australia)": "en_AU",
  "English (India)": "en_IN",
  "English (New Zealand)": "en_NZ",

  "Spanish (Spain)": "es_ES",
  "Spanish (Mexico)": "es_MX",
  "Spanish (Argentina)": "es_AR",
  "Spanish (Colombia)": "es_CO",
  "Spanish (Peru)": "es_PE",

  "French (France)": "fr_FR",
  "French (Canada)": "fr_CA",
  "French (Belgium)": "fr_BE",
  "French (Switzerland)": "fr_CH",

  "German (Germany)": "de_DE",
  "German (Austria)": "de_AT",
  "German (Switzerland)": "de_CH",
  "German (Belgium)": "de_BE",

  Italian: "it_IT",
  "Italian (Switzerland)": "it_CH",

  "Portuguese (Portugal)": "pt_PT",
  "Portuguese (Brazil)": "pt_BR",

  "Chinese (Simplified)": "zh_CN",
  "Chinese (Traditional)": "zh_TW",
  "Chinese (Hong Kong)": "zh_HK",

  Japanese: "ja_JP",

  Russian: "ru_RU",

  "Arabic (Saudi Arabia)": "ar_SA",
  "Arabic (Egypt)": "ar_EG",
  "Arabic (UAE)": "ar_AE",
  "Arabic (Kuwait)": "ar_KW",

  "Dutch (Netherlands)": "nl_NL",
  "Dutch (Belgium)": "nl_BE",

  Korean: "ko_KR",

  Hindi: "hi_IN",

  Swedish: "sv_SE",

  Danish: "da_DK",

  Finnish: "fi_FI",

  Polish: "pl_PL",

  Turkish: "tr_TR",

  Greek: "el_GR",

  Czech: "cs_CZ",

  Hungarian: "hu_HU",

  Romanian: "ro_RO",

  Thai: "th_TH",

  Vietnamese: "vi_VN",

  Indonesian: "id_ID",
} as const;

export const allowedDocumentTypes = [
  ".txt",
  ".pdf",
  ".png",
  ".bmp",
  ".jpg",
  ".jpeg",
  ".docx",
  ".doc",
] as const;

export const allowedMemoryTypes = [
  ".xlsx",
  ".xls",
  ".txt",
  ".pdf",
  ".png",
  ".bmp",
  ".jpg",
  ".jpeg",
  ".docx",
  ".doc",
] as const;

export const domains = [
  "legal",
  "medical",
  "healthcare",
  "technical",
  "engineering",
  "financial",
  "business",
  "scientific",
  "creative",
  "marketing",
  "media",
  "subtitling",
  "literary",
  "education",
  "government",
  "technology",
  "ecommerce",
  "travel",
  "hospitality",
  "tourism",
  "automotive",
  "energy",
  "construction",
  "fashion",
  "lifestyle",
  "religion",
  "history",
  "culture",
  "agriculture",
] as const;
