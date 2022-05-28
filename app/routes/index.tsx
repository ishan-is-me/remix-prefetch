import { LoaderFunction } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import Layout from '~/components/layout';

export interface Characters {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: Date;
}

interface Location {
  name: string;
  url: string;
}

export const loader: LoaderFunction = async () => {
  const fetchData = await fetch('https://rickandmortyapi.com/api/character/');
  const response = await fetchData.json();
  const data = response.results;
  return data;
};

export default function Index() {
  const dataList = useLoaderData();
  return (
    <Layout>
      <div>
        {dataList.map((character: Characters) => (
          <div key={character.id} style={{ marginBottom: '30px' }}>
            <Link
              style={{ textDecoration: 'none' }}
              to={character.id.toString()}
            >
              <h3> {character.name}</h3>
              <br />
              <img src={character.image} alt={character.name} />
              <ul>
                <li>{character.status}</li>
                <li>{character.species}</li>
                <li>{character.gender}</li>
              </ul>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
}
