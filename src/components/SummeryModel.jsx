import CardRevel from "./CardRevel";

export default function SummeryModel({ cards = [], onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="bg-white/10 p-6 rounded-2xl w-3/4 max-h-[80vh] overflow-auto">
        <h2 className="text-xl font-bold mb-4">You Pulled</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {cards.map((c, i) => (
            <CardRevel key={i} card={c} delay={i * 0.1} />
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20"
        >
          Close
        </button>
      </div>
    </div>
  );
}
