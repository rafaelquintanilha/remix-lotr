import { Link, useLoaderData, Outlet } from "remix";

export const loader = async ({ params: { id } }) => {
  const response = await fetch(`${process.env.BASE_PATH}/character/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  });
  const data = await response.json();
  return data;
};

export default function Character() {
  const data = useLoaderData();
  const character = data.docs[0];
  return (
    <div style={{ display: "flex" }}>
      <div style={{ minWidth: "300px" }}>
        <h1>{character.name}</h1>
        <div>
          <b>Birth</b>: {character.birth}
        </div>
        <div>
          <b>Death</b>: {character.death}
        </div>
        <div>
          <b>Gender</b>: {character.gender}
        </div>
        <div>
          <b>Hair</b>: {character.hair}
        </div>
        <div>
          <b>Height</b>: {character.height}
        </div>
        <div>
          <b>Race</b>: {character.race}
        </div>
        <div>
          <b>Realm</b>: {character.realm}
        </div>
        <div>
          <b>Spouse</b>: {character.spouse}
        </div>
        <div>
          <a href={character.wikiUrl}>Wiki URL</a>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Link to="quotes">See quotes</Link>
        </div>
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
  );
}
