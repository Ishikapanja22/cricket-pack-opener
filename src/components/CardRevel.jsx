/* eslint-disable no-unused-vars */

import { motion } from "framer-motion";

const tierColors = {
  Common: "from-gray-700 to-gray-900",
  Rare: "from-blue-600 to-blue-900",
  Epic: "from-purple-600 to-purple-900",
  Legend: "from-yellow-400 to-yellow-700",
};

export default function CardRevel({ card, delay }) {
  return (
    <motion.div
      className={`w-40 h-56 rounded-xl p-3 bg-gradient-to-br ${tierColors[card.tier]} text-white flex flex-col justify-between`}
      initial={{ rotateY: 180 }}
      animate={{ rotateY: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <h3 className="font-bold">{card.name}</h3>
      
      <div>
        <p className="text-sm">
          {card.role} | {card.team}
        </p>
        <p className="font-bold">Rating: {card.rating}</p>
      </div>
    </motion.div>
  );
}
