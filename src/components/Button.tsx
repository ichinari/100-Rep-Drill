import type { CSSProperties } from "react";

type Props = {
  text: string;
  size?: "large" | "midium" | "small";
  backgroundColor?: string;
  onClick?: () => void;
};

function Button({
  text,
  size = "midium",
  backgroundColor = "blue",
  onClick,
}: Props) {
  const buttonStyle: CSSProperties & Record<`--${string}`, string> = {
    // ホバー・クリック時は指定色に白を混ぜた薄い色にする
    "--btn-bg": backgroundColor,
    "--btn-bg-light": `color-mix(in srgb, ${backgroundColor} 70%, white)`,
    padding:
      size === "small"
        ? "5px 10px"
        : size === "large"
          ? "15px 30px"
          : "10px 20px",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <button
      style={buttonStyle}
      onClick={onClick}
      className="bg-(--btn-bg) transition-colors hover:bg-(--btn-bg-light) active:bg-(--btn-bg-light)"
    >
      {text}
    </button>
  );
}

export default Button;
