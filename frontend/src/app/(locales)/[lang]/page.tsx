import Hero from "@/components/Hero";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("pages.home");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function Home() {
  const t = await getTranslations("pages.home.hero");

  const heroTranslations = {
    title: t("title"),
    description: t("description"),
    primaryCTA: t("cta"),
    secondaryCTA: t("contactCta"),
  };

  return (
    <main>
      <Hero translations={heroTranslations} />
      {/* Other sections will be added here */}
    </main>
  );
}
