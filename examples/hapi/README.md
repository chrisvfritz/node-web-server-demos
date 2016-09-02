# Hapi

## Short Opinions

- Chris: If I want a bare-bones web server for an app I might be maintaining for more than a day, Hapi makes me happy. On longer-term projects, I've also found fewer weird bugs and less need to constantly refactor.

## The Mei System

### Popularity (People-External)

> Are there a lot of other people and companies using it? Are there a lot of blog posts, videos, and books explaining it?

- It's not nearly as popular as Express, but is in very wide use in enterprise environments - including at NPM! There are unfortunately fewer open-source projects using it.
- Hapi doesn't have the same plugin ecosystem, but all the common, low-level needs seem to be met and usually, there's a single agreed-upon "best" option.
- There are example projects, blog posts, videos, and books detailing many concerns you may run into.

### Interface (Project-Internal)

> How easy is getting started? Are the docs useful? Does it take a lot of boilerplate or research to get something simple working?

- Embraces POJOs (Plain Old JavaScript Objects) for configuration, rather than chained methods. Some advantages:
  - It's much easier to modularize behavior how you want or dynamically generate/manipulate configurations (even in edge cases).
  - POJOs are very easy to validate and Hapi takes advantage of this, making it much more difficult to make configuration mistakes.
- Very feature-rich compared to Express. In Express, you need a special plugin just to be able to parse the body of a request!
- Route resolution is predictable and declarative, whereas Express plugins and other routes create nested layers of route handling for each route. This leads to a lot of complexity, especially as an application grows.

### Activity (Project-External)

> Is the project still actively maintained? Is it still being developed with an improved API or new features? Do they address issues and pull requests well?

- Created and maintained by Eran Hammer, who continues to be very active maintaining Hapi (last commit 2 days ago!) and there are actually more than a dozen others that have made regular contributions, which is a great sign for the longevity of the library.
- Despite having about as many closed issues as Express (over a much shorter period of time), it only currently has 10 open issues and all of them are well-labeled. The oldest was opened 6 months ago, but has not been forgotten, as the last message from a member of the core team was posted 10 days ago.
- There's only open open pull request, but over a thousand closed ones. The vast majority of them have been successfully negotiated and merged, rather than just closed.

### Accessibility (People-Internal)

> Do the source code and tests look good? What are the barriers to contribute?

- Comments are rare (and usually vague), there's no type system (not even JSDoc), and no linting.
- Only Node v4 and up are supported, which allows the use of many newer JS features, but not as many as if a build system were used.
- The code looks like it's organized into logical modules and variables are well-named. The same can be said for the tests.
- No code coverage is reported in the README, so it may be difficult to tell if you've accidentally broken a feature.
