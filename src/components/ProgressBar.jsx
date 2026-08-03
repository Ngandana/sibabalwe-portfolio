export default function ProgressBar({ pct }) {
  return (
    <div
      id="progress-bar"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow={Math.round(pct)}
      style={{ width: pct + '%' }}
    ></div>
  );
}
