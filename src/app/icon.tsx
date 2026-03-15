import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "linear-gradient(135deg, #0A0A0A 0%, #1a1a2e 50%, #0A0A0A 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Inner glow ring */}
        <div
          style={{
            position: "absolute",
            width: 22,
            height: 22,
            borderRadius: 6,
            border: "1px solid rgba(255,255,255,0.12)",
            display: "flex",
          }}
        />
        {/* Primary sparkle */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 2l1.5 5.5a4 4 0 002.95 2.95L22 12l-5.55 1.55a4 4 0 00-2.95 2.95L12 22l-1.5-5.5a4 4 0 00-2.95-2.95L2 12l5.55-1.55a4 4 0 002.95-2.95L12 2z"
            fill="white"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
