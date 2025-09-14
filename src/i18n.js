import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: { translation: { Home: "Home", "Disease Detection": "Disease Detection", Dashboard: "Dashboard", Resources: "Resources", Support: "Support", Login: "Login" } },
  hi: { translation: { Home: "मुख्य पृष्ठ", "Disease Detection": "रोग पहचान", Dashboard: "डैशबोर्ड", Resources: "संसाधन", Support: "सहायता", Login: "लॉगिन" } },
  bn: { translation: { Home: "হোম", "Disease Detection": "রোগ সনাক্তকরণ", Dashboard: "ড্যাশবোর্ড", Resources: "সম্পদ", Support: "সহায়তা", Login: "লগইন" } },
  ta: { translation: { Home: "முகப்பு", "Disease Detection": "நோய் கண்டறிதல்", Dashboard: "டாஷ்போர்ட்", Resources: "வளங்கள்", Support: "ஆதரவு", Login: "உள்நுழைய" } },
  te: { translation: { Home: "హోమ్", "Disease Detection": "రోగ నిర్ధారణ", Dashboard: "డ్యాష్‌బోర్డ్", Resources: "వనరులు", Support: "మద్దతు", Login: "లాగిన్" } },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
