-- Run this once in MySQL client or phpMyAdmin
CREATE DATABASE IF NOT EXISTS metagames_cms
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE metagames_cms;

-- ── Admins table ──────────────────────────────────────────────
CREATE TABLE admins (
    id            INT          AUTO_INCREMENT PRIMARY KEY,
    username      VARCHAR(50)  NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- ── Page sections table ───────────────────────────────────────
CREATE TABLE page_sections (
    id         INT          AUTO_INCREMENT PRIMARY KEY,
    section    VARCHAR(50)  NOT NULL UNIQUE,   -- 'navbar', 'hero', etc.
    content    JSON         NOT NULL,
    updated_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
                            ON UPDATE CURRENT_TIMESTAMP
);

-- ── Seed initial content ──────────────────────────────────────
INSERT INTO page_sections (section, content) VALUES
('header', '{
  "id": 1,
  "title": "HAWAK NI EUGENE ANG BEAT",
  "colors": [
    "bg-brand-green","bg-brand-blue","bg-brand-yellow",
    "bg-brand-red","bg-white","bg-black"
  ]
}'),
('navbar', '{
  "logo": {
    "src": "src/images/eswf-metagames-logo.webp",
    "alt": "ESWF MetaGames logo"
  },
  "cta": {
    "text": "Join MetaGames",
    "url": "#"
  },
  "links": [
    { "text": "Home",               "url": "#main-content"       },
    { "text": "What Are MetaGames", "url": "#what-are-metagames" },
    { "text": "News & Updates",     "url": "#news-and-update"    },
    { "text": "Sports & Games",     "url": "#sports-and-games"   },
    { "text": "Meta Movement",      "url": "#meta-movement"      },
    { "text": "Love Story",      "url": "#theme-song"      }
  ]
}'),
('hero', '{
  "backgroundImage": {
    "src": "src/images/esports-arena.webp",
    "alt": "Esports Arena"
  },
  "cards": [
    {
      "imageSrc": "src/images/eswf-metagames-logo.webp",
      "imageAlt": "ESWF MetaGames logo",
      "text": "Learn What MetaGames",
      "url": "#what-are-metagames"
    },
    {
      "imageSrc": "src/images/children-with-vr.webp",
      "imageAlt": "Children playing with VR",
      "text": "Explore Sports & Games",
      "url": "#sports-and-games"
    },
    {
      "imageSrc": "src/images/puzzle.webp",
      "imageAlt": "Jigsaw puzzle",
      "text": "Join the Movement",
      "url": "#meta-movement"
    }
  ],
  "cta": {
    "text": "Hawak ni Eugene ang Beat ni Cid"
  },
  "catchphrase": {
    "text": "Where Sports, Games, and Digital Worlds Unite",
    "paragraph": "MetaGames is a global movement that brings together traditional sports, esports, digital sports, and virtual experiences into one unified international event."
  }
}'),
('what-are-metagames', '{
  "title": "What are MetaGames",
  "text": "MetaGames is not just one sport or one game. It is a combination of physical sports, esports, mind games, and digital competitions happening together under one global platform.",
  "binaryNum": {
    "src": "src/images/wam-background.webp",
    "alt": "Binary numbers"
  },
  "athleteVr": {
    "src": "src/images/vr-headset2.webp",
    "alt": "Athlete wearing an illuminated VR headset"
  },
  "pillars": [
    { "color": "bg-brand-green",  "text": "LIFE" },
    { "color": "bg-brand-blue",   "text": "TIME" },
    { "color": "bg-brand-yellow", "text": "GAME" },
    { "color": "bg-brand-red",    "text": "META" }
  ]
}'),
('marquee', '{
  "text": "Mastering the MetaGames of Life, One Move at a Time."
}'),
('news', '{
  "title": "News & Updates",
  "image": {
    "src": "src/images/news-and-update.webp",
    "alt": "News & Update section image"
  }
}');