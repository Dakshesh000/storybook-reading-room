# Download pack of every image on the site

## What you get
One ZIP file in Files called `konsol-images.zip`. Inside it, the images are sorted into folders by where they appear, and an index sheet lists each one.

```text
konsol-images/
  index.csv            name, folder, where it appears on the site, size
  homepage/            the 22 homepage photos and illustrations (hero figure, service illustrations in black-and-white and colour, client photos, avatars, etc.)
  agents/              the 4 robot agent portraits (Atlas, Nova, Sage, Echo)
  logos/               the 4 original Konsol logo files
  favicon/             the browser tab icon
```

The archived light version uses the same files as the homepage, so it gets no separate copies. The index notes "also used in archived light version" where that applies.

## Technical details
- Download each homepage image from its hosted address (the `.asset.json` pointers in `src/showcase/homepage/assets/`) into staging under `/tmp`.
- Copy the agent photos, logos and `public/favicon.png` from the project.
- Search the homepage code for each image name to fill in the "where it appears" column. Mark any image that's in the project but no longer shown on the page (for example, the glass towers and team dashboard photos) as "not currently shown".
- List the staging folder to check it, build the ZIP in `/tmp`, check what's inside, then copy it to `/mnt/documents`.
- No changes to the app.
