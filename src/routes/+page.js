import topicsExport from '#lib/data/topics.json';

/** @type {import('./$types').PageLoad} */
export function load() {
  return Object.fromEntries(
    Object.entries(topicsExport.topics).map(([topicId, topic]) => [
      topicId,
      {
        ...topic,
        links: Object.entries(topic.links).map(([id, link]) => ({
          id,
          ...link,
        })),
      },
    ])
  );
}
