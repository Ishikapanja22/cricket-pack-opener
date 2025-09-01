import { BRONZE_ODDS, SILVER_ODDS, GOLD_ODDS } from "../utils/odds";

const PACKS = [
  { name: "Bronze", price: 100, odds: BRONZE_ODDS },
  { name: "Silver", price: 250, odds: SILVER_ODDS },
  { name: "Gold", price: 500, odds: GOLD_ODDS },
];

export default function PackSelecter({ onOpen }) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {PACKS.map((pack) => (
        <div
          key={pack.name}
          className="p-6 rounded-2xl bg-white/10 shadow-lg hover:scale-105 transition cursor-pointer"
          onClick={() => onOpen(pack)}
        >
          <h2 className="text-xl font-bold mb-2">{pack.name} Pack</h2>
          <p className="mb-2">Price: {pack.price}</p>
          <div className="text-sm text-gray-300">
            Odds:
            <ul className="ml-4 list-disc">
              {Object.entries(pack.odds).map(([tier, chance]) => (
                <li key={tier}>
                  {tier}: {chance}%
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
