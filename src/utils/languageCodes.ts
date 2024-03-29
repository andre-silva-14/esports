const languages = [
  { id: "ab", title: "Abkhaz" },
  { id: "aa", title: "Afar" },
  { id: "af", title: "Afrikaans" },
  { id: "ak", title: "Akan" },
  { id: "sq", title: "Albanian" },
  { id: "am", title: "Amharic" },
  { id: "ar", title: "Arabic" },
  { id: "an", title: "Aragonese" },
  { id: "hy", title: "Armenian" },
  { id: "as", title: "Assamese" },
  { id: "av", title: "Avaric" },
  { id: "ae", title: "Avestan" },
  { id: "ay", title: "Aymara" },
  { id: "az", title: "Azerbaijani" },
  { id: "bm", title: "Bambara" },
  { id: "ba", title: "Bashkir" },
  { id: "eu", title: "Basque" },
  { id: "be", title: "Belarusian" },
  { id: "bn", title: "Bengali" },
  { id: "bh", title: "Bihari" },
  { id: "bi", title: "Bislama" },
  { id: "bs", title: "Bosnian" },
  { id: "br", title: "Breton" },
  { id: "bg", title: "Bulgarian" },
  { id: "my", title: "Burmese" },
  { id: "ca", title: "Catalan" },
  { id: "ch", title: "Chamorro" },
  { id: "ce", title: "Chechen" },
  { id: "ny", title: "Chichewa" },
  { id: "zh", title: "Chinese" },
  { id: "cv", title: "Chuvash" },
  { id: "kw", title: "Cornish" },
  { id: "co", title: "Corsican" },
  { id: "cr", title: "Cree" },
  { id: "hr", title: "Croatian" },
  { id: "cs", title: "Czech" },
  { id: "da", title: "Danish" },
  { id: "dv", title: "Divehi" },
  { id: "nl", title: "Dutch" },
  { id: "en", title: "English" },
  { id: "eo", title: "Esperanto" },
  { id: "et", title: "Estonian" },
  { id: "ee", title: "Ewe" },
  { id: "fo", title: "Faroese" },
  { id: "fj", title: "Fijian" },
  { id: "fi", title: "Finnish" },
  { id: "fr", title: "French" },
  { id: "ff", title: "Fulah" },
  { id: "gl", title: "Galician" },
  { id: "ka", title: "Georgian" },
  { id: "de", title: "German" },
  { id: "el", title: "Greek" },
  { id: "gn", title: "Guaraní" },
  { id: "gu", title: "Gujarati" },
  { id: "ht", title: "Haitian" },
  { id: "ha", title: "Hausa" },
  { id: "he", title: "Hebrew (modern)" },
  { id: "hz", title: "Herero" },
  { id: "hi", title: "Hindi" },
  { id: "ho", title: "Hiri Motu" },
  { id: "hu", title: "Hungarian" },
  { id: "ia", title: "Interlingua" },
  { id: "id", title: "Indonesian" },
  { id: "ie", title: "Interlingue" },
  { id: "ga", title: "Irish" },
  { id: "ig", title: "Igbo" },
  { id: "ik", title: "Inupiaq" },
  { id: "io", title: "Ido" },
  { id: "is", title: "Icelandic" },
  { id: "it", title: "Italian" },
  { id: "iu", title: "Inuktitut" },
  { id: "ja", title: "Japanese" },
  { id: "jv", title: "Javanese" },
  { id: "kl", title: "Kalaallisut" },
  { id: "kn", title: "Kannada" },
  { id: "kr", title: "Kanuri" },
  { id: "ks", title: "Kashmiri" },
  { id: "kk", title: "Kazakh" },
  { id: "km", title: "Khmer" },
  { id: "ki", title: "Kikuyu" },
  { id: "rw", title: "Kinyarwanda" },
  { id: "ky", title: "Kirghiz" },
  { id: "kv", title: "Komi" },
  { id: "kg", title: "Kongo" },
  { id: "ko", title: "Korean" },
  { id: "ku", title: "Kurdish" },
  { id: "kj", title: "Kwanyama" },
  { id: "la", title: "Latin" },
  { id: "lb", title: "Luxembourgish" },
  { id: "lg", title: "Luganda" },
  { id: "li", title: "Limburgish" },
  { id: "ln", title: "Lingala" },
  { id: "lo", title: "Lao" },
  { id: "lt", title: "Lithuanian" },
  { id: "lu", title: "Luba-Katanga" },
  { id: "lv", title: "Latvian" },
  { id: "gv", title: "Manx" },
  { id: "mk", title: "Macedonian" },
  { id: "mg", title: "Malagasy" },
  { id: "ms", title: "Malay" },
  { id: "ml", title: "Malayalam" },
  { id: "mt", title: "Maltese" },
  { id: "mi", title: "Māori" },
  { id: "mr", title: "Marathi (Marāṭhī)" },
  { id: "mh", title: "Marshallese" },
  { id: "mn", title: "Mongolian" },
  { id: "na", title: "Nauru" },
  { id: "nv", title: "Navajo, Navaho" },
  { id: "nb", title: "Norwegian Bokmål" },
  { id: "nd", title: "North Ndebele" },
  { id: "ne", title: "Nepali" },
  { id: "ng", title: "Ndonga" },
  { id: "nn", title: "Norwegian Nynorsk" },
  { id: "no", title: "Norwegian" },
  { id: "ii", title: "Nuosu" },
  { id: "nr", title: "South Ndebele" },
  { id: "oc", title: "Occitan" },
  { id: "oj", title: "Ojibwe" },
  { id: "cu", title: "Old Church Slavonic" },
  { id: "om", title: "Oromo" },
  { id: "or", title: "Oriya" },
  { id: "os", title: "Ossetian" },
  { id: "pa", title: "Panjabi" },
  { id: "pi", title: "Pāli" },
  { id: "fa", title: "Persian" },
  { id: "pl", title: "Polish" },
  { id: "ps", title: "Pashto" },
  { id: "pt", title: "Portuguese" },
  { id: "qu", title: "Quechua" },
  { id: "rm", title: "Romansh" },
  { id: "rn", title: "Kirundi" },
  { id: "ro", title: "Romanian" },
  { id: "ru", title: "Russian" },
  { id: "sa", title: "Sanskrit (Saṁskṛta)" },
  { id: "sc", title: "Sardinian" },
  { id: "sd", title: "Sindhi" },
  { id: "se", title: "Northern Sami" },
  { id: "sm", title: "Samoan" },
  { id: "sg", title: "Sango" },
  { id: "sr", title: "Serbian" },
  { id: "gd", title: "Scottish Gaelic" },
  { id: "sn", title: "Shona" },
  { id: "si", title: "Sinhala" },
  { id: "sk", title: "Slovak" },
  { id: "sl", title: "Slovene" },
  { id: "so", title: "Somali" },
  { id: "st", title: "Southern Sotho" },
  { id: "es", title: "Spanish" },
  { id: "su", title: "Sundanese" },
  { id: "sw", title: "Swahili" },
  { id: "ss", title: "Swati" },
  { id: "sv", title: "Swedish" },
  { id: "ta", title: "Tamil" },
  { id: "te", title: "Telugu" },
  { id: "tg", title: "Tajik" },
  { id: "th", title: "Thai" },
  { id: "ti", title: "Tigrinya" },
  { id: "bo", title: "Tibetan Standard" },
  { id: "tk", title: "Turkmen" },
  { id: "tl", title: "Tagalog" },
  { id: "tn", title: "Tswana" },
  { id: "to", title: "Tonga (Tonga Islands)" },
  { id: "tr", title: "Turkish" },
  { id: "ts", title: "Tsonga" },
  { id: "tt", title: "Tatar" },
  { id: "tw", title: "Twi" },
  { id: "ty", title: "Tahitian" },
  { id: "ug", title: "Uighur" },
  { id: "uk", title: "Ukrainian" },
  { id: "ur", title: "Urdu" },
  { id: "uz", title: "Uzbek" },
  { id: "ve", title: "Venda" },
  { id: "vi", title: "Vietnamese" },
  { id: "vo", title: "Volapük" },
  { id: "wa", title: "Walloon" },
  { id: "cy", title: "Welsh" },
  { id: "wo", title: "Wolof" },
  { id: "fy", title: "Western Frisian" },
  { id: "xh", title: "Xhosa" },
  { id: "yi", title: "Yiddish" },
  { id: "yo", title: "Yoruba" },
  { id: "za", title: "Zhuang" },
];

export default languages;
