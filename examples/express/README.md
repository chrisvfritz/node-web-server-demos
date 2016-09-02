# Express

## Short Opinions

- Chris: If I'm building a quick utility web server that will always have an extremely limited scope, for example in a build process, I'll usually go for Express. It's also sometimes helpful when a large number of different developers might have to make small changes to the code, since Express is kind of the lowest common denominator of Node web servers.

## The Mei System

### Popularity (People-External)

> Are there a lot of other people and companies using it? Are there a lot of blog posts, videos, and books explaining it?

- More developers are probably familiar with Express than with any other Node web server, so it should be relatively easy to find devs who have worked with it.
- You're unlikely to get fired for picking Express and you won't have to explain your decision to friends at a meetup.
- There's a huge plugin ecosystem, but you also need plugins to do pretty much anything. This means a lot of research is required to develop new features, because there's probably more than one plugin that claims to do what you want.
- There are a lot of examples and tutorials out there, but most of them are out-of-date and the API has gone through a fair number of changes in its lifetime.

### Interface (Project-Internal)

> How easy is getting started? Are the docs useful? Does it take a lot of boilerplate or research to get something simple working?

- The main ideas behind Express are pretty simple and many of them are reused. For example, routes, middleware, and route handling all have essentially the same interface. These simple ideas make it easy to get started building simple apps quickly.
- It's made a bit less beginner-friendly by the library and its community being very keen on keeping variable names down to as few characters as possible. This means references to `req`, `res`, `cb`, etc (instead of `request`, `response`, and `callback`) are common.
- The Getting Started page is alright, but there are definitely better introductions developed by the community.
- The API docs are quite thorough, but they're all on a single page and there's no search, so you'll have to use the right-hand menu or Ctrl/Cmd+F to navigate them.

### Activity (Project-External)

> Is the project still actively maintained? Is it still being developed with an improved API or new features? Do they address issues and pull requests well?

- The creator of Express has abandoned it, but it's ben taken over by StrongLoop and they continue to maintain and develop it.
- The last commit on the master branch was more than a month ago, which may just be a sign that the project has matured and doesn't need much work - except the abundance of open issues show this isn't true. Once StrongLoop took over, there was a brief flurry of activity from Doug Wilson, the new primary maintainer, but this activity has slowed down significantly over the past year and a half, sometimes going several months with no activity at all - not even from accepted PRs. In fact, no PRs have been accepted at all in 2016.
- There are 87 open issues currently, with some from over 2 years ago, but most don't seem to have been forgotten. Only 4 of those issues are confirmed bugs, but one of those bugs _is_ from over 2 years ago.
- There are 38 open PRs, some from over a year ago with no response, but most of them seem well-categorized. Of the closed PRs, very few of them are actually merged. This may simply be a result of the audience of the library though, since many PRs seem to result from a misunderstanding in how to use the library.

### Accessibility (People-Internal)

> Do the source code and tests look good? What are the barriers to contribute?

- The source uses no apparent linting, making contributing without having to think about style difficult.
- The source also includes no type system, which can be very helpful on library projects with a lot of contributors.
- Even the latest version of Express supports Node down to v0.10. Since there's no build system in use, `'use strict'` has to be included in every file and contributors have to be very careful not to use "newer" JS features.
- Functions are throughly documented with JSDoc, which makes up slightly for the lack of a type system - but in 2016, why not just have your type declarations actually _do_ something?
- It includes 100% type coverage and the tests seem relatively easy to read.
