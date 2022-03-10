import { useLoaderData } from "remix";

export const loader = async ({ params: { id } }) => {
  const response = await fetch(
    `${process.env.BASE_PATH}/character/${id}/quote`,
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    }
  );
  const data = await response.json();
  return data / 1000;
};

export default function Character() {
  const data = useLoaderData();
  return (
    <div>
      <h3>Quotes</h3>
      {data.docs.length > 0 ? (
        <ul>
          {data.docs.map((q) => (
            <li key={q._id}>{q.dialog}</li>
          ))}
        </ul>
      ) : (
        <div>No quotes found.</div>
      )}
    </div>
  );
}

export function ErrorBoundary({ error }) {
  console.error(error);
  return (
    <div style={{ color: "red" }}>
      Something went wrong: <strong>{error.message}</strong>
    </div>
  );
}
