import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const tarotDeck = [
  {
    id: 0,
    name: "The Fool",
    image: "/images/the_fool.jpg",
    description: {
      upright: "A new beginning, adventure, spontaneity.",
      reversed: "Recklessness, naïveté, poor judgment."
    }
  },
  {
    id: 1,
    name: "The Magician",
    image: "/images/the_magician.jpg",
    description: {
      upright: "Manifestation, resourcefulness, power.",
      reversed: "Manipulation, poor planning, untapped talents."
    }
  }
];

export default function TarotGame() {
  const [cards, setCards] = useState([]);
  const [isReversedFlags, setIsReversedFlags] = useState([]);
  const [drawCount, setDrawCount] = useState(1);

  const drawCards = async () => {
    const newCards = [];
    const reversedFlags = [];
    for (let i = 0; i < drawCount; i++) {
      const randomCard = tarotDeck[Math.floor(Math.random() * tarotDeck.length)];
      const reversed = Math.random() < 0.5;
      newCards.push(randomCard);
      reversedFlags.push(reversed);
    }
    setCards(newCards);
    setIsReversedFlags(reversedFlags);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Tarot Card Draw</h1>

      <div className="mb-4">
        <label htmlFor="drawCount" className="mr-2">Number of Cards:</label>
        <select
          id="drawCount"
          value={drawCount}
          onChange={(e) => setDrawCount(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          <option value={1}>1</option>
          <option value={3}>3</option>
          <option value={10}>10 (Celtic Cross)</option>
        </select>
      </div>

      <Button className="mb-6" onClick={drawCards}>
        Draw Card{drawCount > 1 ? "s" : ""}
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card className="w-72">
              <CardContent className="p-4 flex flex-col items-center">
                <img src={card.image} alt={card.name} className="w-48 mb-4" />
                <h2 className="text-xl font-semibold mb-2">
                  {card.name} {isReversedFlags[index] ? "(Reversed)" : ""}
                </h2>
                <p className="text-center">
                  {isReversedFlags[index] ? card.description.reversed : card.description.upright}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
