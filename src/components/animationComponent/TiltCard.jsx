import { useRef, useState } from "react";
import { Card } from "@mui/material";

function TiltCard({ children, sx = {} }) {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Tilt effect
    const rotateX = -((y - centerY) / 30);
    const rotateY = (x - centerX) / 30;

    // Glow effect
    const dx = x - centerX;
    const dy = y - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = Math.sqrt(centerX ** 2 + centerY ** 2);
    const intensity = 1 - dist / maxDist;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      boxShadow: `0 0 ${30 * intensity}px ${
        10 * intensity
      }px rgba(88,166,255, ${intensity})`,
      transition: "all 0.1s ease-out",
    });
  };

  const resetStyle = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
      boxShadow: "none",
      transition: "all 0.3s ease-out",
    });
  };

  return (
    <Card
      ref={cardRef}
      sx={{
        backgroundColor: "background.default",
        borderRadius: 1,
        width: { xs: 150, sm: 290 },
        ...style,
        ...sx,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetStyle}
    >
      {children}
    </Card>
  );
}

export default TiltCard;
