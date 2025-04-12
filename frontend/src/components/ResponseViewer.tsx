import { ApiResponse } from "../types";

interface Props {
  response: ApiResponse | null;
}

const ResponseViewer = ({ response }: Props) => {
  if (!response) return null;

  return (
    <div className="card bg-base-200 shadow p-4 space-y-4">
      <div className="flex flex-wrap gap-4">
        <div>Status: <span className="font-bold">{response.status}</span></div>
        <div>Time: <span className="font-bold">{response.time} ms</span></div>
        <div>Size: <span className="font-bold">{response.size}</span></div>
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
        <pre className="bg-base-100 p-2 rounded overflow-auto whitespace-pre-wrap">
          {response.body}
        </pre>
      </div>
    </div>
  );
};

export default ResponseViewer;
