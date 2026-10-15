type Props = {
  text: string;
  size?: "large" | "midium" | "small";
  backgroundColor?: string;
};

function Button({ text, size = "midium", backgroundColor = "blue" }: Props) {
  const buttonStyle = {
    padding:
      size === "small"
        ? "5px 10px"
        : size === "large"
          ? "15px 30px"
          : "10px 20px",
    backgroundColor: backgroundColor,
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return <button style={buttonStyle}>{text}</button>;
}

export default Button;
