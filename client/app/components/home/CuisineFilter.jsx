const cuisines = ["Pizza", "Burgers", "Sushi", "Italian", "Chinese", "Mexican", "Desserts"];

export default function CuisineFilter({ selected, onSelect }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      <button
        onClick={() => onSelect("")}
        className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
          selected === ""
            ? "bg-[#EE5F2B] text-white border-[#EE5F2B]"
            : "bg-white text-gray-600 border-gray-200 hover:border-[#EE5F2B]"
        }`}
      >
        All
      </button>
      {cuisines.map((c) => (
        <button
          key={c}
          onClick={() => onSelect(c)}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
            selected === c
              ? "bg-[#EE5F2B] text-white border-[#EE5F2B]"
              : "bg-white text-gray-600 border-gray-200 hover:border-[#EE5F2B]"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}