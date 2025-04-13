import { useState } from "react";
import Sidebar from "./components/Sidebar";
import RequestBuilder from "./components/RequestBuilder";
import ResponseViewer from "./components/ResponseViewer";
import { ApiResponse } from "./types";
import AuthForms from "./components/AuthForms";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
  const [response, setResponse] = useState<ApiResponse | null>(null);

  return (
    <div className="flex h-screen bg-base-200 text-base-content">
      <Sidebar />
    <Router>
      <Routes>
      <Route path="/" element={<main className="flex flex-col flex-1 p-4 gap-4 overflow-auto">
        <RequestBuilder setResponse={setResponse}/>
        <ResponseViewer response={response} />
      </main>} />
        <Route path="/auth" element={<AuthForms setToken={() => {}} />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;

