import { useEffect, useRef } from "react";

export function ECGAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let offset = 0;

    const ecgPattern = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      2, 5, 8, 10, 8, 5, 2, 0,
      0, 0, 0, 0,
      -5, -8, -10,
      40, 60, 80, 60, 40,
      -15, -20, -25, -20, -15,
      0, 0, 0, 0,
      5, 10, 15, 20, 18, 15, 12, 8, 5, 3, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Draw grid
      ctx.strokeStyle = "rgba(14, 165, 163, 0.1)";
      ctx.lineWidth = 1;
      for (let i = 0; i < width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }
      for (let i = 0; i < height; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
      }

      // Draw ECG line
      ctx.beginPath();
      ctx.strokeStyle = "hsl(186, 72%, 45%)";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Add glow effect
      ctx.shadowColor = "hsl(186, 72%, 45%)";
      ctx.shadowBlur = 10;

      for (let x = 0; x < width; x++) {
        const patternIndex = Math.floor((x + offset) % ecgPattern.length);
        const y = centerY - ecgPattern[patternIndex] * 0.8;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
      ctx.shadowBlur = 0;

      offset += 1;
      animationId = requestAnimationFrame(draw);
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative w-full h-32 rounded-xl overflow-hidden bg-card/50 border border-border">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block" }}
      />
      <div className="absolute top-2 left-3 flex items-center gap-2">
        <span className="status-dot status-dot-normal"></span>
        <span className="text-xs text-status-normal font-medium">Normal Rhythm</span>
      </div>
      <div className="absolute top-2 right-3 text-xs text-muted-foreground">
        72 BPM
      </div>
    </div>
  );
}
