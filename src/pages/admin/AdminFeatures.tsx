import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Loader2, GripVertical } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";

type FeatureItem = {
  id: string;
  icon: string;
  title_uz: string;
  title_ru: string | null;
  title_en: string | null;
  description_uz: string;
  description_ru: string | null;
  description_en: string | null;
  sort_order: number;
  published: boolean;
};

const iconOptions = [
  "Leaf", "Recycle", "TreePine", "Users", "Award", "Globe",
  "Heart", "Star", "Zap", "Shield", "Target", "Lightbulb",
  "Rocket", "Sparkles", "Sun", "Moon", "Cloud", "Droplet"
];

const AdminFeatures = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FeatureItem | null>(null);

  const { data: features, isLoading } = useQuery({
    queryKey: ["admin-features"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_features")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as FeatureItem[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: Omit<FeatureItem, "id">) => {
      const { error } = await supabase.from("site_features").insert(data);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-features"] });
      queryClient.invalidateQueries({ queryKey: ["site-features"] });
      toast({ title: "Xususiyat qo'shildi!" });
      setIsOpen(false);
    },
    onError: () => {
      toast({ title: "Xatolik yuz berdi", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: Partial<FeatureItem> & { id: string }) => {
      const { error } = await supabase
        .from("site_features")
        .update(data)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-features"] });
      queryClient.invalidateQueries({ queryKey: ["site-features"] });
      toast({ title: "Xususiyat yangilandi!" });
      setIsOpen(false);
      setEditingItem(null);
    },
    onError: () => {
      toast({ title: "Xatolik yuz berdi", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("site_features").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-features"] });
      queryClient.invalidateQueries({ queryKey: ["site-features"] });
      toast({ title: "Xususiyat o'chirildi!" });
    },
    onError: () => {
      toast({ title: "Xatolik yuz berdi", variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data = {
      icon: formData.get("icon") as string,
      title_uz: formData.get("title_uz") as string,
      title_ru: formData.get("title_ru") as string || null,
      title_en: formData.get("title_en") as string || null,
      description_uz: formData.get("description_uz") as string,
      description_ru: formData.get("description_ru") as string || null,
      description_en: formData.get("description_en") as string || null,
      sort_order: parseInt(formData.get("sort_order") as string) || 0,
      published: formData.get("published") === "on",
    };

    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, ...data });
    } else {
      createMutation.mutate(data);
    }
  };

  const openEdit = (item: FeatureItem) => {
    setEditingItem(item);
    setIsOpen(true);
  };

  const openCreate = () => {
    setEditingItem(null);
    setIsOpen(true);
  };

  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconName];
    return IconComponent ? <IconComponent className="h-6 w-6" /> : null;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">{t("admin.features")}</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate}>
              <Plus className="h-4 w-4 mr-2" />
              Yangi qo'shish
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Tahrirlash" : "Yangi xususiyat"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Icon</Label>
                  <Select name="icon" defaultValue={editingItem?.icon || "Leaf"}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((icon) => (
                        <SelectItem key={icon} value={icon}>
                          <div className="flex items-center gap-2">
                            {getIcon(icon)}
                            <span>{icon}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Tartib raqami</Label>
                  <Input type="number" name="sort_order" defaultValue={editingItem?.sort_order || features?.length || 0} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Nomi (UZ) *</Label>
                  <Input name="title_uz" defaultValue={editingItem?.title_uz} required />
                </div>
                <div>
                  <Label>Nomi (RU)</Label>
                  <Input name="title_ru" defaultValue={editingItem?.title_ru || ""} />
                </div>
                <div>
                  <Label>Nomi (EN)</Label>
                  <Input name="title_en" defaultValue={editingItem?.title_en || ""} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Tavsif (UZ) *</Label>
                  <Textarea name="description_uz" defaultValue={editingItem?.description_uz} required />
                </div>
                <div>
                  <Label>Tavsif (RU)</Label>
                  <Textarea name="description_ru" defaultValue={editingItem?.description_ru || ""} />
                </div>
                <div>
                  <Label>Tavsif (EN)</Label>
                  <Textarea name="description_en" defaultValue={editingItem?.description_en || ""} />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Switch name="published" id="published" defaultChecked={editingItem?.published ?? true} />
                <Label htmlFor="published">Chop etilgan</Label>
              </div>

              <Button type="submit" className="w-full" disabled={createMutation.isPending || updateMutation.isPending}>
                {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Saqlash
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {features?.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border"
          >
            <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
            <div className="p-3 bg-primary/10 rounded-lg text-primary">
              {getIcon(feature.icon)}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{feature.title_uz}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">{feature.description_uz}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs ${feature.published ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"}`}>
                {feature.published ? "Chop etilgan" : "Qoralama"}
              </span>
              <Button variant="ghost" size="icon" onClick={() => openEdit(feature)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(feature.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </motion.div>
        ))}

        {features?.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            Hozircha xususiyatlar yo'q
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminFeatures;
