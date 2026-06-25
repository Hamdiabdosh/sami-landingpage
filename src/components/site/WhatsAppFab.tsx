import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { useSettings } from "@/lib/queries";
import { waLink } from "@/lib/contact-links";
import { tapScale } from "@/lib/motion";

export function WhatsAppFab() {
  const { t } = useI18n();
  const { settings } = useSettings();

  if (!settings?.whatsapp) return null;

  return (
    <motion.a
      href={waLink(settings.whatsapp)}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.35 }}
      whileHover={{ scale: 1.06 }}
      whileTap={tapScale}
      aria-label={t("fab.whatsapp")}
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_-6px_rgba(37,211,102,0.65)] hover:brightness-105 md:bottom-6 md:right-6"
    >
      <MessageCircle size={26} />
    </motion.a>
  );
}
