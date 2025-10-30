export const categoryService = {
  async list(params?: { search?: string }) {
    const qs = params?.search
      ? `?search=${encodeURIComponent(params.search)}`
      : "";
    const res = await fetch(`/api/categories${qs}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load categories");
    const data = await res.json();
    return data.categories || [];
  },

  async create(body: { name: string; slug: string }) {
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("Failed to create category");
    return res.json();
  },
};
