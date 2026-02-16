import { ChevronLeft, ChevronRight, ArrowUp, Banana } from "lucide-react";

export default function MobileControls({ gameRef }) {
  const handleControlStart = (control) => {
    const game = gameRef.current;
    if (game?.scene?.scenes[0]) {
      game.scene.scenes[0].sys.game.mobileControls[control] = true;
    }
  };

  const handleControlEnd = (control) => {
    const game = gameRef.current;
    if (game?.scene?.scenes[0]) {
      game.scene.scenes[0].sys.game.mobileControls[control] = false;
    }
  };

  const handleMouseDown = (control) => {
    const game = gameRef.current;
    if (game?.mobileControls) {
      game.mobileControls[control] = true;
    }
  };

  const handleMouseUp = (control) => {
    const game = gameRef.current;
    if (game?.mobileControls) {
      game.mobileControls[control] = false;
    }
  };

  return (
    <>
      <div className="absolute bottom-6 left-6 z-10 flex gap-3">
        <button
          className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center active:bg-white/40"
          style={{ touchAction: "none" }}
          onTouchStart={() => handleControlStart("left")}
          onTouchEnd={() => handleControlEnd("left")}
          onMouseDown={() => handleMouseDown("left")}
          onMouseUp={() => handleMouseUp("left")}
          onMouseLeave={() => handleMouseUp("left")}
        >
          <ChevronLeft size={32} color="white" />
        </button>
        <button
          className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center active:bg-white/40"
          style={{ touchAction: "none" }}
          onTouchStart={() => handleControlStart("right")}
          onTouchEnd={() => handleControlEnd("right")}
          onMouseDown={() => handleMouseDown("right")}
          onMouseUp={() => handleMouseUp("right")}
          onMouseLeave={() => handleMouseUp("right")}
        >
          <ChevronRight size={32} color="white" />
        </button>
      </div>

      <div className="absolute bottom-6 right-6 z-10 flex gap-3">
        <button
          className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center active:bg-white/40"
          style={{ touchAction: "none" }}
          onTouchStart={() => handleControlStart("jump")}
          onTouchEnd={() => handleControlEnd("jump")}
          onMouseDown={() => handleMouseDown("jump")}
          onMouseUp={() => handleMouseUp("jump")}
          onMouseLeave={() => handleMouseUp("jump")}
        >
          <ArrowUp size={28} color="white" />
        </button>
        <button
          className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center active:bg-white/40"
          style={{ touchAction: "none" }}
          onTouchStart={() => handleControlStart("attack")}
          onTouchEnd={() => handleControlEnd("attack")}
          onMouseDown={() => handleMouseDown("attack")}
          onMouseUp={() => handleMouseUp("attack")}
          onMouseLeave={() => handleMouseUp("attack")}
        >
          <Banana size={24} color="white" />
        </button>
      </div>
    </>
  );
}
