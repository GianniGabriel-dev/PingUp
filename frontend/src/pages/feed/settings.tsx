import { useAuth } from "@/context/useAuth.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LANGUAGES = [
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
];

export function Settings() {

  
}