export default function LiquidGlassRoot() {
  return (
    <svg className="hidden">
      <defs>
        <filter id="lq" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
          <feDisplacementMap scale="200" />
        </filter>
      </defs>
    </svg>
  )
}
