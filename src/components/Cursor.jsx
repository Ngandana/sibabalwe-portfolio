import { useCursor } from '../hooks/useCursor';

export default function Cursor() {
  useCursor();
  return (
    <>
      <div id="cursor" aria-hidden="true"></div>
      <div id="cursor-dot" aria-hidden="true"></div>
    </>
  );
}
