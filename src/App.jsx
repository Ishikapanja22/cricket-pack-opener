// eslint-disable-next-line no-unused-vars
import React, { useMemo, useState } from "react";
import PackSelecter from "./components/PackSelecter";
import PackOpener from "./components/PackOpener";
import Collection from "./components/Collection";
import SoundToggele from "./components/SoundToggele";
import SummeryModel from "./components/SummeryModel";
import { BRONZE_ODDS, SILVER_ODDS, GOLD_ODDS } from "./utils/odds";
import { useStore } from "./store/useStore";

const PACKS = [
  { name: "Bronze", price: 100, odds: BRONZE_ODDS },
  { name: "Silver", price: 250, odds: SILVER_ODDS },
  { name: "Gold", price: 500, odds: GOLD_ODDS },
];

export default function App() {
  const [selectedPack, setSelectedPack] = useState(null); // object with name, price, odds
  const [summary, setSummary] = useState(null);

  const coins = useStore((s) => s.coins);
  const spendCoins = useStore((s) => s.spendCoins);

  const handleOpenPack = (pack) => {
    if (coins >= pack.price) {
      spendCoins(pack.price); // Deduct coins
      setSelectedPack(pack);
    } else {
      alert("Not enough coins!");
    }
  };

  return (
    <div className="p-4 md:p-6 text-white">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Cricket Pack Opener
        </h1>
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 rounded-xl metallic">
            Coins: <span className="font-semibold">{coins}</span>
          </div>
          <SoundToggele />
        </div>
      </header>

      <div className="grid lg:grid-cols-2 gap-6">
        <section className="metallic rounded-2xl p-4">
          {!selectedPack ? (
            <PackSelecter onOpen={handleOpenPack} />
          ) : (
            <PackOpener
              pack={selectedPack}
              onDone={(result) => {
                setSummary(result);
                setSelectedPack(null);
              }}
              onBack={() => setSelectedPack(null)}
            />
          )}
        </section>

        <aside className="metallic rounded-2xl p-4">
          <Collection />
        </aside>
      </div>

      {summary && (
        <SummeryModel cards={summary} onClose={() => setSummary(null)} />
      )}
    </div>
  );
}
