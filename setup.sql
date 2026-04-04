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
}'),
('sports-and-games', '{
  "title": "Sports & Games",
  "slides": [
    {
      "imageSrc": "src/images/basketball-hoops.webp",
      "imageAlt": "Basketball hoop",
      "title": "Sports & Games",
      "description": "Physical & Olympic-style sports"
    },
    {
      "imageSrc": "src/images/chess.webp",
      "imageAlt": "Mind Games",
      "title": "Mind Sports",
      "description": "Chess, Scrabble, Sudoku, etc."
    },
    {
      "imageSrc": "src/images/esports.webp",
      "imageAlt": "Mobile Legends Adventure Poster",
      "title": "Electronic Sports (Esports)",
      "description": "MOBA, FPS, RTS, Fighting Games, BR, MMORPG"
    },
    {
      "imageSrc": "src/images/vr-headset.webp",
      "imageAlt": "Athlete wearing an illuminated VR headset",
      "title": "Digital & Virtual Sports",
      "description": "Digital Motorsports|Digital Combat|VR & AR sports"
    },
    {
      "imageSrc": "src/images/classroom.webp",
      "imageAlt": "Classroom",
      "title": "Multi-Cultural & Indigenous Sports",
      "description": "Traditional games from different cultures"
    }
  ]
}'),
('meta-movement', '{
  "title": "The Meta Movement",
  "subtitle": "The Rise of the Meta Movement (2025–2027)",
  "colors": [
    "bg-brand-green",
    "bg-brand-blue",
    "bg-brand-yellow",
    "bg-brand-red",
    "bg-white",
    "bg-black"
  ],
  "watchCard": {
    "image": "src/images/watch.webp",
    "alt": "Person wearing smartwatch with dumbbells",
    "text": "Physical Fitness",
    "description": "Promoting healthy, active lifestyles through sports and movement, encouraging people of all ages to stay strong, energized, and well."
  },
  "vrheadsetCard": {
    "image": "src/images/meta-vr-headset.webp",
    "alt": "Person wearing AR headset",
    "text": "Digital Innovation"
  },
  "girlCostumeCard": {
    "image": "src/images/girl-in-cultural-costume.webp",
    "alt": "Girl in traditional cultural costume",
    "text": "Cultural Unity"
  },
  "playFairCard": {
    "image": "src/images/play-fair.webp",
    "alt": "Children playing together",
    "text": "Fair Play & Inclusivity"
  },
  "audienceBar": [
    "Athletes",
    "Gamers",
    "Students",
    "Professionals",
    "Nations"
  ]
}'),
('metagames-emblems', '{
  "title": "MetaGames Emblem & Symbolism",
  "motto": "One symbol. Many sports. One global community.",
  "logo": {
    "src": "src/images/eswf-metagames-logo.webp",
    "alt": "MetaGames Logo"
  },
  "emblems": [
    { "color": "Green", "desc": "Multi Cultural Sports", "background": "var(--green)" },
    { "color": "Blue", "desc": "Electronic Sports", "background": "var(--blue)" },
    { "color": "Yellow", "desc": "Traditional Sports", "background": "var(--yellow)" },
    { "color": "Red", "desc": "Active/Digital/Virtual Sports", "background": "var(--red)" },
    { "color": "White", "desc": "The ESWF Member Nations", "background": "#ffffff" },
    { "color": "Black", "desc": "The Meta Movement", "background": "#000000" },
    { "color": "Grey", "desc": "Professional & Amateur Sports", "background": "var(--slate)" }
  ]
}'),
('theme-song', '{
  "heading": "Official Theme Song",
  "title": "\\"Legends Rise in the Meta Games\\"",
  "subtitle": "Meta Games OST",
  "poster": {
    "src": "src/images/theme-song.webp",
    "alt": "Legends Rise in the Meta Games OST Poster"
  },
  "caption": "Launching of the Official OST of Meta Games entitled: Legends Rise in the Meta Games",
  "lyrics": [
    {
      "label": "Verse 1",
      "text": "Here is where we carve our name|this is more than just a game|We level up with each new quest|and prove ourselves as the very best."
    },
    {
      "label": "Verse 2",
      "text": "Our minds are sharp, our skills refined|our passion for victory enshrined|in this world where anything can be|We rise to challenge, wild and free"
    },
    {
      "label": "Chorus",
      "text": "Legends rise, the battle''s on,|Until the final victory is won.|Meta Games, where heroes play,|To lead the world in every way."
    }
  ]
}');