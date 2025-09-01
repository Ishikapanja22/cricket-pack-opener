import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      coins: 1000,
      collection: [],
      addCards: (cards) =>
        set((state) => {
          // handle duplicates (basic version)
          const newCollection = [...state.collection];
          cards.forEach((card) => {
            const idx = newCollection.findIndex((c) => c.name === card.name);
            if (idx !== -1) {
              // upgrade rating if duplicate
              newCollection[idx].rating =
                Math.min(newCollection[idx].rating + 1, 100);
            } else {
              newCollection.push(card);
            }
          });
          return { collection: newCollection };
        }),
      spendCoins: (amount) =>
        set((state) => ({
          coins: state.coins - amount,
        })),
    }),
    { name: "cricket-game" }
  )
);
