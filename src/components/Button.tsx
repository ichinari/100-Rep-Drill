import type { CSSProperties } from "react";

type Props = {
  text: string;
  type?: "button" | "submit";
  size?: "large" | "midium" | "small";
  backgroundColor?: string;
  isDisabled?: boolean;
  onClick?: () => void;
};

function Button({
  text,
  type = "button",
  size = "midium",
  backgroundColor = "blue",
  isDisabled = false,
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
  };

  return (
    <button
      style={buttonStyle}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className="cursor-pointer bg-(--btn-bg) transition-[background-color,opacity] enabled:hover:bg-(--btn-bg-light) enabled:active:bg-(--btn-bg-light) disabled:cursor-not-allowed disabled:opacity-40"
    >
      {text}
    </button>
  );
}

export default Button;
