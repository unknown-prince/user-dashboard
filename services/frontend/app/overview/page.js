import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import Barchart from "../components/barchart";

const client = new ApolloClient({
  uri: 'http://localhost:8080/query',  
  cache: new InMemoryCache()
});

export default async function CardBarChart() {
  const users = await client.query({
    query: gql`
      {
        users {
          country
          dependents
        }
      }`
  });

  let data = [];
  let labels = [];
  users.data.users.map((user) => {
    if (!data.hasOwnProperty(user.country)) {
      data[user.country] = 0;
      labels.push(user.country);
    }
    data.push(user.dependents);
  });

  const barData = [{
    label: 'Dependents',
    data: data,
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)'
    ],
    borderWidth: 1
  }];

  return (
    <>
      <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Overview</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Barchart title={"Dependents By Country"} labels={labels} barData={barData} />
          </div>
        </main>
    </>
  );
}