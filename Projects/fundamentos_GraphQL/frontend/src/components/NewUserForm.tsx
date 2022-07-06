import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { client } from "../lib/apollo";

import { GET_USER } from "../App";

const CREATE_USER = gql`
  mutation ($name: String!) {
    createUser(name: $name) {
      id
      name
    }
  }
`;

export function NewUserForm() {
  const [name, setName] = useState("");
  const [createUser, { loading }] = useMutation(CREATE_USER);

  async function handleCreateUser(event: FormEvent) {
    event.preventDefault();
    if (!name) return;
    await createUser({
      variables: { name },
      // refetchQueries: [GET_USER], // This will cause the query to be rerun, creating an another network request
      update: (cache, { data }) => {
        if (!data) return;
        const { users } = client.readQuery({ query: GET_USER });

        cache.writeQuery({
          query: GET_USER,
          data: {
            users: [
              ...users,
              data.createUser
            ]
          }
        });
      },
      onCompleted(data) {
        console.log(data);
        setName("");
      },
    });
  }

  return (
    <form onSubmit={handleCreateUser}>
      <label>
        Name:
        <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <button disabled={loading} type="submit">{loading ? 'creating user, await...' : 'Create'}</button>
    </form>
  )
}