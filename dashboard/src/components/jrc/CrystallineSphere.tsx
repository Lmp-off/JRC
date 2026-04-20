export default function CrystallineSphere() {
  return (
    <iframe
      src="/sphere/index.html"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      title="Crystalline Sphere"
    />
  );
}