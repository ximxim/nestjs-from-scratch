import { Edit, TextInput, SimpleForm } from "react-admin";

export const UserEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="username" />
      </SimpleForm>
    </Edit>
  );
};
