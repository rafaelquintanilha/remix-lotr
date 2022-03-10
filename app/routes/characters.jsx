import { useState } from "react";
import { Link, Outlet, useLoaderData } from "remix";

export const loader = async () => {
  const response = await fetch(
    `${process.env.BASE_PATH}/character?sort=name:asc`,
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    }
  );
  const data = await response.json();
  return data;
};

export default function Characters() {
  const data = useLoaderData();
  const [filter, setFilter] = useState("");
  return (
    <main>
      <h1>Characters</h1>
      <hr />
      <div style={{ display: "flex", marginTop: "40px" }}>
        <div>
          <label>
            <strong>Filter:</strong>
          </label>
          &nbsp;
          <input value={filter} onChange={(e) => setFilter(e.target.value)} />
          <ul>
            {data.docs
              .filter((d) =>
                filter === ""
                  ? true
                  : d.name.toLowerCase().includes(filter.toLowerCase())
              )
              .map((d) => (
                <Link key={d._id} to={d._id} style={{ display: "block" }}>
                  {d.name}
                </Link>
              ))}
          </ul>
        </div>
        <div
          style={{
            position: "sticky",
            top: "20px",
            marginLeft: "20px",
            alignSelf: "flex-start",
          }}
        >
          <Outlet />
        </div>
      </div>
    </main>
  );
}
