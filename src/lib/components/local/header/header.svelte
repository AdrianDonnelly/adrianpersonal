<script>
    import {Separator} from "$shadcn/separator";
    import * as NavigationMenu from "$shadcn/navigation-menu";
    import {Bike, CircleCheckIcon, CircleHelpIcon, CircleIcon, Guitar, MountainSnow} from "lucide-svelte";

</script>

<svelte:head>
    <title>Adrian Donnelly</title>
</svelte:head>

<nav class="flex flex-col w-full mx-auto -x">
    <div class="text-white mt-4 ml-6 mr-6">
        <h1 class="scroll-m-20 text-2xl font-extrabold tracking-tight w-full">
            <a href="/">Adrian Donnelly</a>
        </h1>


        <Separator class="my-4"/>
        <div class="flex flex-wrap items-center justify-between mr-5">
            <div class="flex flex-row gap-3 text-muted-foreground mb-3">
                <h1 class="scroll-m-20 text-l font-semibold tracking-tight hover:text-white duration-200"><a
                        href="https://www.linkedin.com/in/adrdonnelly/">LinkedIn</a></h1>
                <Separator orientation="vertical"/>

                <h1 class="scroll-m-20 text-l font-semibold tracking-tight hover:text-white duration-200"><a
                        href="mailto:adrian.donnelly15@outlook.com">Email</a></h1>
                <Separator orientation="vertical"/>

                <h1 class="scroll-m-20 text-l font-semibold tracking-tight hover:text-white duration-200"><a
                        href="https://github.com/AdrianDonnelly">Github</a></h1>
            </div>
            <div class="flex flex-row flex-wrap items-center justify-between gap-3 text-muted-foreground mb-3">
                <h1 class="scroll-m-20 text-l font-semibold tracking-tight hover:text-white duration-200"><a
                        href="/blog">Blog</a></h1>
                <Separator orientation="vertical"/>
                <h1 class="scroll-m-20 text-l font-semibold tracking-tight hover:text-white duration-200"><a
                        href="/about">About</a></h1>
                <Separator orientation="vertical"/>
                <h1 class="scroll-m-20 text-l font-semibold tracking-tight hover:text-white duration-200"><a
                        href="/cv">CV</a></h1>
                <Separator orientation="vertical"/>

                <NavigationMenu.Root>
                    <NavigationMenu.List>
                        <NavigationMenu.Item>
                            <NavigationMenu.Trigger><h1 class="scroll-m-20 text-l font-semibold tracking-tight hover:text-white duration-200">Hobbies</h1></NavigationMenu.Trigger>

                            <NavigationMenu.Content>
                                <ul class="grid w-l gap-4 p-2">
                                    <li>
                                        <NavigationMenu.Link href="/hiking" class="flex-row items-center gap-2">
                                            <MountainSnow />
                                            Hiking
                                        </NavigationMenu.Link>

                                        <NavigationMenu.Link href="/motorbikes" class="flex-row items-center gap-2">
                                            <Bike />
                                            Motorbikes
                                        </NavigationMenu.Link>

                                        <NavigationMenu.Link href="/music" class="flex-row items-center gap-2">
                                            <Guitar />
                                            Music
                                        </NavigationMenu.Link>
                                    </li>
                                </ul>
                            </NavigationMenu.Content>
                        </NavigationMenu.Item>
                    </NavigationMenu.List>
                </NavigationMenu.Root>
            </div>
    </div>
    </div>
</nav>