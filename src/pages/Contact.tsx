import { Mail, Phone, MapPin, Send } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Xabaringiz muvaffaqiyatli yuborildi!");
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-secondary rounded-full text-sm font-medium text-primary mb-4">
              Aloqa
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Biz bilan <span className="text-gradient-nature">bog'laning</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Savollaringiz yoki takliflaringiz bo'lsa, biz bilan bog'laning
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border">
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                Xabar yuborish
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ismingiz</Label>
                    <Input id="name" placeholder="Ismingizni kiriting" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input id="phone" type="tel" placeholder="+998 90 123 45 67" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@example.com" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Mavzu</Label>
                  <Input id="subject" placeholder="Xabar mavzusi" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Xabar</Label>
                  <Textarea
                    id="message"
                    placeholder="Xabaringizni yozing..."
                    rows={5}
                    required
                  />
                </div>
                
                <Button type="submit" size="lg" className="w-full gap-2">
                  Yuborish
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                  Aloqa ma'lumotlari
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-secondary rounded-xl">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Manzil</h3>
                      <p className="text-muted-foreground">
                        Xorazm viloyat, Tuproqqal'a tuman, Sharlauq MFY, Vatanparvar ko'chasi 14-uy
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-secondary rounded-xl">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Telefon</h3>
                      <p className="text-muted-foreground">+998 (93) 005-42-87</p>
                      <p className="text-muted-foreground">+998 (97) 525-27-54</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-secondary rounded-xl">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Email</h3>
                      <p className="text-muted-foreground">jbobur2o1o@gmail.com</p>
                      <p className="text-muted-foreground">jbobur005@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <div className="aspect-video rounded-2xl overflow-hidden shadow-card">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.678!2d60.8!3d41.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDMzJzAwLjAiTiA2MMKwNDgnMDAuMCJF!5e0!3m2!1sen!2s!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Tuproqqal'a, Xorazm viloyati"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
