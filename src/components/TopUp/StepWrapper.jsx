export default function StepWrapper({ step }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-6">
      {[1, 2, 3, 4].map((s) => (
        <div
          key={s}
          className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${
            step === s ? "bg-orange-500" : "bg-gray-300"
          }`}
        >
          {s}
        </div>
      ))}
    </div>
  );
}
