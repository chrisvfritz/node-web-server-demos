# Restify

## Short Opinions

- Erik: Restify focuses on "strict" API development so there aren't many frills. It will be helpful to know or learn HTTP verbs, status codes, headers, and a different set of tools to interact with your API, though. If you're building an API that anyone in the world can integrate with (or management say micro-service APIs are how all future system integration should happen), then Restify is worth a look.

## The Mei System

### Popularity (People-External)

> Are there a lot of other people and companies using it? Are there a lot of blog posts, videos, and books explaining it?

- Restify has a lot of support from major Node developers including Joyent and the inventor of NPM.
- Netflix is probably Restify's single largest corporate user, contributor, and proponent. Reason: performance analysis. It looks like Disney, Google, and other companies also use and contribute to Restify, but to a much smaller extent as Netflix.
- Restify has a couple hundred watchers on GitHub and over 5k stars (compared to Express' 1.5k watchers and 27k stars).

### Interface (Project-Internal)

> How easy is getting started? Are the docs useful? Does it take a lot of boilerplate or research to get something simple working?

- Restify is very minimalist, including the documentation. Don't get me wrong, the examples and descriptions are good, but there are only 16 topics to cover!
- It doesn't take much to get a basic API going, provided you know which HTTP verbs, status codes, and headers you'll be using. There aren't even constants for a lot of that stuff.
- That being said, open Restify's one page of documentation and Wikipedia pages listing status codes and common headers and you're golden!

### Activity (Project-External)

> Is the project still actively maintained? Is it still being developed with an improved API or new features? Do they address issues and pull requests well?

- The creator of Restify continues to be the main contributor, but there are many other active contributors from mostly other companies and organizations.
- Contributions (commits) have remained pretty steady since the project's birth, even recently.
- There don't appear to be any radical or game-changing overhauls or features underway. This is likely due to Restify's minimalist approach and 5.0 being in a hardening phase. 

### Accessibility (People-Internal)

> Do the source code and tests look good? What are the barriers to contribute?

- There are a lot of unit tests (95% code coverage) and lots of regression tests.
- ESLint (and JSCS) is used to ensure all the JS is nice and tidy, regardless of who writes it.
- There are lots of people who have contributed a very small number of times (more than once, less than five times) which may indicate that outside contributors are welcome.
- JSDoc is heavily used and the descriptions of functions are great, but the descriptions of parameters and return values seemed a bit lacking.
