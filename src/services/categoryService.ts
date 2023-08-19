export interface ICategory {
  id: string;
  name: string;
  displayName: string;
}
export async function getCategories(): Promise<ICategory[]> {
  const categories = await fetch("http://localhost:3000/api/categories", {
    method: "GET",
    headers: { "Content-Type": "application/json", accept: "application/json" },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return categories?.categories;
}
