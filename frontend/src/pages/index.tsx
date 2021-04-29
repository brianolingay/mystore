import Container from "../shared/components/Container";
import useUser from "../shared/hooks/useUser";

const Index = () => {
  const { me } = useUser({});
  return (
    <Container>
      <h1>Welcome to MyStore {me && <strong>{me.email}</strong>}</h1>
    </Container>
  );
};

export default Index;
