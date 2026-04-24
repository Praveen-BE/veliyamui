import React from "react";
import { useTranslations } from "next-intl";
import FAQElement from "./FAQElement";
import { CTAOutlineButton } from "@/ui/CTAButton";

const FAQSection = () => {
  const t = useTranslations("HomePage");
  return (
    <div className="my-4">
      <h1 className="font-bold text-2xl text-center">FAQs</h1>
      <FAQElement question={t("faq1Question")} answer={t("faq1Answer")} />
      <FAQElement question={t("faq2Question")} answer={t("faq2Answer")} />
      <FAQElement question={t("faq3Question")} answer={t("faq3Answer")} />
      <div className="mt-6 flex justify-center">
        <CTAOutlineButton ctaName="Any You Have" ctaLinkName="/faqs" />
      </div>
    </div>
  );
};

export default FAQSection;
