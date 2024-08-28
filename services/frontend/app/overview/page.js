import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import Barchart from "../components/barchart";
import Linechart from "../components/linechart";
import Piechart from "../components/piechart";

const client = new ApolloClient({
  uri: 'http://localhost:8080/query',  
  cache: new InMemoryCache()
});

export default async function Page() {
  const users = await client.query({
    query: gql`
      {
        users {
          country
          dependents
          birthdate
          gender
        }
      }`
  });

  let dependentsData = [];
  let ageData = Array(4).fill(0);
  let genderData = Array(2).fill(0);

  let dependentsLabels = [];
  users.data.users.map((user) => {
    /** dependents by country graph */
    if (!dependentsData.hasOwnProperty(user.country)) {
      dependentsData[user.country] = 0;
      dependentsLabels.push(user.country);
    }
    dependentsData.push(user.dependents);

    /** age distribution graph */
    const today = new Date();
    const birthDate = new Date(user.birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age <= 16) {
      ageData[0] += 1;
    } else if (age > 16 && age <= 30) {
      ageData[1] += 1;
    } else if (age > 30 && age <= 45) {
      ageData[2] += 1;
    } else if (age > 45) {
      ageData[3] += 1;
    }

    switch (user.gender) {
      case 'Male':
        genderData[0] += 1;
        break;

      case 'Female':
        genderData[1] += 1;
        break;
    }
  });

  dependentsData = [{
    label: 'Dependents',
    data: dependentsData,
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

  const ageLabels = ['0-16', '17-30', '31-45', 'Above 45'];
  ageData = [{
    label: 'Users',
    data: ageData,
    borderColor: 'rgb(255, 205, 86)',
  }];

  const genderLabels = ['Male', 'Female'];
  genderData = [{
    label: 'Genders',
    data: genderData,
    backgroundColor: ['rgb(255, 99, 132)', 'rgb(75, 192, 192)']
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
          <Barchart chartId={"chart_".concat(Date.now() + Math.random())} title={"Dependents By Country"} labels={dependentsLabels} graphData={dependentsData} />
          <Linechart chartId={"chart_".concat(Date.now() + Math.random())} title={"Age Groups"} labels={ageLabels} graphData={ageData} />
          <Piechart chartId={"chart_".concat(Date.now() + Math.random())} title={"Genders"} labels={genderLabels} graphData={genderData} />
        </div>
      </main>
    </>
  );
}