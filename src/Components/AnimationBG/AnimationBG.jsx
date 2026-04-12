import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; 
import "./animationBg.css"

export default function AnimationBG() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
  () => ({
    background: {
      color: { value: "#0a0a1a" },
    },

    particles: {
      number: { value: 100 }, 
      color: { value: "#14b8a6" },
      links: {
        enable: true,
        color: "#14b8a6",
        distance: 120,
        opacity: 0.6,
        width: 1.5,
      },
      move: {
        enable: true,
        speed: 1,
      },
      size: { value: 3 },
    },

    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse",
        },
      },
    },

    responsive: [
      {
        maxWidth: 768, 
        options: {
          particles: {
            number: {
              value: 60, 
            },
            links: {
              distance: 80, 
            },
          },
        },
      },
    ],

    retina_detect: true,
  }),
  []
);

  if (!init) return null;

  return <Particles id="tsparticles" options={options} />;
}
