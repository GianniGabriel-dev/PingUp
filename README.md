# PingUp - Full Stack Social Media Platform

PingUp is a full-stack social media web application inspired by Twitter/X.
The project focuses on recreating realistic social media behavior while implementing modern web development practices, scalable architecture patterns, AI integrations, media handling, and optimized frontend performance.

The application is built as a SPA (Single Page Application) using React, with an Express.js backend following a REST API + MVC architecture.

---

# Tech Stack

## Frontend

* React
* TypeScript
* TanStack Query
* TanStack Infinite Query
* React Easy Crop
* Zod

## Backend

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* PostgreSQL
* Multer
* Express Validator

## External Services

* Google Cloud Translation API
* Google Cloud Natural Language API (NLP)
* Cloudinary

---

# General Application Behavior

The platform supports both guest users and authenticated users.

Guest users can:

* Browse public posts
* Visit user profiles
* Translate posts

Authenticated users gain access to all social features such as:

* Creating posts
* Liking posts
* Commenting/replying
* Following users
* Editing profiles
* Accessing personalized feeds

---

# Authentication System

Authentication is implemented using JWT (JSON Web Tokens).

The JWT token is stored in localStorage.

When the application loads:

1. The frontend checks if a token exists in localStorage
2. If a token exists, the frontend calls the `/me` endpoint
3. The backend validates the token
4. If valid:

   * the authenticated user session is restored
5. If invalid or expired:

   * the token is removed from localStorage
   * the application loads as a guest user

The application currently distinguishes only between:

* authenticated users
* non-authenticated users

No advanced role system is implemented yet.

---

# User System

Each user contains:

* Unique username
* Email
* Password or OAuth provider
* Avatar
* Banner image
* Bio
* Preferred language

Important behavior:

* Usernames are unique
* Usernames cannot be changed
* Full names are NOT unique

Users can edit:

* Full name
* Bio
* Avatar
* Banner image

---

# Image Editing System

When users upload a new avatar or banner image:

1. The image is edited client-side using React Easy Crop
2. Users can:

   * crop
   * zoom
   * reposition the image
3. The canvas is converted into a final image
4. The processed image is sent to the backend
5. The backend uploads the final media to Cloudinary

This allows users to customize how their profile images appear before upload.

---

# Post System

Posts support:

* Text
* Images
* Videos

A post must always contain at least one content type:

* text
* image
* or video

Empty posts are not allowed.

The backend validates this rule before creating a post.

Media uploads are handled using Multer and stored in Cloudinary.

---

# Feed System

The application contains multiple feeds:

## Main Feed

* Chronological order
* Infinite scroll
* AI sentiment filtering

## Following Feed

* Only posts from followed users
* Chronological order
* Infinite scroll

## Profile Feed

When visiting a user profile, users can:

* View their posts
* View their replies/comments

---

# Pagination System

The application uses cursor-based pagination instead of offset pagination.

Each paginated response returns:

* the requested posts
* a `nextCursor` object

The cursor contains:

* `created_at`
* `id`

This improves scalability and avoids pagination inconsistencies when multiple posts share the same timestamp.

---

# Infinite Scroll & Cache System

Infinite scrolling is implemented using TanStack Infinite Query.

Caching is handled using TanStack Query.

Each query has a query key/name.

When mutations occur (likes, comments, follows, etc.), related queries are invalidated using `invalidateQueries()` to refresh the UI without reloading the page.

The cache system helps:

* avoid unnecessary requests
* preserve data between views
* improve SPA navigation performance

---

# Translation System

The application integrates Google Cloud Translation API.

When a post is created:

* its language is automatically detected

Authenticated users can choose a preferred language.

The "Translate" button only appears when:

* the post language differs from the user's preferred language

To reduce unnecessary external API requests:

* translated posts are stored in a dedicated `Translation` database table
* if the same translation already exists, it is retrieved directly from the database instead of calling Google Translate again

This acts as a translation cache system.

---

# AI Sentiment Analysis

When text posts are created:

1. The backend sends the text to Google Cloud NLP
2. The post is classified as:

   * Positive
   * Neutral
   * Negative

Authenticated users can filter the MAIN FEED by sentiment.

Important:

* sentiment filtering only affects the main feed
* it does NOT affect:

  * replies/comments
  * profile feeds

---

# Notifications System

The application simulates a social media notification system.

Whenever users perform actions such as:

* liking a post
* replying/commenting
* following another user

a new row is created in the `Notification` table.

Notifications are persisted in the database to simulate real-world social platform behavior.

---

# Backend Validation & Security

Important actions are validated server-side.

Frontend validation uses:

* Zod

Backend validation uses:

* Express Validator

The backend validates:

* authentication
* permissions
* request structure
* allowed actions

The frontend alone cannot execute privileged operations.

---

# Database Design

The database is designed using PostgreSQL + Prisma ORM.

The schema includes:

* Users
* Posts
* Likes
* Follows
* Notifications
* Translations

Important database design decisions:

* compound unique constraints prevent duplicate likes/follows
* recursive post relations support replies/comments
* `onDelete: Cascade` is used to preserve relational consistency
* translations are cached in the database
* cursor pagination uses `created_at + id`

---

# Current Limitations / Future Improvements

Current limitations:

* No real-time system yet
* No deployment yet
* No advanced role system
* No soft delete system
* No rate limiting yet

Potential future improvements:

* WebSockets / real-time notifications
* Refresh tokens
* HTTP-only cookie authentication
* Rate limiting & anti-spam protection
* Video compression pipeline
* Direct-to-cloud uploads
* Docker deployment
* CI/CD
* Monitoring/logging
* Search system
* Hashtags/trending system
* Bookmark system

---

# Main Goal of the Project

The main goal of PingUp is to practice and demonstrate:

* Full-stack architecture
* REST API design
* Database modeling
* Authentication systems
* Media handling
* Infinite scrolling
* Cursor pagination
* Client-side caching
* AI integrations
* Translation systems
* Modern frontend/backend communication
* Real-world social media application design
