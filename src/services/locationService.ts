export interface ILocation {
  id: string;
  name: string;
  displayName: string;
}
export async function getLocations(): Promise<ILocation[]> {
  const locations = await fetch("http://localhost:3000/api/location", {
    method: "GET",
    headers: { "Content-Type": "application/json", accept: "application/json" },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return locations?.locations;
}
