import MailIcon from "@/../public/images/icons/mail.svg";
import BehanceIcon from "@/../public/images/icons/behance.svg";
import PhoneIcon from "@/../public/images/icons/phone.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";
import TypingText from "./TypingText";
import Reveal from "../animation/Reveal";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Start() {
  const t = useTranslations("Index");

  const renderIcon = (iconSrc: any, info: string, href?: string) => (
    <div className="relative group">
      {href ? (
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary w-9 h-9 grid place-items-center rounded-full hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] focus:ring-4 dark:focus:ring-gray-700"
        >
          <Image src={iconSrc} alt="svg-icon" width={20} height={20} />
        </Link>
      ) : (
        <button className="bg-primary w-9 h-9 grid place-items-center rounded-full hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] focus:ring-4 dark:focus:ring-gray-700">
          <Image src={iconSrc} alt="svg-icon" width={20} height={20} />
        </button>
      )}

      <div
        className={cn(
          "absolute z-10 ",
          "top-10 right-1/2 transform translate-x-1/2",
          "md:top-1 md:right-0 md:-translate-x-10",
          "bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
        )}
      >
        {href ? (
          <Link href={href} target="_blank" rel="noopener noreferrer">
            {info}
          </Link>
        ) : (
          <span>{info}</span>
        )}
      </div>
    </div>
  );

  return (
    <div className="relative h-screen overflow-x-clip flex justify-center items-center">
      <div
        className={cn(
          "absolute inset-0 bg-[url('/images/backgrounds/bg-00.jpg')] bg-center bg-cover",
          "filter grayscale -z-10"
        )}
      />
      <div className="h-screen bg-white/90 dark:bg-slate-800/95 flex justify-center w-full">
        <div className="flex justify-center flex-col mx-4 mb:mx-0 m-auto max-w-7xl">
          <div className="flex md:flex-row flex-col justify-between items-center">
            <div className="flex flex-col md:w-[80%]">
              <Reveal>
                <p className="text-2xl sm:text-3xl md:text-5xl font-semibold mb-4 dark:text-white text-slate-700">
                  {t("hello")}
                  <br />
                  {t("my_name")}
                </p>
                <TypingText
                  title={t("i_am_a_developer")}
                  titleTwo={t("i_am_a_ui/ux_designer")}
                />
              </Reveal>
              <Reveal>
                <p className="mt-4 text-base dark:text-white text-neutral-800 w-full">
                  {t("resume_content")}
                </p>
              </Reveal>
              {/* <Reveal>
                <div className="pt-3 items-center flex">
                  <Button>{t("hire_me")}</Button>
                  <OutlineButton className="ml-4" icon={<ArrowDown />}>
                    {t("download_cv")}
                  </OutlineButton>
                </div>
              </Reveal> */}
            </div>
            <div className="flex justify-end text-right dark:text-white">
              <Reveal>
                <div className="flex justify-center items-center md:flex-col flex-row gap-4 w-11 md:mt-0 mt-12">
                  <div className="w-1 h-8 bg-slate-400 dark:bg-white mb-2 rounded-full"></div>
                  {renderIcon(
                    MailIcon,
                    "vanhyoyo@gmail.com",
                    "mailto:vanhyoyo@gmail.com"
                  )}
                  {renderIcon(PhoneIcon, "0358485077")}
                  {renderIcon(
                    BehanceIcon,
                    "behance.net/vitanhbi4",
                    "https://www.behance.net/vitanhbi4"
                  )}
                  <div className="w-1 h-8 bg-slate-400 dark:bg-white mt-2 rounded-full"></div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
