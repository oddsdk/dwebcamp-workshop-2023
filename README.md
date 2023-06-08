# Fission Causal Islands 2023 Workshop

[![Built by FISSION](https://img.shields.io/badge/⌘-Built_by_FISSION-purple.svg)](https://fission.codes) [![Built by FISSION](https://img.shields.io/badge/@oddjs/odd-v0.37.0-purple.svg)](https://github.com/oddsdk/ts-odd) [![Discord](https://img.shields.io/discord/478735028319158273.svg)](https://discord.gg/zAQBDEq) [![Discourse](https://img.shields.io/discourse/https/talk.fission.codes/topics)](https://talk.fission.codes)

Welcome to the workshop! 👋

We'll be creating a sequence explorer to search and collect sequences from the [On-line Encyclopedia of Integer Sequences (OEIS)](https://oeis.org/).

The completed workshop will include search and collection views:

![Sequences search screenshot](static//sequences/search.png)
![Sequences collection screenshot](static//sequences/collection.png)

## Preparation

Please ensure you have installed `node` and `git` on your machine before the workshop begins. We will have little time, and installing these beforehand will help the workshop run smoothly.

- Install git: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
- Install node: https://nodejs.org/en/download

If you already have `node` on your machine, check that you have `v18.0.0` or newer.

You'll also want to install a code editor on your machine. We'd recommend [VSCode](https://code.visualstudio.com/download), but any code editor will be fine.

## Running the app

Clone the ODD App Template repository:

```sh
git clone https://github.com/oddsdk/odd-app-template.git
```

The directory will be cloned into the directory where you run this command. It might be convenient to run this command from your Desktop to have the project readily available.

Install the project dependencies:

```sh
cd causal-islands-workshop-2023
npm install
```

Run the app:

```sh
npm run dev
```

Open a web browser and navigate to [localhost:5173](http://localhost:5173), and you should see the app running. Ask for help if you don't!

## Workshop exercises

Now that the app is running, we can start writing some code. 🙌

The starter code implements an OEIS search and displays matching sequences. Using the ODD SDK, we'll save sequences to the Webnative File System (WNFS). We'll also view the saved sequences on IPFS and explore content identifiers (CIDs).

All of the exercises are in two files:

- Search component: https://github.com/oddsdk/odd-app-template/blob/causal-islands-2023/src/routes/sequences/components/Search.svelte
- Collection component: https://github.com/oddsdk/odd-app-template/blob/causal-islands-2023/src/routes/sequences/components/Collection.svelte

These files are Svelte components, but you will only need to write JavaScript to complete the exercises. Each time you save a file, the web app should update without running another command.

Connect as a new user in the app and navigate to the `Sequences` page from the sidebar.

Open the Search and Collection components in your code editor:

- Search component: `src/routes/sequences/components/Search.svelte`
- Collection component: `src/routes/sequences/components/Collection.svelte`

Start with the Search component, then move on to the Collection component.

Each file has exercises marked with `TODO` and comments describing the exercise. A few additional exercises are marked `OPTIONAL ADVANCED EXERCISE`. Save these for last, and don't worry if you don't complete them! They are advanced for a reason.