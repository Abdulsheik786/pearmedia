export default function ResultCard({ image }) {
  return (
    <div className="mt-4 p-4 bg-gray-800 rounded-xl shadow-lg">
      <img src={image} className="rounded-lg mx-auto" />
    </div>
  );
}