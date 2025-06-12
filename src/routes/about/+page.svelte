<script lang='ts'>
    import {AspectRatio} from "$shadcn/aspect_ratio";
    import {onMount} from "svelte";
    import {CustomHead} from "$local/head";
    import {InfoCard} from "$local/infoCard";
    import * as Carousel from "$shadcn/carousel";
    import * as Card from "$shadcn/card";

    $: titleHeight = 0;
    let title: HTMLDivElement | null = null;
    let spacer: HTMLDivElement | null = null;

    function ResizeSpacer() {
        console.log("Resizing spacer", titleHeight * 0.2, !!spacer);
        const docWidth = document.documentElement.clientWidth;
        let scaler = 0.5;
        if (docWidth > 600) scaler = 0.4;
        if (docWidth > 1024) scaler = 0.4;
        if (docWidth > 1440) scaler = 0.5;
        if (spacer) spacer.style.height = `${titleHeight * scaler}px`;
    }

    const hobbies = [
        '/assets/image0.jpeg',
        '/assets/image1.jpeg',
        '/assets/image2.jpeg',
        '/assets/image5.jpeg',
        '/assets/image6.jpeg',
        '/assets/image7.jpeg',
        '/assets/image8.jpeg',
        '/assets/Hikinh.png',
        //'/assets/beer2.png',
    ];

    onMount(() => {
        const resizeObserver = new ResizeObserver(() => {
            titleHeight = title?.offsetHeight ?? 0;
            ResizeSpacer();
        });

        if (title) resizeObserver.observe(title);
        ResizeSpacer();

        return () => {
            resizeObserver.disconnect();
        };
    });
</script>
<div class='w-full flex  max-w-screen-lg justify-between items-center  h-[5rem] '>
    <h2 class='font-bold text-2xl p-2'>
        About
    </h2>
</div>
<CustomHead
        description="
    Hey, I’m Adrian, a Software Engineer based in Dublin. Currently Studying in TU Dublin (BSc Computing).
"/>

<div class='
    flex
    flex-col
    gap-4
    md:p-6
    w-full
    max-w-screen-lg
    mx-auto
    min-h-[95vh]
    relative
    justify-center
    items-center
    overflow-clip
'>
    <style>
        .gradient {
            background: linear-gradient(279deg, rgba(54, 54, 54, 0.32) 0%, rgba(0, 0, 0, 0) 100%);
        }
    </style>

    <div class="gradient w-full sm:w-[90%] relative h-min rounded-none ">
        <div class="w-full flex justify-end">
            <div class='absolute z-[50] top-[-1rem] right-[-1rem] sm:top-[-2rem] sm:right-[-1rem] w-[90%] sm:w-[70%]'>
                <AspectRatio class='bg-secondary' ratio={1.5/1}>
                    <img alt="Web Developer" class='object-cover w-full h-full border' src="/assets/splash.jpg"/>
                </AspectRatio>
            </div>
        </div>

        <div class='md:w-[50%] w-[70%] sm:w-[45%]'>
            <AspectRatio ratio={1.5/1}>
            </AspectRatio>
        </div>

        <div class="h-6 min-h-6 mt-1"></div>
        <div class='w-full flex justify-between items-center border-y'>
            <h2 class='font-bold text-2xl p-4'>
                Who am I?
            </h2>
        </div>

        <p class='text-white max-w-[95%] sm:max-w-[70%] p-4'>
            Hey, I’m Adrian, a Software Engineer based in Dublin. Currently Studying in TU Dublin (BSc Computing).
        </p>

        <div class="h-6 min-h-6 border-t"></div>
        <div class='w-full flex justify-between items-center border-y'>
            <h2 class='font-bold text-2xl p-4'>
                What do I do?
            </h2>
        </div>
        <p class='text-white max-w-[95%] sm:max-w-[70%] p-4'>
            Build Things
        </p>

        <div class="h-6 min-h-6 border-t"></div>
        <div class='w-full flex justify-between items-center border-y'>
            <h2 class='font-bold text-2xl p-4'>
                Feel free to reach out
            </h2>
        </div>

        <p class='text-white max-w-[95%] sm:max-w-[70%] p-4 '>
            If you have any questions or just want to chat, feel free to reach out to me on social media or via email.
            I’m always open to new opportunities and collaborations.
        </p>

        <div class=" flex
            flex-col
            w-full
            max-w-screen-lg
            mx-auto
        ">

            <div class="h-6 border-t min-h-6"></div>
        </div>

    </div>


