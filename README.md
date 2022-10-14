plans for a reusable css framework solution

modularity at its core. anyone can write a plugin for it.

plugins fit together easily

plugins describe their own interface that can be rendered via a command line tool

it all sounds a bit like MaxMSP for design systems

but i want something i can solve for in the near-term that isn't an over-investment like my friends slang and tonami and god forbid, dizzy
love you boys

what do i want to come out of it is a sincere question

like, literally

the easy answer is 1 css file that can then be imported left or right

so we've got a css file generator [check]

i guess it would be inclined to generate that css file according to an algorithm of sorts

we can make that happen

now in order to build something that doesn't waste my time, i would think building, small, discrete pieces will give me the most opportunity to reuse the system as a whole
we can call these pieces "plugins"

plugins need to be able to

- describe some css to add to the file
- declare their syntax
- put information onto the global scope so that other plugins can use it
  - this would be things like colors, fonts, etc / might be worth following styled-system for this

things i don't want: people to have to download hella plugins

EXAMPLES OF PLUGINS

- a plugin that adds a CSS reset :check:
- a plugin that adds some utility classes for a specific purpose like grid layouts
- a plugin that adds reusable component classes
- a plugin that adds some kitchen sink classes
- a plugin that processes an image and converts it into a color palette
- a plugin that takes the color palette and type sizes and info and produces buttons for the site
- a plugin that takes the button classes you've created and applies them to, some other element

EXAMPLES OF THEIR INTERRELATIONSHIP

- the system should make sure that plugin generated CSS doesn't clash as much as possible

## how is this process really going to be easier for you...

because I can add things incrementally as I develop a site, and not be locked in to any single framework or decision. I can choose which utilities I want to use.

# General thinking

styles are either a utility, element-irrelevant, or require a shape of elements. that's not true. really styles don't make any assumptions or care about the elements they're applied to. they just do their thing.

the goal is really all about the incremental development of a site...
adding styling complexity as its needed.

# On a very specific level – what are the interactions that I am looking to have with this tool?

1. npx my-tool init
   // asks me if there is a pipeline I want to start with,
   // or I could pass a link to a remote file containing a pipeline I want to start with, like a template

then init will generate my .css file
I import it into my project
et voila

maybe my starter began with a styled-system plugin that puts styled system onto the context
and a water.css transform plugin that creates a version of water.css based on my styled system
maybe a scratch file ontop of that with a supreme cascade layer for doing what i want with what

> bada bing bada boom, i develop the first version of my site

2. At some point water.css layouts aren't cutting it so I add a layout utilities plugin that uses my styled system tokens and gives me a lot of good utility classes to build layouts with

3. Eventually I need real form stuff and lovely buttons, so I add a form plugin that looks friendly and has a lot of variants

4. Later I decide to use ariakit so I add a plugin which uses my styled system tokens to style ariakit components

## Loader

I think part of the success of this may leverage a loader of somekind which can rely on ESModules for a simple compilation. I can imagine how that could be built with a proxy server that loads github gists and reflects them with the right ESM heading. But that's not what needs to be built first or what I should optimize for.

I'm optimizing for the DX of writing a plugin and combining them into a pipeline.
Also the DX of writing styles or something that compiles to styles.

What does that DX look like?
Some kind of config file? probably in JS
like style.config.js

## JS in CSS

This is anotehr component of this whole procedure than I think has some potential. No one wants to write css-in-js because it absolutely sucks. What if we could write css but use comments to add minimal logic like lookup and looping. Could be nice.
