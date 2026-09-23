# Save State Lyrics

A lyrics publishing site for Save State Records.

**Live:** https://lyr.savestate.fm

Save State Lyrics exists to give artists on Save State Records a place to publish lyrics while the label's larger website is still being developed.

The project is deliberately focused on lyrics rather than trying to serve as a temporary version of the entire label website. Its main requirement is preserving how each artist wants their lyrics presented, including formatting and per-line styling that would be awkward to represent in a conventional CMS.

## Content structure

Lyrics are stored as typed source files rather than in a database or general-purpose CMS.

Content is organized hierarchically:

1. Each lyric is represented by its own `.ts` file.
2. Lyrics belong to a release.
3. Release files define the release and reference its lyrics.
4. Artist files define the artist and reference their releases.
5. The application uses that structure to construct the published catalog.

This keeps the content model close to the structure of the label itself:

`Artist → Release → Lyrics`

## Why source files?

The site needs to preserve more than the text of a song.

Individual lines may require their own presentation, including specific RGB colors and other formatting chosen for the work. Keeping lyrics as structured TypeScript data makes those presentation details explicit and version-controlled alongside the application.

For the current size of the catalog, this also avoids introducing a CMS or database where neither is necessary.

## Goals

- Publish official lyrics for Save State Records releases.
- Preserve artist-specific formatting and presentation.
- Keep lyric content structured and version-controlled.
- Make adding artists, releases, and songs predictable.
- Provide a dedicated lyrics site while the larger Save State Records website is under development.

## Status

Save State Lyrics is live and in use at:

https://lyr.savestate.fm

New artists, releases, and lyrics can be added through the existing content structure as the label catalog grows.

## AI assistance

Claude wrote css bc i'm garbage at css
ChatGPT wrote this readme bc i'm garbage at readmes
i did the rest
