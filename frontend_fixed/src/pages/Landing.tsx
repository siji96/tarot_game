import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Welcome to Tarot Web Game</h1>
      <Button onClick={() => navigate("/draw")}>Start Reading</Button>
    </div>
  );
}
