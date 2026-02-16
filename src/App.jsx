import { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import { Download } from "lucide-react";
import { GameScene } from "./GameScene";
import { createGameConfig } from "./gameConfig";
import { isMobileDevice, isPortrait } from "./utils/mobileDetect";
import GameHUD from "./components/GameHUD";
import MobileControls from "./components/MobileControls";
import { GAME_SETTINGS } from "./constants";

export default function App() {
  const gameRef = useRef(null);
  const [ammo, setAmmo] = useState(GAME_SETTINGS.MAX_AMMO);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileControls, setShowMobileControls] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);
  const [gameKey, setGameKey] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = isMobileDevice();
      setIsMobile(mobile);
      setShowMobileControls(mobile);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setShowInstall(false);
    }
  };

  const handleRestart = () => {
    setAmmo(GAME_SETTINGS.MAX_AMMO);
    setGameKey((prev) => prev + 1);
  };

  useEffect(() => {
    const mobileControls = {
      left: false,
      right: false,
      jump: false,
      attack: false,
    };

    const gameScene = new GameScene(setAmmo, handleRestart, mobileControls);
    const config = createGameConfig(gameScene);

    const game = new Phaser.Game(config);
    gameRef.current = game;
    game.mobileControls = mobileControls;

    const handleResizeGame = () => {
      game.scale.resize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResizeGame);

    return () => {
      window.removeEventListener("resize", handleResizeGame);
      game.destroy(true);
    };
  }, [gameKey]);

  return (
    <div className="w-screen h-screen bg-black relative overflow-hidden">
      {isMobile && isPortrait() && (
        <div className="absolute inset-0 z-50 bg-black flex items-center justify-center">
          <div
            className="text-white text-center"
            style={{ textShadow: "2px 2px 3px rgba(0,0,0,0.5)" }}
          >
            <div className="text-6xl mb-4">📱</div>
            <div className="text-2xl font-bold">Please rotate your device</div>
            <div className="text-lg mt-2">to landscape mode</div>
          </div>
        </div>
      )}

      {showInstall && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50">
          <button
            onClick={handleInstall}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg text-white font-bold text-lg shadow-lg transition-all flex items-center gap-3 animate-bounce"
            style={{ textShadow: "2px 2px 3px rgba(0,0,0,0.5)" }}
          >
            <Download size={24} />
            Install Game
          </button>
        </div>
      )}

      <GameHUD
        ammo={ammo}
        isMobile={isMobile}
        showMobileControls={showMobileControls}
        onRestart={handleRestart}
        onToggleControls={() => setShowMobileControls(!showMobileControls)}
      />

      {showMobileControls && <MobileControls gameRef={gameRef} />}

      <div id="game-container" className="w-full h-full" />
    </div>
  );
}
