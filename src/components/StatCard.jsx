import { useCountUp } from '../hooks/useCountUp';

export default function StatCard({ target, suffix, staticValue, label }) {
  const { ref, display } = useCountUp(target ?? null, suffix ?? '');
  const value = target != null ? display : staticValue;

  return (
    <div className="stat-card" ref={ref}>
      <div className="stat-num" data-count={target != null ? '' : undefined}>{value}</div>
      <div className="stat-lbl">{label}</div>
    </div>
  );
}
