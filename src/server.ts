import app from "./app";
import { configEnv } from "./config/app/env.config";

const PORT = configEnv.port || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
