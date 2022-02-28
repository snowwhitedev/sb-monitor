import { useState } from 'react';
import { stakingClient } from './apollo/client';
import { STAKE_POISITION, PAGE_ITEMS } from './apollo/queries';
import './App.css';

function App() {
  const [fetching, setFetching] = useState({
    0: false,
    1: false,
    2: false
  })
  const FILE_NAMES = {
    0: 'standard.json',
    1: 'premium.json',
    2: 'vip.json'
  };

  const downloadJSON = (jsonData, filename) => {
    const a = document.createElement("a");
    const file = new Blob([JSON.stringify(jsonData)], { type: "text/plain" });
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
  }

  const genernateStakersData = async (pool) => {
    let skip = 0
    let allResults = []
    let found = false
    const currentFetching = { ...fetching };
    currentFetching[pool] = true;

    setFetching({ ...currentFetching });
    try {
      let result = await stakingClient.query({
        query: STAKE_POISITION,
        variables: {
          skip: 0,
          pool: pool
        },
        fetchPolicy: 'cache-first'
      });

      allResults = [...allResults, ...result.data.stakePositions]
      if (result.data.stakePositions.length < PAGE_ITEMS) {
        found = true;
      } else {
        skip += PAGE_ITEMS;
      }
    } catch (e) {
      console.log('error ==>', e);
    }

    downloadJSON(allResults, FILE_NAMES[pool]);
    currentFetching[pool] = false;
    setFetching({ ...currentFetching });
  }

  return (
    <div className="App">
      <button onClick={() => genernateStakersData(2)}>{fetching[2] === true ? 'Wait...' : 'VIP'}{fetching['0']}</button>
      <button onClick={() => genernateStakersData(1)}>{fetching[1] === true ? 'Wait...' : 'Premium'}</button>
      <button onClick={() => genernateStakersData(0)}>{fetching[0] === true ? 'Wait...' : 'Standard'}</button>
    </div>
  );
}

export default App;
