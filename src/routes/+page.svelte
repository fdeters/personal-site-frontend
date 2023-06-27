<script>
    import Avatar from "../lib/components/Avatar.svelte";
    import TopicCard from "../lib/components/TopicCard.svelte";
    import BodyLink from "../lib/components/BodyLink.svelte";
    import HeadshotImage from "../lib/assets/images/tokyo-drama.jpg";

    const webDevLinks = [
        { text: "GitHub", url: "https://github.com/fdeters" },
        // { text: "", url: "" },
    ];
    const musicLinks = [
        { text: "a cappella EP", url: "https://open.spotify.com/album/3IlRy2ECCIpTmS4LeEMEgR?si=2k2euYzHQsmjIzJgH2qb6w" },
        { text: "sheet music store", url: "https://www.sheetmusicplus.com/publishers/forrest-deters-sheet-music/3013113?narrow_by=forrest+deters" },
        { text: "SoundCloud", url: "https://soundcloud.com/fdetemusic" },
        // { text: "", url: "" },
    ];
</script>

<div class="min-h-screen p-4 text-gray-800 bg-gray-100 text-base">
    <header class="mb-6 text-center">
        <div class="mb-4 flex flex-col items-center gap-2 pt-2">
            <Avatar
                src={HeadshotImage}
                alt="A headshot of Forrest standing in front of a temple in Tokyo. Dramatic lighting bathes one side of his face in even white light. He's wearing a plain black t-shirt. It's a little self-serious."
            />
            <h1 class="text-2xl border-b-2 border-gray-300 font-medium">Forrest Deters</h1>
        </div>
        <p>
            I'm a web developer and vocal musician living in Portland, Oregon.
            Welcome to my site!
        </p>
    </header>
    <main class="flex flex-col gap-4">
        <TopicCard title="Web Development" links={webDevLinks}>
            <p>
                I spend my weekdays making web applications with the dev team at <BodyLink
                    href="https://oregonmetro.gov"
                    target="_blank">Metro</BodyLink
                >, Portland's regional government.
            </p>
        </TopicCard>
        <TopicCard title="Music" links={musicLinks}>
            <p>
                I perform and arrange vocal music for fun and
                semi-professionally.
            </p>
        </TopicCard>
    </main>
    <footer />
</div>
