import Image from "next/image";
import Link from "next/link";

export default function IllustrationArea() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src="/Group 263.svg"
          alt="Illustration"
          width={443}
          height={458}
          style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "100%" }}
          priority
        />
      </Link>
    </div>
  );
}
