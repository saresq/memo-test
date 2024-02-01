export default function Loader({ withBackground = true }) {
  return (
    <div className={`w-96 h-96 m-auto animate-pulse ${withBackground ? 'glass' : ''} flex justify-center items-center`}>
      <div className="m-auto loader"></div>
    </div>
  );
}
