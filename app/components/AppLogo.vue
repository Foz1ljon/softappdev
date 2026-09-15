<template>
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="SoftAppDev"
  >
    <defs>
      <linearGradient
        id="sad-brand-gradient"
        x1="2"
        y1="2"
        x2="38"
        y2="38"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#6366F1" />
        <stop
          offset="0.55"
          stop-color="#06B6D4"
        />
        <stop
          offset="1"
          stop-color="#10B981"
        />
      </linearGradient>
    </defs>

    <!-- Outer plate -->
    <rect
      x="1.35"
      y="1.35"
      width="37.3"
      height="37.3"
      rx="11"
      stroke="url(#sad-brand-gradient)"
      stroke-width="2.7"
    />

    <!-- Monogram S -->
    <path
      d="M26.6 13.8c-1.35-1.6-3.45-2.55-5.9-2.55-3.75 0-6.35 2.05-6.35 5.05 0 2.75 1.95 4.15 5.85 4.9 3.4.65 4.8 1.4 4.8 3 0 1.8-1.7 3-4.4 3-2.45 0-4.5-.85-5.9-2.45"
      stroke="url(#sad-brand-gradient)"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <!-- Ship dot -->
    <circle
      cx="30.2"
      cy="9.9"
      r="2.35"
      fill="url(#sad-brand-gradient)"
    />
  </svg>
</template>
