import OAuthComponent from "./components";

export default function OAuth(props: {
  searchParams: {
    sourceURI: string;
    code: string;
  };
}) {
  const {searchParams} = props;
  const sourceURI = searchParams.sourceURI as string;
  const code = searchParams.code;

  return <OAuthComponent code={code} sourceURI={sourceURI} />;
}
