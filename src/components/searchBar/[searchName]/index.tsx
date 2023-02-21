import React from "react";

export default function index({ params, search }) {
  console.log("params: ", params, "search ", search);
  console.log("searchName: ", search.name);
  return (
    <div className="flex justify-center items-center">
      <div key={search.id}>search {search.displayName}</div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const getSearch = await fetch(
    `${process.env.NEXTAUTH_URL}/api/categories/${params.displayName}`
  );
  const search = await getSearch.json();
  return {
    props: {
      params,
      search,
    },
  };
}
