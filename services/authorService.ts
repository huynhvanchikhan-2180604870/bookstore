export const authorService = {
  async list(params?: { search?: string }) {
    const qs = params?.search
      ? `?search=${encodeURIComponent(params.search)}`
      : "";
    const res = await fetch(`/api/authors${qs}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load authors");
    const data = await res.json();
    return data.authors || data.data || [];
  },

  async create(body: { fullName: string }) {
    const res = await fetch("/api/authors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("Failed to create author");
    return res.json();
  },

  async update(id: string, body: any) {
    const res = await fetch(`/api/authors/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("Failed to update author");
    return res.json();
  },

  async delete(id: string) {
    const res = await fetch(`/api/authors/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete author");
    return res.json();
  },
};
