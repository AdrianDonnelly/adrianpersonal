<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { twMerge } from 'tailwind-merge'; // Assuming 'cn' is similar to twMerge or a utility for class concatenation

  // Define props using `export let`
  export let text: string;
  export let scrambleSpeed: number = 50;
  export let maxIterations: number = 10;
  export let sequential: boolean = false;
  export let revealDirection: "start" | "end" | "center" = "start";
  export let useOriginalCharsOnly: boolean = false;
  export let characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+";
  export let className: string = '';
  export let scrambledClassName: string = '';

  // Reactive declarations for state
  let displayText: string = text;
  let isHovering: boolean = false;
  let isScrambling: boolean = false;
  let revealedIndices: Set<number> = new Set();

  let interval: NodeJS.Timeout | undefined;
  let currentIteration: number = 0;

  // Helper function for class concatenation (assuming similar to your `cn`)
  function cn(...args: (string | undefined | null | false)[]): string {
    return twMerge(args.filter(Boolean).join(' '));
  }

  // Derived reactive variable for available characters
  $: availableChars = useOriginalCharsOnly
          ? Array.from(new Set(text.split(""))).filter((char) => char !== " ")
          : characters.split("");

  // Function to get the next index for sequential reveal
  function getNextIndex(): number {
    const textLength = text.length;
    switch (revealDirection) {
      case "start":
        return revealedIndices.size;
      case "end":
        return textLength - 1 - revealedIndices.size;
      case "center":
        const middle = Math.floor(textLength / 2);
        const offset = Math.floor(revealedIndices.size / 2);
        const nextIndex =
                revealedIndices.size % 2 === 0
                        ? middle + offset
                        : middle - offset - 1;

        if (
                nextIndex >= 0 &&
                nextIndex < textLength &&
                !revealedIndices.has(nextIndex)
        ) {
          return nextIndex;
        }

        for (let i = 0; i < textLength; i++) {
          if (!revealedIndices.has(i)) return i;
        }
        return 0; // Should not be reached if text has length > 0
      default:
        return revealedIndices.size;
    }
  }

  // Function to shuffle the text
  function shuffleText(inputText: string): string {
    if (useOriginalCharsOnly) {
      const positions = inputText.split("").map((char, i) => ({
        char,
        isSpace: char === " ",
        index: i,
        isRevealed: revealedIndices.has(i),
      }));

      const nonSpaceChars = positions
              .filter((p) => !p.isSpace && !p.isRevealed)
              .map((p) => p.char);

      // Shuffle remaining non-revealed, non-space characters
      for (let i = nonSpaceChars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nonSpaceChars[i], nonSpaceChars[j]] = [
          nonSpaceChars[j],
          nonSpaceChars[i],
        ];
      }

      let charIndex = 0;
      return positions
              .map((p) => {
                if (p.isSpace) return " ";
                if (p.isRevealed) return inputText[p.index];
                return nonSpaceChars[charIndex++];
              })
              .join("");
    } else {
      return inputText
              .split("")
              .map((char, i) => {
                if (char === " ") return " ";
                if (revealedIndices.has(i)) return inputText[i];
                return availableChars[
                        Math.floor(Math.random() * availableChars.length)
                        ];
              })
              .join("");
    }
  }

  // Reactive statement to handle hover logic
  $: {
    if (interval) clearInterval(interval);

    if (isHovering) {
      isScrambling = true;
      currentIteration = 0;
      interval = setInterval(() => {
        if (sequential) {
          if (revealedIndices.size < text.length) {
            const nextIndex = getNextIndex();
            // Create a new Set to trigger reactivity
            revealedIndices = new Set(revealedIndices.add(nextIndex));
            displayText = shuffleText(text);
          } else {
            clearInterval(interval);
            interval = undefined;
            isScrambling = false;
          }
        } else {
          displayText = shuffleText(text);
          currentIteration++;
          if (currentIteration >= maxIterations) {
            clearInterval(interval);
            interval = undefined;
            isScrambling = false;
            displayText = text;
          }
        }
      }, scrambleSpeed);
    } else {
      // Reset state when not hovering
      displayText = text;
      revealedIndices = new Set(); // Clear revealed indices
      isScrambling = false;
    }
  }

  // Cleanup on component destruction
  onDestroy(() => {
    if (interval) {
      clearInterval(interval);
    }
  });

  // Handle prop changes for `text`
  $: if (text !== displayText && !isHovering) {
    // If text prop changes while not hovering, update displayText
    displayText = text;
    revealedIndices = new Set();
  }
</script>

<span
        on:mouseenter={() => (isHovering = true)}
        on:mouseleave={() => (isHovering = false)}
        class={cn("inline-block whitespace-pre-wrap", className)}
        {...$$restProps}
>
  <span class="sr-only">{displayText}</span>
  <span aria-hidden="true">
    {#each displayText.split("") as char, index}
      <span
              class={cn(
          revealedIndices.has(index) || !isScrambling || !isHovering
            ? className
            : scrambledClassName
        )}
      >
        {char}
      </span>
    {/each}
  </span>
</span>