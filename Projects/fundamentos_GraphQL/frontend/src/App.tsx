import { gql, useQuery } from "@apollo/client";
import { NewUserForm } from "./components/NewUserForm";

type User = {
  id: string;
  name: string;
}

export const GET_USER = gql`
  query {
    users {
      id
      name
    }
  }
`;

function App() {
  const { data, loading } = useQuery<{ users: User[] }>(GET_USER);

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data?.users.map((user: User) => <li key={user.id}>{user.name}</li>)}
        {data?.users.length === 0 && <li>No users</li>}
      </ul>

      <NewUserForm />
    </div>
  );
}

export default App
