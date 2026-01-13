import { useState } from "react";
import { X } from "lucide-react";
import Layout from "@/components/layout/Layout";

const galleryImages = [
  { id: 1, category: "Daraxt ekish", emoji: "🌳" },
  { id: 2, category: "Tozalash", emoji: "🧹" },
  { id: 3, category: "Ta'lim", emoji: "📚" },
  { id: 4, category: "Veloyurish", emoji: "🚴" },
  { id: 5, category: "Daraxt ekish", emoji: "🌲" },
  { id: 6, category: "Tozalash", emoji: "♻️" },
  { id: 7, category: "Ta'lim", emoji: "🎓" },
  { id: 8, category: "Tabiat", emoji: "🌿" },
  { id: 9, category: "Jamoa", emoji: "👥" },
];

const categories = ["Barchasi", "Daraxt ekish", "Tozalash", "Ta'lim", "Veloyurish", "Tabiat", "Jamoa"];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages = selectedCategory === "Barchasi"
    ? galleryImages
    : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-secondary rounded-full text-sm font-medium text-primary mb-4">
              Galereya
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Foto <span className="text-gradient-nature">galereya</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Faoliyatimiz davomida suratga olingan eng yaxshi lahzalar
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(image.id)}
                className="aspect-square bg-gradient-nature rounded-xl overflow-hidden cursor-pointer group relative shadow-card hover:shadow-elevated transition-all duration-300"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl md:text-8xl opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-300">
                    {image.emoji}
                  </span>
                </div>
                <div className="absolute inset-0 bg-eco-forest/0 group-hover:bg-eco-forest/40 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-eco-forest/80 to-transparent">
                  <span className="text-primary-foreground text-sm font-medium">{image.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-5 w-5 text-foreground" />
          </button>
          <div className="w-full max-w-3xl aspect-video bg-gradient-nature rounded-2xl flex items-center justify-center">
            <span className="text-9xl opacity-50">
              {galleryImages.find((img) => img.id === selectedImage)?.emoji}
            </span>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Gallery;
