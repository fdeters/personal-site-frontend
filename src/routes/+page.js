/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const response = await fetch(
    "https://personal-site-e7709-default-rtdb.firebaseio.com/topics.json"
  );
  const data = await response.json();

  // transform links to array
  for (const topic in data) {
    if (data.hasOwnProperty(topic)) {
      if (data[topic].hasOwnProperty("links")) {
        const links = data[topic].links;
        data[topic].links = Object.keys(links).map((linkId) => {
          return {
            id: linkId,
            ...links[linkId],
          };
        });
      }
    }
  }

  return data;
}
