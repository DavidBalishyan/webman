import app from "./app.js";

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Webman backend running on http://localhost:${PORT}`);
});
