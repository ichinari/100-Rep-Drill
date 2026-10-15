type Props = {
  name: string;
};

function Greeting({ name }: Props) {
  return <p>こんにちは、{name}さん！</p>;
}

export default Greeting;
