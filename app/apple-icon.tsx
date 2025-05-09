import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // Apple Icon Design
      <div
        style={{
          fontSize: 80,
          background: "linear-gradient(to right, #14998a, #1dd4c0, #18b3a3)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "36px",
          color: "white",
          fontWeight: "bold",
        }}
      >
        EC
      </div>
    ),
    {
      ...size,
    }
  );
}
