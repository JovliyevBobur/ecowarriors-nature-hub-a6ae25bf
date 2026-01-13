import { Calendar, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const newsItems = [
  {
    id: 1,
    title: "Bahorgi daraxt ekish mavsumi boshlandi",
    date: "2026-01-10",
    excerpt: "Yangi daraxt ekish mavsumini boshladik. Bu yil 500 ta daraxt ekish rejalashtirilgan.",
    category: "Loyihalar",
  },
  {
    id: 2,
    title: "Ekologik seminar muvaffaqiyatli o'tkazildi",
    date: "2026-01-05",
    excerpt: "O'quv yurtlarida ekologik madaniyat mavzusida seminar o'tkazildi. 200 dan ortiq ishtirokchi qatnashdi.",
    category: "Ta'lim",
  },
  {
    id: 3,
    title: "Plastik chiqindilarni yig'ish aksiyasi",
    date: "2025-12-28",
    excerpt: "Umumshahar miqyosida plastik chiqindilarni yig'ish aksiyasi o'tkazildi.",
    category: "Aksiyalar",
  },
  {
    id: 4,
    title: "Yangi hamkorlik shartnomasi imzolandi",
    date: "2025-12-20",
    excerpt: "Mahalliy hokimiyat bilan yangi hamkorlik shartnomasi imzolandi. Birgalikda 10 ta yangi loyiha amalga oshiriladi.",
    category: "Hamkorlik",
  },
  {
    id: 5,
    title: "Yosh ko'ngillilar safimizga qo'shildi",
    date: "2025-12-15",
    excerpt: "50 nafar yangi ko'ngilli jamoamizga qo'shildi. Ular maxsus treningdan o'tdilar.",
    category: "Jamoa",
  },
  {
    id: 6,
    title: "Yillik hisobot tayyorlandi",
    date: "2025-12-10",
    excerpt: "2025-yil davomida amalga oshirilgan barcha loyihalar bo'yicha hisobot tayyorlandi.",
    category: "Hisobotlar",
  },
];

const News = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-secondary rounded-full text-sm font-medium text-primary mb-4">
              Yangiliklar
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              So'nggi <span className="text-gradient-nature">yangiliklar</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Faoliyatimiz va amalga oshirilayotgan loyihalarimiz haqida eng so'nggi ma'lumotlar
            </p>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((item) => (
              <article
                key={item.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-card border border-border hover:shadow-elevated transition-all duration-300"
              >
                <div className="h-48 bg-gradient-nature relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl opacity-30">🌿</span>
                  </div>
                  <span className="absolute top-4 left-4 px-3 py-1 bg-card/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
                    {item.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4" />
                    <time>{new Date(item.date).toLocaleDateString("uz-UZ")}</time>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {item.excerpt}
                  </p>
                  <Button variant="ghost" size="sm" className="gap-2 p-0 h-auto text-primary hover:bg-transparent">
                    Batafsil o'qish
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default News;
