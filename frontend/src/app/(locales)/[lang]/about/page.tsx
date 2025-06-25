import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("pages.about");
  return {
    title: t("title"),
    description: t("intro"),
  };
}

export default async function AboutPage() {
  const t = await getTranslations("pages.about");

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-secondary-900 dark:text-white">
          {t("title")}
        </h1>

        <div className="space-y-6 text-secondary-700 dark:text-secondary-200">
          <p className="text-xl leading-relaxed">{t("intro")}</p>

          <p className="text-lg leading-relaxed">{t("main_description")}</p>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6 text-secondary-900 dark:text-white">
              {t("services_title")}
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg">
              {t.raw("services_list").map((service: string, index: number) => (
                <li
                  key={index}
                  className="text-secondary-600 dark:text-secondary-300"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
