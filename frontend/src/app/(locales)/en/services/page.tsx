import { getTranslations } from "next-intl/server";
import Services from "@/components/Services";

export async function generateMetadata() {
  const t = await getTranslations("pages.services");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ServicesPage() {
  const t = await getTranslations("pages.services");

  return (
    <Services
      title={t("title")}
      description={t("description")}
      sections={t.raw("sections")}
    />
  );
}
