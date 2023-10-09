import { useState, useEffect } from "react";
import MainView from "./view/mainView";
import { BaseLayout } from "../src/layout/baseLayout";
import { debounce } from "./utils/debounce";
import { Stack, CircularProgress } from "@mui/material/";

function App() {
  // localStorage.removeItem("navIndex");

  const [load, setLoad] = useState(false);

  useEffect(() => {
    const debouncedFunc = debounce(() => {
      setLoad(true);
    }, 500);

    debouncedFunc();
  }, []);

  return (
    <BaseLayout>
      {!load && (
        <Stack
          spacing={2}
          direction="row"
          sx={{
            width: "100%",
            height: "100%",
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="primary" />
        </Stack>
      )}
      {load && <MainView />}
    </BaseLayout>
  );
}

export default App;
