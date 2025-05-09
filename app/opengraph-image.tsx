import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "EventCraft - Plan, Join, Celebrate";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      // OpenGraph Image
      <div
        style={{
          background: "linear-gradient(to right, #14998a, #1dd4c0, #18b3a3)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(circle, rgba(79,209,197,0.15) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* Gradient orbs */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "20%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(79,209,197,0.3) 0%, rgba(79,209,197,0) 70%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "20%",
            right: "20%",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(79,209,197,0.3) 0%, rgba(79,209,197,0) 70%)",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              background: "linear-gradient(135deg, #14998a, #1dd4c0, #18b3a3)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "40px",
              fontWeight: "bold",
              marginRight: "20px",
            }}
          >
            EC
          </div>
          <div
            style={{
              fontSize: "60px",
              fontWeight: "bold",
              background:
                "linear-gradient(to right, #14998a, #1dd4c0, #18b3a3)",
              backgroundClip: "text",
              color: "white",
            }}
          >
            EventCraft
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "32px",
            color: "white",
            opacity: 0.9,
            marginBottom: "60px",
            textAlign: "center",
            maxWidth: "800px",
          }}
        >
          Plan, Join, Celebrate
        </div>

        {/* Features */}
        <div
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          {[
            "Event Planning",
            "RSVP Management",
            "Participant Tracking",
            "Reviews & Feedback",
          ].map((feature) => (
            <div
              key={feature}
              style={{
                padding: "12px 24px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "30px",
                color: "white",
                fontSize: "18px",
              }}
            >
              {feature}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
