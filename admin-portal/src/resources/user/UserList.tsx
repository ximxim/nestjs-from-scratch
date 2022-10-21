import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  DateField,
} from "react-admin";

export const UserList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="username" />
        <BooleanField source="isActive" />
        <DateField source="createdAt" label="Created At" />
        <DateField source="updatedAt" />
      </Datagrid>
    </List>
  );
};
