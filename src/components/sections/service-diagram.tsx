type Capability = "software" | "ai" | "web" | "product";

/** Decorative, code-native diagrams; capability copy remains the accessible explanation. */
export function ServiceDiagram({ type }: { type: Capability }) {
  return (
    <svg
      className={`service-diagram diagram-${type}`}
      viewBox="0 0 320 190"
      fill="none"
      aria-hidden="true"
    >
      {type === "software" ? (
        <>
          <path d="M160 48v35M65 115V83h190v32M160 83v32" />
          <rect x="117" y="15" width="86" height="33" />
          <rect x="22" y="115" width="86" height="45" />
          <rect x="117" y="115" width="86" height="45" />
          <rect x="212" y="115" width="86" height="45" />
          <circle className="diagram-accent" cx="160" cy="83" r="3" />
        </>
      ) : type === "ai" ? (
        <>
          <path d="M55 50L160 95 55 140M160 95h90" />
          <circle cx="55" cy="50" r="22" />
          <circle cx="55" cy="140" r="22" />
          <circle cx="160" cy="95" r="33" />
          <rect x="250" y="67" width="48" height="56" />
          <circle className="diagram-accent" cx="160" cy="95" r="4" />
        </>
      ) : type === "web" ? (
        <>
          <rect x="24" y="24" width="210" height="132" />
          <path d="M24 48h210M45 69h112M45 83h80M45 123h60" />
          <rect x="213" y="75" width="65" height="96" />
          <path d="M228 95h35M228 108h25" />
          <circle className="diagram-accent" cx="246" cy="154" r="3" />
        </>
      ) : (
        <>
          <rect x="33" y="24" width="254" height="142" />
          <path d="M33 58h254M116 58v108M137 81h125M137 99h75M53 81h42M53 99h30M137 135h42" />
          <circle className="diagram-accent" cx="271" cy="41" r="3" />
        </>
      )}
    </svg>
  );
}
