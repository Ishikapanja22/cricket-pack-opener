import { useState } from "react";

export default function SoundToggele() {
  const [muted, setMuted] = useState(false);

  return (
    <button
      onClick={() => setMuted((m) => !m)}
      className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20"
    >
      {muted ? "🔇" : "🔊"}
    </button>
  );
}
