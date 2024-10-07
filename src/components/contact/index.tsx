import Reveal from "../animation/Reveal";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import MailIcon from "@/../public/images/icons/mail.svg";
import BehanceIcon from "@/../public/images/icons/behance.svg";
import PhoneIcon from "@/../public/images/icons/phone.svg";
import ContactForm from "./ContactForm";
import ContactIcons from "./ContactIcons";
import { useTranslations } from "next-intl";
import ContactBackground from "./ContactBackgournd";

export default function Contact() {
  const t = useTranslations("Contact");

  return (
    <div className="relative h-[800px] flex justify-center items-center">
      <ContactBackground />

      <div className="flex justify-center absolute">
        <div className="py-10 max-w-7xl md:w-1/3 min-w-[380px] md:min-w-[520px] px-4 flex justify-center flex-col items-center bg-white/95 dark:bg-slate-900/90 rounded-xl backdrop-blur-lg">
          <Reveal>
            <h1 className="text-4xl font-bold text-primary mb-6">Contact</h1>
          </Reveal>

          <ContactForm
            name={t("name")}
            email={t("email")}
            message={t("message")}
            send={t("send")}
            thankMessage={t("message_sent")}
          />
          <Reveal>
            <div className="flex justify-center items-center gap-4 w-11 mt-12">
              <ContactIcons />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
