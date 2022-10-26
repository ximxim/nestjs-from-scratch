import {
  Edit,
  Button,
  TextInput,
  SimpleForm,
  ReferenceManyField,
  useEditContext,
  Datagrid,
  TextField,
  useNotify,
  useRefresh,
} from "react-admin";
import { useHttpClient } from "../../hooks";

const RecommendationsGrid = () => {
  const { record } = useEditContext();

  return (
    <ReferenceManyField
      label="Recommendations"
      reference={`user/${record?.id}/recommomendation`}
      target="userId"
    >
      <Datagrid>
        <TextField source="description" />
      </Datagrid>
    </ReferenceManyField>
  );
};

const RecommendButton = () => {
  const { httpClient, baseUrl } = useHttpClient();
  const { record } = useEditContext();
  const notify = useNotify();
  const refresh = useRefresh();

  const handleRecommendation = async () => {
    try {
      const response = await httpClient(
        `${baseUrl}/user/${record?.id}/recommomendation`,
        {
          method: "POST",
          body: JSON.stringify({
            description: `You received a recommendation`,
          }),
        }
      );

      if (response.status !== 201) throw new Error();

      notify(`Recommendation sent`, { type: "success" });
      refresh();
    } catch {
      notify("something went wrong", { type: "error" });
    }
  };

  return <Button onClick={handleRecommendation} label="Recommend User" />;
};

export const UserEdit = () => {
  return (
    <Edit
      actions={
        <>
          <RecommendButton />
        </>
      }
    >
      <SimpleForm>
        <TextInput source="username" />
      </SimpleForm>
      <RecommendationsGrid />
    </Edit>
  );
};
