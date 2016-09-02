# Hapi

##

- Embraces POJOs (Plain Old JavaScript Objects) for configuration, rather than chained methods. Some advantages:
  - It's much easier to modularize behavior (it's as easy as extending an object) or dynamically generate/manipulate configurations, such as HTTP methods, authentication, and request handling in general.
  - POJOs are very easy to validate and Hapi takes advantage of this.
- Route resolution is more predictable and declarative than Express.
