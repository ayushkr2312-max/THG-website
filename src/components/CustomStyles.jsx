import React from 'react';

const CustomStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap');
    @import url('https://fonts.cdnfonts.com/css/kwark');
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700;1,900&display=swap');
    @import url('https://fonts.cdnfonts.com/css/flipbash-condensed');
    
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Flipbash', sans-serif !important;
      letter-spacing: 0.085em;
      word-spacing: -0.13em;
    }
    :root {
      --diamond-blue: #facc15;
      --diamond-purple: #f59e0b;
      --accent-red: #ef4444;
      --accent-orange: #f59e0b;
    }

    body {
      font-family: 'Montserrat', sans-serif !important;
      background-color: #09090b;
      color: white;
      overflow-x: hidden;
    }

    /* Glitch Effect — now with blue/purple */
    .glitch-wrapper { position: relative; }
    
    .glitch {
      position: relative;
      font-weight: 900;
      font-style: italic;
      text-transform: uppercase;
      z-index: 1;
    }

    .glitch::before, .glitch::after {
      content: attr(data-text);
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: #09090b;
    }

    .glitch::before {
      left: 2px;
      text-shadow: -2px 0 var(--diamond-purple);
      clip: rect(24px, 550px, 90px, 0);
      animation: glitch-anim-2 3s infinite linear alternate-reverse;
      z-index: -1;
    }

    .glitch::after {
      left: -2px;
      text-shadow: -2px 0 var(--diamond-blue);
      clip: rect(85px, 550px, 140px, 0);
      animation: glitch-anim 2.5s infinite linear alternate-reverse;
      z-index: -2;
    }

    @keyframes glitch-anim {
      0% { clip: rect(10px, 9999px, 83px, 0); }
      5% { clip: rect(61px, 9999px, 20px, 0); }
      10% { clip: rect(74px, 9999px, 8px, 0); }
      15% { clip: rect(16px, 9999px, 91px, 0); }
      20% { clip: rect(58px, 9999px, 55px, 0); }
      25% { clip: rect(18px, 9999px, 25px, 0); }
      30% { clip: rect(98px, 9999px, 35px, 0); }
      35% { clip: rect(27px, 9999px, 4px, 0); }
      40% { clip: rect(61px, 9999px, 70px, 0); }
      45% { clip: rect(15px, 9999px, 2px, 0); }
      50% { clip: rect(93px, 9999px, 12px, 0); }
      55% { clip: rect(54px, 9999px, 13px, 0); }
      60% { clip: rect(79px, 9999px, 89px, 0); }
      65% { clip: rect(81px, 9999px, 46px, 0); }
      70% { clip: rect(48px, 9999px, 59px, 0); }
      75% { clip: rect(13px, 9999px, 30px, 0); }
      80% { clip: rect(92px, 9999px, 100px, 0); }
      85% { clip: rect(10px, 9999px, 80px, 0); }
      90% { clip: rect(49px, 9999px, 63px, 0); }
      95% { clip: rect(2px, 9999px, 21px, 0); }
      100% { clip: rect(65px, 9999px, 97px, 0); }
    }

    @keyframes glitch-anim-2 {
      0% { clip: rect(65px, 9999px, 100px, 0); }
      5% { clip: rect(52px, 9999px, 74px, 0); }
      10% { clip: rect(79px, 9999px, 85px, 0); }
      15% { clip: rect(75px, 9999px, 5px, 0); }
      20% { clip: rect(67px, 9999px, 61px, 0); }
      25% { clip: rect(14px, 9999px, 79px, 0); }
      30% { clip: rect(1px, 9999px, 66px, 0); }
      35% { clip: rect(86px, 9999px, 30px, 0); }
      40% { clip: rect(23px, 9999px, 98px, 0); }
      45% { clip: rect(85px, 9999px, 72px, 0); }
      50% { clip: rect(71px, 9999px, 75px, 0); }
      55% { clip: rect(2px, 9999px, 48px, 0); }
      60% { clip: rect(30px, 9999px, 16px, 0); }
      65% { clip: rect(59px, 9999px, 50px, 0); }
      70% { clip: rect(41px, 9999px, 62px, 0); }
      75% { clip: rect(2px, 9999px, 82px, 0); }
      80% { clip: rect(47px, 9999px, 73px, 0); }
      85% { clip: rect(3px, 9999px, 27px, 0); }
      90% { clip: rect(26px, 9999px, 55px, 0); }
      95% { clip: rect(42px, 9999px, 97px, 0); }
      100% { clip: rect(38px, 9999px, 49px, 0); }
    }

    /* Scanlines */
    .scanlines::before {
      content: " ";
      display: block;
      position: fixed;
      top: 0; left: 0; bottom: 0; right: 0;
      background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.15) 50%), linear-gradient(90deg, rgba(0, 100, 255, 0.03), rgba(100, 0, 255, 0.02), rgba(0, 200, 255, 0.03));
      z-index: 99;
      background-size: 100% 2px, 3px 100%;
      pointer-events: none;
    }

    /* Angled cuts */
    .ui-cut {
      clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
    }
    .ui-cut-reverse {
      clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
    }

    /* Typewriter cursor */
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .cursor-blink::after {
      content: '█';
      animation: blink 0.8s step-end infinite;
      color: var(--diamond-blue);
    }

    /* Diamond spin */
    @keyframes diamond-rotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes diamond-pulse {
      0%, 100% { opacity: 0.3; transform: scale(1) rotate(45deg); }
      50% { opacity: 0.6; transform: scale(1.05) rotate(45deg); }
    }

    /* Gradient text */
    .gradient-text-gold {
      background: linear-gradient(135deg, #facc15 0%, #f59e0b 50%, #facc15 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: gradient-shift 4s ease infinite;
    }

    .gradient-text-fire {
      background: linear-gradient(135deg, #ef4444 0%, #f59e0b 50%, #ef4444 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: gradient-shift 3s ease infinite;
    }

    @keyframes gradient-shift {
      0% { background-position: 0% center; }
      50% { background-position: 100% center; }
      100% { background-position: 0% center; }
    }

    /* Countdown digits */
    .countdown-digit {
      font-variant-numeric: tabular-nums;
    }

    /* Hero gradient mesh */
    .hero-mesh {
      background:
        radial-gradient(ellipse at 20% 50%, rgba(250, 204, 21, 0.15) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, rgba(245, 158, 11, 0.12) 0%, transparent 50%),
        radial-gradient(ellipse at 60% 80%, rgba(250, 204, 21, 0.08) 0%, transparent 50%),
        radial-gradient(ellipse at 40% 30%, rgba(239, 68, 68, 0.05) 0%, transparent 40%);
    }

    /* Diamond wireframe shape */
    .diamond-shape {
      width: 200px;
      height: 200px;
      border: 1px solid rgba(250, 204, 21, 0.3);
      transform: rotate(45deg);
      position: relative;
    }
    .diamond-shape::before {
      content: '';
      position: absolute;
      inset: 15px;
      border: 1px solid rgba(245, 158, 11, 0.3);
    }
    .diamond-shape::after {
      content: '';
      position: absolute;
      inset: 30px;
      border: 1px solid rgba(250, 204, 21, 0.2);
    }

    /* Premium Sweeping & Pulsing text shine effect */
    .shine-text-stroke::before {
      content: attr(data-text);
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      -webkit-text-stroke: 2px #fef08a; /* Light yellow */
      color: transparent;
      z-index: 2;
      pointer-events: none;
      mask-image: linear-gradient(60deg, transparent 40%, white 50%, transparent 60%);
      -webkit-mask-image: linear-gradient(60deg, transparent 40%, white 50%, transparent 60%);
      mask-size: 200% 100%;
      -webkit-mask-size: 200% 100%;
      animation: sweep-pulse 6s infinite ease-in-out;
    }

    .shine-text-fill::before {
      content: attr(data-text);
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      color: #fef08a; /* Light yellow */
      z-index: 2;
      pointer-events: none;
      mask-image: linear-gradient(60deg, transparent 40%, white 50%, transparent 60%);
      -webkit-mask-image: linear-gradient(60deg, transparent 40%, white 50%, transparent 60%);
      mask-size: 200% 100%;
      -webkit-mask-size: 200% 100%;
      animation: sweep-pulse 6s infinite ease-in-out 1.5s;
    }

    @keyframes sweep-pulse {
      0% { -webkit-mask-position: 200% 0%; mask-position: 200% 0%; opacity: 0; }
      20% { opacity: 0.5; }
      80% { opacity: 0.5; }
      100% { -webkit-mask-position: -100% 0%; mask-position: -100% 0%; opacity: 0; }
    }
  `}} />
);

export default CustomStyles;
