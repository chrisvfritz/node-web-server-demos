# Hapi

## Short Opinions

- Chris: If I want a bare-bones web server for an app I might be maintaining for more than a day, Hapi makes me happy. On longer-term projects, I've also found fewer weird bugs and less need to constantly refactor.

## Advantages

- Embraces POJOs (Plain Old JavaScript Objects) for configuration, rather than chained methods. Some advantages:
  - It's much easier to modularize behavior (it's as easy as extending an object) or dynamically generate/manipulate configurations, such as HTTP methods, authentication, and request handling in general.
  - POJOs are very easy to validate and Hapi takes advantage of this, making it much more difficult to make mistakes.
- Very feature-rich compared to Express. In Express, you need a special plugin just to be able to parse the body of a request!
- Route resolution is predictable and declarative, whereas Express plugins and other routes create nested layers of route handling for each route. This leads to a lot of complexity, especially in more mature apps.
