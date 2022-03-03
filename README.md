## Repository navigation

`./src` path is entry point for whole project. There're some subfolders in it. Catalog structure based on atomic design. Rules:

1. `./src/atoms` - basic elements like Cards or Buttons. Prefer to not contain any logic. Only provide styles and callbacks.
2. `./src/molecules` - components based on atoms and UI kit components. A bit of logic is ok.
3. `./src/routes` - replace for atomic design's `pages`. Used for react-router to render current pages based on other components in system. Prefer to not write own styles for pages.
4. `./src/utils` - **one file - one entity**. Helpers and program abstractions. Not connected to react infrastructure directly.
5. `./src/hooks` - react entities that helps to connect utils to react infrastructure.
