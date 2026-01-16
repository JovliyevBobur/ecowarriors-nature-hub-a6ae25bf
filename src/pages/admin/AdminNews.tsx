import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import type { Tables } from "@/integrations/supabase/types";
import { ImageUpload } from "@/components/admin/ImageUpload";

type NewsItem = Tables<"news">;

const AdminNews = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { data: news, isLoading } = useQuery({
    queryKey: ["admin-news"],
    queryFn: async () => {
      const { data, error } = await supabase.from("news").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `news/${Date.now()}.${fileExt}`;
    const { error } = await supabase.storage.from("images").upload(fileName, file);
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage.from("images").getPublicUrl(fileName);
    return publicUrl;
  };

  const createMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }
      const { error } = await supabase.from("news").insert({
        title_uz: formData.get("title_uz") as string,
        title_ru: formData.get("title_ru") as string || null,
        title_en: formData.get("title_en") as string || null,
        content_uz: formData.get("content_uz") as string,
        content_ru: formData.get("content_ru") as string || null,
        content_en: formData.get("content_en") as string || null,
        category: formData.get("category") as string || "general",
        image_url: imageUrl || null,
        published: formData.get("published") === "true",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-news"] });
      setIsOpen(false);
      setImageFile(null);
      toast.success(t("common.save") + " ✓");
    },
    onError: () => toast.error(t("common.error")),
  });

  const updateMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      let imageUrl = editingItem?.image_url || "";
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }
      const { error } = await supabase.from("news").update({
        title_uz: formData.get("title_uz") as string,
        title_ru: formData.get("title_ru") as string || null,
        title_en: formData.get("title_en") as string || null,
        content_uz: formData.get("content_uz") as string,
        content_ru: formData.get("content_ru") as string || null,
        content_en: formData.get("content_en") as string || null,
        category: formData.get("category") as string || "general",
        image_url: imageUrl || null,
        published: formData.get("published") === "true",
      }).eq("id", editingItem!.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-news"] });
      setIsOpen(false);
      setEditingItem(null);
      setImageFile(null);
      toast.success(t("common.save") + " ✓");
    },
    onError: () => toast.error(t("common.error")),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("news").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-news"] });
      toast.success(t("common.delete") + " ✓");
    },
    onError: () => toast.error(t("common.error")),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (editingItem) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  const openEdit = (item: NewsItem) => {
    setEditingItem(item);
    setIsOpen(true);
  };

  const openCreate = () => {
    setEditingItem(null);
    setImageFile(null);
    setIsOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-display font-bold text-foreground">{t("admin.news")}</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate} className="gap-2">
              <Plus className="h-4 w-4" />
              {t("admin.addNew")}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? t("admin.editItem") : t("admin.addNew")}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="title_uz">{t("admin.title")} (UZ) *</Label>
                  <Input id="title_uz" name="title_uz" defaultValue={editingItem?.title_uz || ""} required />
                </div>
                <div>
                  <Label htmlFor="title_ru">{t("admin.title")} (RU)</Label>
                  <Input id="title_ru" name="title_ru" defaultValue={editingItem?.title_ru || ""} />
                </div>
                <div>
                  <Label htmlFor="title_en">{t("admin.title")} (EN)</Label>
                  <Input id="title_en" name="title_en" defaultValue={editingItem?.title_en || ""} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="content_uz">{t("admin.content")} (UZ) *</Label>
                  <Textarea id="content_uz" name="content_uz" defaultValue={editingItem?.content_uz || ""} rows={4} required />
                </div>
                <div>
                  <Label htmlFor="content_ru">{t("admin.content")} (RU)</Label>
                  <Textarea id="content_ru" name="content_ru" defaultValue={editingItem?.content_ru || ""} rows={4} />
                </div>
                <div>
                  <Label htmlFor="content_en">{t("admin.content")} (EN)</Label>
                  <Textarea id="content_en" name="content_en" defaultValue={editingItem?.content_en || ""} rows={4} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">{t("admin.category")}</Label>
                  <Input id="category" name="category" defaultValue={editingItem?.category || "general"} />
                </div>
              </div>

              <div>
                <Label>{t("admin.image")}</Label>
                <ImageUpload
                  value={editingItem?.image_url || undefined}
                  onChange={() => {}}
                  onFileSelect={setImageFile}
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch id="published" name="published" defaultChecked={editingItem?.published ?? false} value="true" />
                <Label htmlFor="published">{t("common.published")}</Label>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  {t("common.cancel")}
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {t("common.save")}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-muted-foreground">{t("common.loading")}</div>
      ) : (
        <div className="grid gap-4">
          {news?.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-card rounded-lg p-4 border border-border flex items-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {item.image_url ? (
                <img src={item.image_url} alt="" className="h-16 w-16 object-cover rounded" />
              ) : (
                <div className="h-16 w-16 bg-secondary rounded flex items-center justify-center">
                  <ImageIcon className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{item.title_uz}</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">{item.content_uz}</p>
                <span className={`text-xs px-2 py-0.5 rounded ${item.published ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"}`}>
                  {item.published ? t("common.published") : t("common.draft")}
                </span>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => openEdit(item)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(item.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </motion.div>
          ))}
          {(!news || news.length === 0) && (
            <p className="text-muted-foreground text-center py-8">{t("common.noData")}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminNews;