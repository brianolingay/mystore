import Layout from "../shared/components/Layout";
import useUser from "../shared/hooks/useUser";

const Index = () => {
  const { me } = useUser({});
  return (
    <Layout>
      <h1>Welcome to MyStore {me && <strong>{me.name || me.email}</strong>}</h1>
    </Layout>
  );
};

export default Index;
