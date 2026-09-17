export default function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
}) {
  const variants = {
    primary:
      "bg-[#238636] text-white hover:bg-[#2ea043]",

    secondary:
      "border border-[#30363d] bg-[#161b22] text-[#e6edf3] hover:border-[#58a6ff]",

    danger:
      "bg-[#da3633] text-white hover:bg-[#f85149]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-md px-4 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}