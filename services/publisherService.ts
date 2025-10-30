export const publisherService = {
  async list(params?: { search?: string }) {
    const qs = params?.search
      ? `?search=${encodeURIComponent(params.search)}`
      : "";
    const res = await fetch(`/api/publishers${qs}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load publishers");
    const data = await res.json();
    return data.publishers || data.data || [];
  },

  async create(body: { name: string }) {
    const res = await fetch("/api/publishers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("Failed to create publisher");
    return res.json();
  },
};
