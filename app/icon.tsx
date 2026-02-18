import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #7c3aed, #3b82f6)",
          color: "#ffffff",
          fontSize: 30,
          fontWeight: 700
        }}
      >
        R
      </div>
    ),
    {
      ...size
    }
  );
}
