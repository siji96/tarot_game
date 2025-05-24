import { useEffect, useState, useRef } from "react";
import tarotDeckData from "@/data/tarotDeck.json";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function TarotGame() {
  const [tarotDeck, setTarotDeck] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isReversed, setIsReversed] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    setTarotDeck(tarotDeckData);
  }, []);

  const handleCardClick = () => {
    if (!tarotDeck.length) return;
    const card = tarotDeck[Math.floor(Math.random() * tarotDeck.length)];
    const reversed = Math.random() < 0.5;
    setFlipped(false);
    setTimeout(() => {
      setSelectedCard(card);
      setIsReversed(reversed);
      setFlipped(true);
    }, 300);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-950 flex flex-col items-center justify-center text-white"
      style={{ backgroundImage: 'url(/images/background_stars.jpg)', backgroundSize: 'cover' }}
    >
      <h1 className="text-4xl font-bold mb-8 drop-shadow-xl">🔮 Tarot Destiny Draw</h1>

      <audio ref={audioRef} src="/sounds/card-draw.mp3" preload="auto" />

      <motion.div className="cursor-pointer" onClick={handleCardClick}>
        <motion.div className="w-64 h-96 perspective">
          <AnimatePresence mode="wait">
            <motion.div
              key={flipped ? "back" : "front"}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 180 }}
              exit={{ rotateY: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-full"
            >
              <div className="absolute inset-0 backface-hidden flex items-center justify-center">
                {!flipped && (
                  <Card className="w-full h-full bg-white bg-opacity-10 backdrop-blur-md border border-purple-300 rounded-2xl shadow-lg flex items-center justify-center">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <p className="text-lg italic">Click to draw a card...</p>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="absolute inset-0 backface-hidden rotate-y-180">
                {flipped && selectedCard && (
                  <Card className="w-full h-full bg-white bg-opacity-10 backdrop-blur-md border border-purple-300 rounded-2xl shadow-lg flex items-center justify-center">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <img
                        src={selectedCard.image}
                        alt={selectedCard.name}
                        className="w-40 h-64 object-cover mb-4 rounded-lg shadow"
                      />
                      <h2 className="text-xl font-semibold">
                        {selectedCard.name} {isReversed ? "(Reversed)" : ""}
                      </h2>
                      <p className="text-sm mt-2">
                        {isReversed
                          ? selectedCard.description.reversed
                          : selectedCard.description.upright}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <p className="mt-6 text-sm text-purple-200">Click the card to draw again ✨</p>
    </div>
  );
}
