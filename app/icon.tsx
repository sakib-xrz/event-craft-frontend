import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 192,
  height: 192,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // Icon Design with more details
      <div
        style={{
          background: "linear-gradient(135deg, #14998a, #1dd4c0, #18b3a3)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "40px",
          color: "white",
          fontWeight: "bold",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: "absolute",
            width: "200%",
            height: "200%",
            top: "-50%",
            left: "-50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
            transform: "rotate(30deg)",
          }}
        />

        {/* Logo text */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            letterSpacing: "-0.05em",
            zIndex: 10,
          }}
        >
          EC
        </div>

        {/* Subtle underline */}
        <div
          style={{
            width: "60%",
            height: "4px",
            background: "rgba(255,255,255,0.5)",
            borderRadius: "2px",
            marginTop: "8px",
            zIndex: 10,
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
