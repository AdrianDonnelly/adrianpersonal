<script>
    import "../app.css";
    import { Footer } from "$local/footer";
    import { Header } from "$local/header";
    import { ModeWatcher } from "mode-watcher";

    let { children } = $props();
</script>

<ModeWatcher
        defaultMode={"dark"}
        themeColors={{ dark: "black", light: "white" }}/>

<Header/>

{@render children()}

<Footer/>