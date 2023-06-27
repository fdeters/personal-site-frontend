<script>
    import Avatar from "../lib/components/Avatar.svelte";
    import TopicCard from "../lib/components/TopicCard.svelte";
    import HeadshotImage from "../lib/assets/images/tokyo-drama.jpg";
</script>

<div class="min-h-screen p-4 text-gray-800">
    <header class="mb-6 text-center">
        <div class="mb-4 flex flex-col items-center gap-2 pt-2">
            <Avatar
                src={HeadshotImage}
                alt="A headshot of Forrest standing in front of a temple in Tokyo. Dramatic lighting bathes one side of his face in even white light. He's wearing a plain black t-shirt. It's a little self-serious."
            />
            <h1 class="text-2xl">Forrest Deters</h1>
        </div>
        <p>
            I'm a web developer and vocal musician living in Portland, Oregon.
            Welcome to my site!
        </p>
    </header>
    <main class="flex flex-col gap-4">
        <TopicCard title="Web Development">
            <p>
                I spend my weekdays making web applications with the dev team at <a
                    class="text-blue-500 underline"
                    href="https://oregonmetro.gov"
                    target="_blank">Metro</a
                >, Portland's regional government.
            </p>
        </TopicCard>
        <TopicCard title="Music">
            <p>
                I perform and arrange vocal music for fun and
                semi-professionally.
            </p>
        </TopicCard>
    </main>
    <footer />
</div>