<div class='flex flex-col gap-0 items-center align-middle'>
    <div class='w-full h-full flex justify-between items-center border-b'>
        <h2 class='font-bold text-2xl p-2'>
            Hobbies
        </h2>
    </div>

    <p class=' m-0 p-4 '>
        Hiking, Camping, Mountain Biking, Guitar,
        Bouldering, Motorbikes, The list goes on for a while.
    </p>

    <div class="border-t">
        <Carousel.Root class="rounded-none" opts={{ align: "start" }}>
            <Carousel.Content>
                {#each hobbies as hobby, i}
                    <Carousel.Item class="md:basis-1/2 lg:basis-1/3 p-0">
                        <Card.Root class="border-0 border-r rounded-none bg-transparent p-0">
                            <Card.Content class="flex aspect-square items-center justify-center p-0 overflow-hidden">
                                <img
                                        src={hobby}
                                        alt="Hobby {i + 1}"
                                        class="object-cover w-full h-full rounded-none"
                                />
                            </Card.Content>
                        </Card.Root>
                    </Carousel.Item>
                {/each}
            </Carousel.Content>
            <Carousel.Previous class=" left-[0.5rem] bg-background dark:bg-background/75 rounded-none h-[5rem]"/>
            <Carousel.Next class=" right-[0.5rem] g-background dark:bg-background/75 rounded-none h-[5rem]"/>
        </Carousel.Root>
    </div>
</div>

<div class='flex flex-col gap-0 w-full '>

    <div class="h-6 border-t min-h-6"></div>
    <div class='w-full h-full flex justify-between items-center border-y'>
        <h2 class='font-bold text-2xl p-2'>
            Awards and Achievements
        </h2>
    </div>

    <p class=' m-0  p-4'>
        I have been fortunate enough to receive a few awards and achievements throughout my academic career. Here are a
        few of them:
    </p>

    <div class="flex flex-col">
        {#each [
            "Attended the Mastercard intern Hackathon",
            "Started internship with Mastercard",
            "3.1 GPA @ Technological University Dublin 3rd Year",
            "Best Patient Benefit @ TUH Healthcare Hackathon 2024",
            "3.1 GPA @ Technological University Dublin 2nd Year",
            "Best Use of Technology @ TUH Healthcare Hackathon 2023",
            "3.0 GPA @ Technological University Dublin 1st Year",
            "Second Place @ TUH Healthcare Hackathon 2022"
        ] as achievement, i}
            <div class=" border-t flex h-[4rem] md:h-10 items-center">
                <p class="md:w-10 md:min-w-10 w-[4rem] min-w-[4rem] border-r flex items-center justify-center text-muted-foreground font-bold h-[4rem] md:h-10">
                    {i + 1}
                </p>
                <p class="p-2">
                    {achievement}
                </p>
            </div>
        {/each}

    </div>

</div>

<div class=" w-full h-6 border-t min-h-6"></div>
<div class='w-full h-full flex justify-between items-center border-y'>
    <h2 class='font-bold text-2xl p-2'>
        Achievements
    </h2>
</div>


<div class="w-full border-b flex h-10 items-center">
    <p class="w-10 h-10 border-r flex items-center justify-center text-muted-foreground font-bold">
        0
    </p>
    <p class="p-2 text-sm text-muted-foreground">
        Entrepreneurial
    </p>
</div>

<InfoCard
        buttonLink="/post/_Serros_ML"
        buttonText="Read about it"
        description="A programmable, event-driven AI customer support assistant. Our idea? Streamline customer service without over-relying on LLMs, which are often hit-or-miss when it comes to structured tasks."
        imgAlt="SerrosML"
        imgSrc="/assets/SerrosML.png"
        title="SerrosML"/>

<div class="w-full border-b flex h-10 items-center">
    <p class="w-10 h-10 border-r flex items-center justify-center text-muted-foreground font-bold">
        1
    </p>
    <p class="p-2 text-sm text-muted-foreground">
        Studies
    </p>
</div>
<InfoCard
        buttonLink=""
        buttonText="Soon"
        description="Completed my 3rd year of Computing with Software Development from Technological University Dublin."
        imgAlt="TU Dublin"
        imgSrc="/assets/tud.png"
        note="3.0 GPA average"
        title="Completed my 3rd year in TU Dublin"/>

<div class="w-full border-b flex h-10 items-center">
    <p class="w-10 h-10 border-r flex items-center justify-center text-muted-foreground font-bold">
        2
    </p>
    <p class="p-2 text-sm text-muted-foreground">
        Experience
    </p>
</div>

<InfoCard
        buttonLink="/post/_MC_Departure"
        buttonText="Read about it"
        description="Currently Completing a 6 month internship with Mastercard's CTMC team, working primarily in java. During my time here working with my team, it has tought me so much about software development that cant be learned in a classroom"
        imgAlt="Mastercard"
        imgSrc="/assets/mc.png"
        title="Mastercard"/>

<div class="h-6 min-h-6"></div>
</div>