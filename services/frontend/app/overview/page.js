import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import Barchart from "../components/barchart";
import Linechart from "../components/linechart";
import Piechart from "../components/piechart";

const client = new ApolloClient({
  uri: 'http://localhost:8080/query',  
  cache: new InMemoryCache(),
});

async function getUsers(gender) {
  let query = gql`
  {
    users {
      country
      dependents
      birthdate
      gender
    }
  }`;

  if (gender != null) {
    query = gql`{
      users(gender: "`+gender+`") {
        country
        dependents
        birthdate
        gender
      }
    }`
  }

  return await client.query({
    query: query
  });
}

async function buildData(users) {
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

  return {
    "dependentsData": dependentsData,
    "ageData": ageData,
    "genderData": genderData,
    "dependentsLabels": dependentsLabels,
    "ageLabels": ageLabels,
    "genderLabels": genderLabels
  };
}

let genderToFilter = null;
let dependentsData = null;
let ageData = null;
let genderData = null;
let dependentsLabels = null;
let ageLabels = null;
let genderLabels = null;
const dependentsChartId = "chart_1";
const ageChartId = "chart_2";
const genderChartId = "chart_3";

async function fetchUserData() {
  const dataSet = await buildData(await getUsers(genderToFilter));
  dependentsData = dataSet['dependentsData'];
  ageData = dataSet['ageData'];
  genderData = dataSet['genderData'];
  dependentsLabels = dataSet['dependentsLabels'];
  ageLabels = dataSet['ageLabels'];
  genderLabels = dataSet['genderLabels'];
}

export default async function Page() {
  function filterGender() {
    console.log(document.getElementById('genderFilter').value);
  }

  await fetchUserData();

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Overview</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col">
            <label className="text-stone-600 text-sm font-medium">Gender</label>

            <select defaultValue="" id="genderFilter" className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>)
            </select>
          </div>
          <Barchart chartId={dependentsChartId} title={"Dependents By Country"} labels={dependentsLabels} graphData={dependentsData} />
          <Linechart chartId={ageChartId} title={"Age Groups"} labels={ageLabels} graphData={ageData} />
          <Piechart chartId={genderChartId} title={"Genders"} labels={genderLabels} graphData={genderData} />
        </div>
      </main>
    </>
  );
}