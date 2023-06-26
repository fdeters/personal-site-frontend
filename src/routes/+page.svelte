<script>
    import Avatar from "../lib/components/avatar.svelte";
    import HeadshotImage from "../lib/assets/images/tokyo-drama.jpg"
</script>

<div class="min-h-screen p-4 text-gray-800">
    <header class="mb-6 text-center">
        <div class="flex flex-col gap-2 items-center mb-4 pt-2">
            <Avatar src={HeadshotImage} alt="A headshot of Forrest standing in front of a temple in Tokyo. Dramatic lighting bathes one side of his face in even white light. He's wearing a plain black t-shirt. It's a little self-serious." />
            <h1 class="text-2xl">Forrest Deters</h1>
        </div>
        <p>I'm a web developer and vocal musician living in Portland, Oregon. Welcome to my site!</p>
    </header>
    <main class="flex flex-col gap-4">
        <section>
            <h2 class="text-xl mb-1">Web Development</h2>
            <p>I spend my weekdays making web applications with the dev team at <a class="text-blue-500 underline" href="https://oregonmetro.gov" target="_blank">Metro</a>, Portland's regional government.</p>
        </section>
        <section>
            <h2 class="text-xl mb-1">Music</h2>
            <p>I perform and arrange vocal music for fun and semi-professionally.</p>
        </section>
    </main>
    <footer>

    </footer>
</div>