import { useState } from 'react';
import axios from 'axios';

const useResource = baseUrl => {
  const [resources, setResources] = useState([]);

  const create = resource => {
    axios
      .post(baseUrl, resource)
      .then(res => {
        setResources(resources.concat(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getAll = () => {
    axios
      .get(baseUrl)
      .then(res => {
        setResources(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const update = resource => {
    axios
      .put(`${baseUrl}/${resource.id}`, resource)
      .then(res => {
        setResources(
          resources.map(r => {
            if (r.id === res.data.id) {
              return res.data;
            } else {
              return r;
            }
          })
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  const service = {
    getAll,
    create,
    update,
  };

  return [resources, service];
};

export default useResource;
