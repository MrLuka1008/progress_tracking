import { useEffect, useState } from "react";
import axios from "axios";

function Test() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("https://momentum.redberryinternship.ge/api/priorities")
      .then((response) => {
        console.log(data);

        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Posts</h1>
    </div>
  );
}

export default Test;
