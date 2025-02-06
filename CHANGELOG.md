# Changelog

## [0.5.2](https://github.com/khancerberus/creator-awards-reforged/compare/v0.5.1...v0.5.2) (2025-02-06)


### Bug Fixes

* add Redis URL configuration and update Redis client initialization ([4c70728](https://github.com/khancerberus/creator-awards-reforged/commit/4c707285c499cc9784ca89be10cf47ced9900ea5))

## [0.5.1](https://github.com/khancerberus/creator-awards-reforged/compare/v0.5.0...v0.5.1) (2025-02-06)


### Bug Fixes

* add container names for Redis, API, and Client services in docker-compose ([154e9c2](https://github.com/khancerberus/creator-awards-reforged/commit/154e9c23880a75416b24c5351e91ce783e7ab01b))

## [0.5.0](https://github.com/khancerberus/creator-awards-reforged/compare/v0.4.0...v0.5.0) (2025-02-06)


### Features

* add canvas-confetti for ticket saving celebration and enhance TicketPage layout ([19757e9](https://github.com/khancerberus/creator-awards-reforged/commit/19757e95ab8f2b2eeed7e3dd93a125938bdeeb89))
* update user display in Navigator with profile image ([8ceab2e](https://github.com/khancerberus/creator-awards-reforged/commit/8ceab2e67ce7ee6fee607d529ef187ef0509981b))


### Bug Fixes

* improve formatting and adjust animation properties in TicketPage component ([1c74dc1](https://github.com/khancerberus/creator-awards-reforged/commit/1c74dc113cf51ae7133c3ce65cc3ad0f61b1e6c0))
* update image paths in CSS files for correct loading ([70b4808](https://github.com/khancerberus/creator-awards-reforged/commit/70b480821778a0af2e7365d3ebffde66a841d279))

## [0.4.0](https://github.com/khancerberus/creator-awards-reforged/compare/v0.3.0...v0.4.0) (2025-02-05)


### Features

* integrate motion library for enhanced animations in Countdown and Ticket pages ([f84bc88](https://github.com/khancerberus/creator-awards-reforged/commit/f84bc88d19d80abe36880da22ffbe653bd296fa0))


### Bug Fixes

* enhance authentication flow with error handling and messaging ([ad503d8](https://github.com/khancerberus/creator-awards-reforged/commit/ad503d87924cf49428ae41906514c795c0576528))

## [0.3.0](https://github.com/khancerberus/creator-awards-reforged/compare/v0.2.4...v0.3.0) (2025-02-04)


### Features

* add tickets semifinal version ([1ed7836](https://github.com/khancerberus/creator-awards-reforged/commit/1ed7836a6d154800440900e33e9b464bc468d55a))
* implements new auth system ([1ed7836](https://github.com/khancerberus/creator-awards-reforged/commit/1ed7836a6d154800440900e33e9b464bc468d55a))

## [0.2.4](https://github.com/khancerberus/creator-awards-reforged/compare/v0.2.3...v0.2.4) (2025-01-29)


### Bug Fixes

* add restart policy to services in docker-compose ([e075e2d](https://github.com/khancerberus/creator-awards-reforged/commit/e075e2d2443a587ef41297d343eac7fa2fe100d5))
* update event timestamp for accuracy ([3cf2438](https://github.com/khancerberus/creator-awards-reforged/commit/3cf2438c35d2d5ccfb1e502929efdf378271121b))

## [0.2.3](https://github.com/khancerberus/creator-awards-reforged/compare/v0.2.2...v0.2.3) (2025-01-29)


### Bug Fixes

* update Open Graph meta tags for Creator Awards event ([164fa17](https://github.com/khancerberus/creator-awards-reforged/commit/164fa177be41ef0cb4667915e21a7856998dc30f))

## [0.2.2](https://github.com/khancerberus/creator-awards-reforged/compare/v0.2.1...v0.2.2) (2025-01-29)


### Bug Fixes

* add env_file configuration to PostgreSQL service in docker-compose ([237666e](https://github.com/khancerberus/creator-awards-reforged/commit/237666e347be956ac5de3676b451d3cf6ebda593))

## [0.2.1](https://github.com/khancerberus/creator-awards-reforged/compare/v0.2.0...v0.2.1) (2025-01-29)


### Bug Fixes

* expose PostgreSQL port in docker-compose configuration ([36b85cd](https://github.com/khancerberus/creator-awards-reforged/commit/36b85cd4d52725f97708fede5946ab1fa9e0eca6))

## [0.2.0](https://github.com/khancerberus/creator-awards-reforged/compare/v0.1.0...v0.2.0) (2025-01-29)


### Features

* update Nginx configuration for awards.cotecreator.com and enable Certbot validation ([d4dcdaa](https://github.com/khancerberus/creator-awards-reforged/commit/d4dcdaae173e3103999439b95d6a943b0293375f))

## [0.1.0](https://github.com/khancerberus/creator-awards-reforged/compare/v0.0.1...v0.1.0) (2025-01-28)


### Features

* add certbot for SSL certificate management and configure Docker volumes for Let's Encrypt ([c8feff4](https://github.com/khancerberus/creator-awards-reforged/commit/c8feff4ae689eb46b8f68ccf38738b7123f2a3f8))
* add site.webmanifest for improved PWA support ([3bc8f46](https://github.com/khancerberus/creator-awards-reforged/commit/3bc8f4623c9009ec405c5ba46400d70fcd6becf1))
* add TicketButton component for navigation to ticket page ([b3a7c3b](https://github.com/khancerberus/creator-awards-reforged/commit/b3a7c3bd52937ae9985a69bca376fcd77795b168))
* configure Nginx for HTTP to HTTPS redirection and set up SSL for frontend and API ([358ac32](https://github.com/khancerberus/creator-awards-reforged/commit/358ac3203504add6a52d8a59ed2bc09f01fb3787))
* enhance Ticket page layout with flexbox for improved responsiveness ([30ef1e3](https://github.com/khancerberus/creator-awards-reforged/commit/30ef1e3d8b180121b052839b2c5c219ebac0618d))
* implement countdown component and enhance styling with new animations and background images ([ffc34e2](https://github.com/khancerberus/creator-awards-reforged/commit/ffc34e2dae632a75f307d8c4b9db870d95582960))
* update index.html with additional favicon links and modify title for 2024 ([3bc8f46](https://github.com/khancerberus/creator-awards-reforged/commit/3bc8f4623c9009ec405c5ba46400d70fcd6becf1))


### Bug Fixes

* enable StrictMode in main.tsx for improved performance and debugging ([0fac1ba](https://github.com/khancerberus/creator-awards-reforged/commit/0fac1ba49b54cc4902fcb0a15fbfa1d40f8c8a6a))

## 0.0.1 (2024-12-20)


### Features

* Add Docker configuration for client and API, including Dockerfiles and .dockerignore files ([9f59dae](https://github.com/khancerberus/creator-awards-reforged/commit/9f59dae420bfe33a8ccf9b335d52d5d7209abda1))
* Add environment configuration, restructure app components, and implement routing ([feb509c](https://github.com/khancerberus/creator-awards-reforged/commit/feb509ccc580d99927164f3ee5576d9285dda429))
* add LoginButton component and authentication handling with AuthPage ([e125a7b](https://github.com/khancerberus/creator-awards-reforged/commit/e125a7bd2f41b509cfd77ef8f8984f8139dbc1b5))
* Add Nginx configuration for serving client and API requests ([1ce19c6](https://github.com/khancerberus/creator-awards-reforged/commit/1ce19c698aae90a47182beff4e520d698f8aa96b))
* Add Open Graph meta tags to index.html for improved social sharing ([121813b](https://github.com/khancerberus/creator-awards-reforged/commit/121813b35e2fc9af5118f812d9333ecf4cd565a1))
* add release-please GitHub Actions workflow for automated release management on main branch ([049e474](https://github.com/khancerberus/creator-awards-reforged/commit/049e474f1e317e98f645934873975292137b1dc5))
* add Toaster component for enhanced notification handling in BaseLayout ([10d53bf](https://github.com/khancerberus/creator-awards-reforged/commit/10d53bfe6f91f970c793359aba37c6a2794ba8b4))
* Implement authentication and Twitch user handling with new routers and services ([44bbec8](https://github.com/khancerberus/creator-awards-reforged/commit/44bbec899958f42343734b7542d756f8b60de782))
* Implement authentication module with Express, including routes, services, and middleware ([a8e78b4](https://github.com/khancerberus/creator-awards-reforged/commit/a8e78b4071b8a4fabd21470840507066ea8c1bc7))
* implement floating animation and redesign App component for Creator Awards 2024 with interactive cards and button ([a3aa166](https://github.com/khancerberus/creator-awards-reforged/commit/a3aa1662396f46c65296ba5d38f420fb5653f132))
* Refactor Navigator and App components to use pixel-retroui Button and Card, enhancing UI elements ([7453834](https://github.com/khancerberus/creator-awards-reforged/commit/74538346311561b687a754ebcf13d1c2e92526b1))
* Update .env.example to include NODE_ENV for development environment ([328c225](https://github.com/khancerberus/creator-awards-reforged/commit/328c22539e524716d2d7b062f8618a371d96996d))
* Update styles and logo in the client for improved aesthetics and branding ([85f22a0](https://github.com/khancerberus/creator-awards-reforged/commit/85f22a0551aa172c73e67419a090c0234aebc4ba))


### Miscellaneous Chores

* release 0.0.1 ([43a375a](https://github.com/khancerberus/creator-awards-reforged/commit/43a375a4f4ea00aacae069555233d99b1c6e440b))
