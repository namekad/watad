import Hero from "@/components/Hero";

const heroTranslations = {
  title: "تحويل الأفكار إلى واقع رقمي",
  description:
    "نحن متخصصون في إنشاء حلول رقمية مبتكرة تساعد الشركات على الازدهار في العالم الحديث. يقدم فريقنا المتخصص تقنيات متطورة مع التركيز على الجودة وتجربة المستخدم.",
  primaryCTA: "ابدأ الآن",
  secondaryCTA: "اعرف المزيد",
};

export default function Home() {
  return (
    <>
      <Hero translations={heroTranslations} />
      {/* Other sections will be added here */}
    </>
  );
}
