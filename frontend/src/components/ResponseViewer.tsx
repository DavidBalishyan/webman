import { useState } from "react";
import { ApiResponse } from "../types";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import themeOptions from "../styles/themeOptions";

interface Props {
  response: ApiResponse | null;
}

const ResponseViewer = ({ response }: Props) => {
  const [selectedTheme, setSelectedTheme] = useState<keyof typeof themeOptions>("Atom One Dark");

  if (!response) return null;

  return (
    <div className="card bg-base-200 shadow p-4 space-y-4">
      <div className="flex flex-wrap gap-4">
        <div>Status: <span className="font-bold">{response.status}</span></div>
        <div>Time: <span className="font-bold">{response.time} ms</span></div>
        <div>Size: <span className="font-bold">{response.size}</span></div>
      </div>

      {/* Theme Picker */}
      <div className="form-control w-60">
        <label className="label">
          <span className="label-text">Syntax Highlight Theme</span>
        </label>
        <select
          className="select select-bordered"
          value={selectedTheme}
          onChange={(e) => setSelectedTheme(e.target.value as keyof typeof themeOptions)}
        >
          {Object.keys(themeOptions).map((themeName) => (
            <option key={themeName} value={themeName}>
              {themeName}
            </option>
          ))}
        </select>
      </div>

      {/* Response Headers */}
      <div>
        <h4 className="font-semibold mb-2">Headers</h4>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(response.headers).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Response Body */}
      <div>
        <h4 className="font-semibold mb-2">Body</h4>
        <SyntaxHighlighter
          language="json"
          style={themeOptions[selectedTheme as keyof typeof themeOptions]}
          customStyle={{
            borderRadius: "0.5rem", 
            padding: "1rem",
            background: "var(--b1)",
            fontSize: "0.85rem",
          }}
        >
          {typeof response.body === "object"
            ? JSON.stringify(response.body, null, 2)
            : response.body}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default ResponseViewer;
