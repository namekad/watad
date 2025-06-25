import Contact from "@/components/Contact";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("pages.contact");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ContactPage() {
  const t = await getTranslations("pages.contact");

  const contactContent = {
    title: t("title"),
    description: t("description"),
    address: t("info.address"),
    phone: t.raw("info.phone") as string[],
    email_general: t("info.email.general"),
    email_careers: t("info.email.careers"),
    working_hours: t("info.working_hours"),
    form_fields: {
      name: t("form.name"),
      email: t("form.email"),
      phone: t("form.phone"),
      message: t("form.message"),
      submit: t("form.submit"),
    },
  };

  return <Contact content={contactContent} />;
}
