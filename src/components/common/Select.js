export default function Select({
  label,
  value,
  onChange,
  options = [],
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-[#e6edf3]">
          {label}
        </label>
      )}

      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2.5 text-sm text-[#e6edf3] outline-none focus:border-[#58a6ff]"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-[#161b22]"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}