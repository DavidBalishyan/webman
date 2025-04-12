import { ApiResponse } from "../types";

interface Props {
  response: ApiResponse | null;
}

const ResponseViewer = ({ response }: Props) => {
  if (!response) {
    return (
      <div className="card bg-base-100 shadow p-4 text-center">
        No response yet. Make a request!
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow p-4">
      <h3 className="text-lg font-semibold mb-2">Response</h3>
      <div className="bg-neutral text-neutral-content p-2 rounded mb-2">
        Status: {response.status} • Time: {response.time}ms • Size: {response.size}
      </div>
      <pre className="bg-base-200 p-4 rounded overflow-auto max-h-96">
        {response.body}
      </pre>
    </div>
  );
};

export default ResponseViewer;
