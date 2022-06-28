import { useEffect, useState } from "react";
import axios from "axios";

export default function useContactSearch(results) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: "https://randomuser.me/api/",
      params: { results: results },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        console.log(res.data.results);
        setContacts((prev) => {
          return [...new Set([...prev, ...res.data.results])];
        });
        setHasMore(res.data.results.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [results]);

  return { loading, error, contacts, hasMore };
}
