import { useState, useEffect } from 'react';
import axios from 'axios';

const useCountry = name => {
  const [data, setData] = useState(null);
  const [found, setFound] = useState(false);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(res => {
        setData(res.data);
        setFound(true);
      })
      .catch(err => {
        setFound(false);
        console.log(err?.response);
      });
  }, [name]);

  return { data, found };
};

export default useCountry;
