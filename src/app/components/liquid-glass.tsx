import type { ComponentProps } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/cn"

// 液态玻璃原设计: @lucasromerodb
// Liquid Glass Effect for macOS
// https://github.com/lucasromerodb/liquid-glass-effect-macos

function Root() {
  return (
    <svg className="hidden">
      <filter
        id="liquid-glass"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.001 0.005"
          numOctaves="1"
          seed="17"
          result="turbulence"
        />

        <feComponentTransfer in="turbulence" result="mapped">
          <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
          <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
          <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
        </feComponentTransfer>

        <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />

        <feSpecularLighting
          in="softMap"
          surfaceScale="5"
          specularConstant="1"
          specularExponent="100"
          lightingColor="white"
          result="specLight"
        >
          <fePointLight x="-200" y="-200" z="300" />
        </feSpecularLighting>

        <feComposite
          in="specLight"
          operator="arithmetic"
          k1="0"
          k2="1"
          k3="1"
          k4="0"
          result="litImage"
        />

        <feDisplacementMap
          in="SourceGraphic"
          in2="softMap"
          scale="200"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  )
}

export default function LiquidGlass({
  children,
  className,
  asChild = false,
  ...props
}: Readonly<ComponentProps<"div"> & { asChild?: boolean }>) {
  const Comp = asChild ? Slot : "div"
  return (
    <div
      className={cn("relative", className)}
      {...props}
    >
      <div
        className={cn("absolute inset-0 isolate", className)}
        style={{
          backdropFilter: "blur(3px)",
          filter: "url(#liquid-glass)",
        }}
      />
      <div className={cn("absolute inset-0 bg-white/25", className)} />
      <div
        className={cn("absolute inset-0 overflow-hidden", className)}
        style={{
          boxShadow: "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5),"
            + "inset -1px -1px 1px 1px rgba(255, 255, 255, 0.5)",
        }}
      />
      <Comp className={cn("absolute inset-0", className)}>
        {children}
      </Comp>
    </div>
  )
}

LiquidGlass.Root = Root
