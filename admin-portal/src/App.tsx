import { Admin } from "react-admin";
import { useAuthProvider } from "./hooks";

function App() {
  const { authProvider } = useAuthProvider();
  return (
    <Admin authProvider={authProvider} requireAuth>
      {/** */}
    </Admin>
  );
}

export default App;
