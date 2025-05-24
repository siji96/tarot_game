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

  // ✅ เชื่อมต่อ backend ที่ Railway
  try {
    const response = await fetch("https://tarotgame-production.up.railway.app", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cards: newCards.map((card) => card.name),
        reversed: reversedFlags
      })
    });

    if (!response.ok) throw new Error("API error");
    console.log("✅ Data sent to backend successfully");
  } catch (err) {
    console.error("❌ Failed to send data to backend:", err);
  }
};
