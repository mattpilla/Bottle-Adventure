# Import script
> Naive way of populating data from https://docs.google.com/spreadsheets/d/1YCOfw-yvR6xpUF8O5zEKxt7HOQNVHN8uteJGpWvdqns/edit#gid=0

## Dependencies
[Node](https://nodejs.org/en/)

## Running
1) Download each sheet as a .csv, with the filenames `BA Docs - J.csv` and `BA Docs - U.csv` (should be the default export name when you do this) and place them in this folder
2) `npm ci` to install dependencies, then `node seed` to run (or just `npm start` to do both at once)

## Output
This overwrites `data.js` in the root directory.\
That's kinda it, nothing really crazy about it.
