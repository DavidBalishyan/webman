import { useState } from "react";
import { sendRequest } from "../services/apiClient";
import { ApiResponse } from "../types";

interface Props {
  setResponse: (res: ApiResponse) => void;
}

interface Header {
  key: string;
  value: string;
}

const RequestBuilder = ({ setResponse }: Props) => {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState<Header[]>([{ key: "", value: "" }]);
  const [body, setBody] = useState("");

  // 👉 This is handleSend
  const handleSend = async () => {
    if (!url) return alert("Enter a URL");

    let parsedBody: any = undefined;
    if (method !== "GET" && body) {
      try {
        parsedBody = JSON.parse(body);
      } catch (error) {
        alert("Invalid JSON in request body.");
        return;
      }
    }

    try {
      const res = await sendRequest(method, url, parsedBody, headers);
      setResponse(res);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch.");
    }
  };

  const handleHeaderChange = (index: number, field: "key" | "value", value: string) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index][field] = value;
    setHeaders(updatedHeaders);
  };

  const addHeader = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  const removeHeader = (index: number) => {
    const updatedHeaders = [...headers];
    updatedHeaders.splice(index, 1);
    setHeaders(updatedHeaders);
  };

  return (
    <div className="card bg-base-100 shadow p-4 space-y-4">
      {/* Method & URL */}
      <div className="flex items-center gap-2">
        <select
          className="select select-bordered w-24"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>

        <input
          type="text"
          className="input input-bordered flex-1"
          placeholder="https://api.example.com/endpoint"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button className="btn btn-primary" onClick={handleSend}>
          Send
        </button>
      </div>

      {/* Headers */}
      <div>
        <h4 className="font-semibold mb-2">Headers</h4>
        <div className="space-y-2">
          {headers.map((header, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                className="input input-bordered w-40"
                placeholder="Key"
                value={header.key}
                onChange={(e) => handleHeaderChange(index, "key", e.target.value)}
              />
              <input
                type="text"
                className="input input-bordered w-52"
                placeholder="Value"
                value={header.value}
                onChange={(e) => handleHeaderChange(index, "value", e.target.value)}
              />
              <button
                className="btn btn-sm btn-error"
                onClick={() => removeHeader(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button className="btn btn-sm btn-accent mt-2" onClick={addHeader}>
          + Add Header
        </button>
      </div>

      {/* Body Editor */}
      <div>
        <h4 className="font-semibold mb-2">Body</h4>
        <textarea
          className="textarea textarea-bordered w-full h-40"
          placeholder='{"key": "value"}'
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
    </div>
  );
};

export default RequestBuilder;
