import { RotateCcw, Gamepad2 } from "lucide-react";

export default function GameHUD({
  ammo,
  isMobile,
  showMobileControls,
  onRestart,
  onToggleControls,
}) {
  return (
    <>
      <div className="absolute top-6 left-6 z-10 select-none">
        <h1
          className="text-xl font-bold text-white mb-3"
          style={{ textShadow: "2px 2px 3px rgba(0,0,0,0.5)" }}
        >
          2D Platformer
        </h1>

        <div
          className="space-y-2 text-white text-xl"
          style={{ textShadow: "2px 2px 3px rgba(0,0,0,0.5)" }}
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="text-2xl"
                  style={{
                    opacity: i < ammo ? 1 : 0.3,
                    filter: i < ammo ? "none" : "grayscale(100%)",
                  }}
                >
                  🍌
                </span>
              ))}
            </div>
          </div>

          {!isMobile && (
            <div className="space-y-1 font-semibold">
              <p>
                <kbd className="px-2 py-1 bg-white/20 rounded text-sm">A</kbd>{" "}
                <kbd className="px-2 py-1 bg-white/20 rounded text-sm">D</kbd>{" "}
                Move
              </p>
              <p>
                <kbd className="px-2 py-1 bg-white/20 rounded text-sm">W</kbd>{" "}
                Jump
              </p>
              <p>
                <kbd className="px-2 py-1 bg-white/20 rounded text-sm">F</kbd>{" "}
                Attack
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="absolute top-6 right-6 z-10 flex gap-3">
        <button
          onClick={onRestart}
          className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white font-semibold text-sm transition-colors flex items-center gap-2"
          style={{ textShadow: "2px 2px 3px rgba(0,0,0,0.5)" }}
        >
          <RotateCcw size={18} />
          Restart
        </button>
        <button
          onClick={onToggleControls}
          className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white font-semibold text-sm transition-colors flex items-center gap-2"
          style={{ textShadow: "2px 2px 3px rgba(0,0,0,0.5)" }}
        >
          <Gamepad2 size={18} />
          {showMobileControls ? "Hide Controls" : "Show Controls"}
        </button>
      </div>
    </>
  );
}
