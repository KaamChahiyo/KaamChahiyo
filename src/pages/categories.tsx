export default function Categories({ data }) {
  return (
    <div>
      {data?.categories?.map((category, index) => {
        return (
          <div key={category.id}>
            <div>
              <div>{category.id}</div>
              <div>{category.displayName}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export async function getServerSideProps() {
  const getCategories = await fetch("http://localhost:3000/api/categories");
  const data = await getCategories.json();
  return { props: { data } };
}
