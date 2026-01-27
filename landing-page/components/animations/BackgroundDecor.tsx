export function BackgroundDecor() {
  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <div className="floating-shapes" aria-hidden="true">
        <span className="floating-shape" />
        <span className="floating-shape" />
        <span className="floating-shape" />
      </div>
    </>
  );
}
