<script>
    import AvatarImage from "../lib/components/AvatarImage.svelte";
    import TopicCard from "../lib/components/TopicCard.svelte";
    import BodyLink from "../lib/components/BodyLink.svelte";
    import HeadshotImage from "../lib/assets/images/tokyo-drama.jpg";

    /** @type {import('./$types').PageData} */
    export let data;
</script>

<svelte:head>
    <title>Forrest Deters</title>
</svelte:head>

<div
    class="min-h-screen bg-gray-100 p-4 text-base text-gray-800
    lg:bg-[url($lib/assets/images/dice-bg-1.png),_url($lib/assets/images/dice-bg-2.png)]"
>
    <div class="mx-auto">
        <header class="mx-auto mb-6 max-w-md text-center">
            <div class="mb-4 flex flex-col items-center gap-2 pt-2">
                <AvatarImage
                    src={HeadshotImage}
                    alt="A headshot of Forrest standing in front of a temple in Tokyo. Dramatic lighting bathes one side of his face in even white light. He's wearing a plain black t-shirt. It's a little self-serious."
                />
                <a href="/">
                    <h1
                        class="border-b-2 border-gray-300 px-1 text-2xl font-medium"
                    >
                        Forrest Deters
                    </h1>
                </a>
            </div>
            <p>
                I'm a web developer and vocal musician living in Portland,
                Oregon. Welcome to my site!
            </p>
        </header>
        <main
            class="mx-auto flex max-w-md flex-col gap-4
            lg:grid lg:max-w-3xl lg:grid-cols-2"
        >
            <TopicCard title="Web Development" links={data.webdev.links}>
                <p>
                    I spend my weekdays making web applications with the dev
                    team at <BodyLink
                        href="https://oregonmetro.gov"
                        target="_blank"
                    >
                        Metro
                    </BodyLink> , Portland's regional government.
                </p>
            </TopicCard>
            <TopicCard title="Music" links={data.music.links}>
                <p>
                    These days, I perform and arrange vocal music for fun and
                    semi-professionally.
                </p>
            </TopicCard>
        </main>
    </div>
    <footer />
    <!-- <a target="_blank" href="https://icons8.com/icon/741/external-link">External Link</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> -->
</div>
