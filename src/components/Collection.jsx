import { useState } from "react";
import { useStore } from "../store/useStore";

export default function Collection() {
  const { collection } = useStore();
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? collection
      : collection.filter((c) => c.tier === filter);

  return (
    <div>
      <div className="flex gap-3 mb-4">
        {["All", "Common", "Rare", "Epic", "Legend"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-lg ${
              filter === f ? "bg-white/20" : "bg-white/10"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-4 gap-4">
        {filtered.map((card, i) => (
          <div
            key={i}
            className="p-3 rounded-xl bg-white/10 flex flex-col items-center"
          >
        
            <p className="font-bold">{card.name}</p>
            <p className="text-sm">{card.tier}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
