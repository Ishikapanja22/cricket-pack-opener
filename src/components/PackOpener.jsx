/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { openPack } from "../utils/rng";
import { useStore } from "../store/useStore";
import CardRevel from "./CardRevel";
import { motion } from "framer-motion";
import { players } from "../data/player";
import { BRONZE_ODDS, SILVER_ODDS, GOLD_ODDS } from "../utils/odds";

export default function PackOpener({ pack, onDone, onBack }) {
  const [revealed, setRevealed] = useState(false);
  const [cards, setCards] = useState([]);
  const { addCards } = useStore();

  useEffect(() => {
    if (pack) {
      // Decide odds + pack size
      let odds;
      let packSize = 5; // can tweak per pack type
      if (pack.name === "Bronze") odds = BRONZE_ODDS;
      else if (pack.name === "Silver") odds = SILVER_ODDS;
      else if (pack.name === "Gold") odds = GOLD_ODDS;

      // Pull cards with proper arguments
      const pulled = openPack(pack.name, packSize, odds, players, true);
      setCards(pulled);
      addCards(pulled);

      const timer = setTimeout(() => setRevealed(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [pack]);

  return (
    <div className="flex flex-col items-center justify-center">
      {!revealed ? (
        <motion.div
          className="w-40 h-56 bg-gradient-to-br from-yellow-500 to-red-500 rounded-xl flex items-center justify-center"
          animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        >
          <p className="text-lg font-bold">{pack?.name} Pack</p>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <CardRevel key={i} card={card} delay={i * 0.2} />
          ))}
        </div>
      )}

      {/* Back button (before reveal) */}
      {!revealed && (
        <button
          onClick={onBack}
          className="mt-6 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20"
        >
          Back
        </button>
      )}

      {/* Continue button (after reveal) */}
      {revealed && (
        <button
          onClick={() => onDone(cards)}
          className="mt-6 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20"
        >
          Continue
        </button>
      )}
    </div>
  );
}
