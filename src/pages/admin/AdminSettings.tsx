import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";
import { useTranslation } from "react-i18next";

interface HeroSettings {
  title_uz: string;
  title_ru: string;
  title_en: string;
  subtitle_uz: string;
  subtitle_ru: string;
  subtitle_en: string;
  stats: {
    members: number;
    projects: number;
    years: number;
    awards: number;
  };
}

interface CTASettings {
  title_uz: string;
  title_ru: string;
  title_en: string;
  subtitle_uz: string;
  subtitle_ru: string;
  subtitle_en: string;
}

const AdminSettings = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*");
      if (error) throw error;
      return data;
    },
  });

  const heroSettings = settings?.find((s) => s.key === "hero")?.value as unknown as HeroSettings | undefined;
  const ctaSettings = settings?.find((s) => s.key === "cta")?.value as unknown as CTASettings | undefined;

  const [hero, setHero] = useState<HeroSettings | null>(null);
  const [cta, setCta] = useState<CTASettings | null>(null);

  // Initialize state when data loads
  if (heroSettings && !hero) {
    setHero(heroSettings);
  }
  if (ctaSettings && !cta) {
    setCta(ctaSettings);
  }

  const updateMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: unknown }) => {
      const { error } = await supabase
        .from("site_settings")
        .update({ value: value as never })
        .eq("key", key);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      toast({ title: "Saqlandi!" });
    },
    onError: () => {
      toast({ title: "Xatolik yuz berdi", variant: "destructive" });
    },
  });

  const handleSaveHero = () => {
    if (hero) {
      updateMutation.mutate({ key: "hero", value: hero });
    }
  };

  const handleSaveCta = () => {
    if (cta) {
      updateMutation.mutate({ key: "cta", value: cta });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">{t("admin.settings")}</h1>

      {/* Hero Section Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Hero Bo'limi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Sarlavha (UZ)</Label>
              <Input
                value={hero?.title_uz || ""}
                onChange={(e) => setHero((prev) => prev ? { ...prev, title_uz: e.target.value } : null)}
              />
            </div>
            <div>
              <Label>Sarlavha (RU)</Label>
              <Input
                value={hero?.title_ru || ""}
                onChange={(e) => setHero((prev) => prev ? { ...prev, title_ru: e.target.value } : null)}
              />
            </div>
            <div>
              <Label>Sarlavha (EN)</Label>
              <Input
                value={hero?.title_en || ""}
                onChange={(e) => setHero((prev) => prev ? { ...prev, title_en: e.target.value } : null)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Tavsif (UZ)</Label>
              <Textarea
                value={hero?.subtitle_uz || ""}
                onChange={(e) => setHero((prev) => prev ? { ...prev, subtitle_uz: e.target.value } : null)}
              />
            </div>
            <div>
              <Label>Tavsif (RU)</Label>
              <Textarea
                value={hero?.subtitle_ru || ""}
                onChange={(e) => setHero((prev) => prev ? { ...prev, subtitle_ru: e.target.value } : null)}
              />
            </div>
            <div>
              <Label>Tavsif (EN)</Label>
              <Textarea
                value={hero?.subtitle_en || ""}
                onChange={(e) => setHero((prev) => prev ? { ...prev, subtitle_en: e.target.value } : null)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label>A'zolar soni</Label>
              <Input
                type="number"
                value={hero?.stats?.members || 0}
                onChange={(e) => setHero((prev) => prev ? { ...prev, stats: { ...prev.stats, members: parseInt(e.target.value) || 0 } } : null)}
              />
            </div>
            <div>
              <Label>Loyihalar soni</Label>
              <Input
                type="number"
                value={hero?.stats?.projects || 0}
                onChange={(e) => setHero((prev) => prev ? { ...prev, stats: { ...prev.stats, projects: parseInt(e.target.value) || 0 } } : null)}
              />
            </div>
            <div>
              <Label>Yillar</Label>
              <Input
                type="number"
                value={hero?.stats?.years || 0}
                onChange={(e) => setHero((prev) => prev ? { ...prev, stats: { ...prev.stats, years: parseInt(e.target.value) || 0 } } : null)}
              />
            </div>
            <div>
              <Label>Mukofotlar</Label>
              <Input
                type="number"
                value={hero?.stats?.awards || 0}
                onChange={(e) => setHero((prev) => prev ? { ...prev, stats: { ...prev.stats, awards: parseInt(e.target.value) || 0 } } : null)}
              />
            </div>
          </div>

          <Button onClick={handleSaveHero} disabled={updateMutation.isPending}>
            {updateMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            Saqlash
          </Button>
        </CardContent>
      </Card>

      {/* CTA Section Settings */}
      <Card>
        <CardHeader>
          <CardTitle>CTA Bo'limi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Sarlavha (UZ)</Label>
              <Input
                value={cta?.title_uz || ""}
                onChange={(e) => setCta((prev) => prev ? { ...prev, title_uz: e.target.value } : null)}
              />
            </div>
            <div>
              <Label>Sarlavha (RU)</Label>
              <Input
                value={cta?.title_ru || ""}
                onChange={(e) => setCta((prev) => prev ? { ...prev, title_ru: e.target.value } : null)}
              />
            </div>
            <div>
              <Label>Sarlavha (EN)</Label>
              <Input
                value={cta?.title_en || ""}
                onChange={(e) => setCta((prev) => prev ? { ...prev, title_en: e.target.value } : null)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Tavsif (UZ)</Label>
              <Textarea
                value={cta?.subtitle_uz || ""}
                onChange={(e) => setCta((prev) => prev ? { ...prev, subtitle_uz: e.target.value } : null)}
              />
            </div>
            <div>
              <Label>Tavsif (RU)</Label>
              <Textarea
                value={cta?.subtitle_ru || ""}
                onChange={(e) => setCta((prev) => prev ? { ...prev, subtitle_ru: e.target.value } : null)}
              />
            </div>
            <div>
              <Label>Tavsif (EN)</Label>
              <Textarea
                value={cta?.subtitle_en || ""}
                onChange={(e) => setCta((prev) => prev ? { ...prev, subtitle_en: e.target.value } : null)}
              />
            </div>
          </div>

          <Button onClick={handleSaveCta} disabled={updateMutation.isPending}>
            {updateMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            Saqlash
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
