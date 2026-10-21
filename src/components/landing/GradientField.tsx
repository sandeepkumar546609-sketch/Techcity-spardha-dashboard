export default function GradientField({
  className = "",
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "blue";
}) {
  return (
    <div
      className={`gradient-field ${tone === "blue" ? "gradient-field-blue" : ""} ${className}`}
      aria-hidden="true"
    >
      <div className="gradient-orb gradient-orb-a" />
      {tone === "blue" ? (
        <>
          <div className="gradient-orb gradient-orb-d" />
          <div className="gradient-orb gradient-orb-e" />
        </>
      ) : (
        <div className="gradient-orb gradient-orb-b" />
      )}
      <div className="gradient-orb gradient-orb-c" />
      <div className="gradient-shade" />
      <div className="gradient-noise" />
    </div>
  );
}
