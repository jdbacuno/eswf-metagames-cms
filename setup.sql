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
    "src": "https://scontent.fmnl4-2.fna.fbcdn.net/v/t39.30808-6/522969287_1957984598097539_329589209650408492_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=53a332&_nc_eui2=AeH5o5qmb4AmsiHE9muT-t7kjqtpwLqlEq-Oq2nAuqUSr3s6xCAvOFHbwf-UY_RmNDU6f-Ipq5PTfwedoz3ksK31&_nc_ohc=wcTxbGXVzrgQ7kNvwGPwcev&_nc_oc=Adr8OU4W7SqTjRk1Blg8WayuXAqjj43mR26Pbg1QjdNsSUWQFO666MiMLUc6fFwsSwvobkF5OCHhx39eFgQnMb0n&_nc_zt=23&_nc_ht=scontent.fmnl4-2.fna&_nc_gid=52fqVXudKxwh1iPzcjPH8g&_nc_ss=7a3a8&oh=00_Af1434Kd9kp7mH0uactCqfAJIh45A56mhG94w1qIZ7Ekjw&oe=69D2655E",
    "alt": "Esports Arena"
  },
  "cards": [
    {
      "imageSrc": "https://scontent.fmnl4-7.fna.fbcdn.net/v/t51.75761-15/471663915_18109996414449658_7441520090635544914_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeFknWIooPi4KIk8NYb-khc1xNL2kXNq0DPE0vaRc2rQM9-M6NQyuvrYHsAMZ8XUkvvE-_aXD_rNU9my6Lr8vUq3&_nc_ohc=2sFIyO_HiBwQ7kNvwGnJ9ui&_nc_oc=AdpJdxpPw8Qo-1pTN4ItCEdqpXcnoz3NqHC5x3ElyPy8YKzi_63vVRaOiBuTCAI1ti7G8NSg1SVsmw7q7IIV-ER4&_nc_zt=23&_nc_ht=scontent.fmnl4-7.fna&_nc_gid=JGQOFpJFNvpninqYt0UbjQ&_nc_ss=7a3a8&oh=00_Af2N2O3eIpJD3oioXGB1MC_8fYfbEITsacM9R0USHmI0dw&oe=69D26DA5",
      "imageAlt": "ESWF MetaGames logo",
      "text": "Learn What MetaGames",
      "url": "#what-are-metagames"
    },
    {
      "imageSrc": "https://scontent.fmnl4-4.fna.fbcdn.net/v/t1.6435-9/75262136_534834370412576_2365792025292308480_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeF4SOfm1lh1BehU10iVoIVvXHMWcrE1W5tccxZysTVbmyU8oVMSsgKWjqrZbN4aqIgmLaXAf4IbsrWSi_r3P3ZW&_nc_ohc=VTz9v18pmUwQ7kNvwFzLMiN&_nc_oc=AdooJHVvqKyM3xWudrQ5BAxCc9bnmPa3_Sa1c6RTTx7AXrGbu5nHm4A_xO7L6RGgtLrcrgBwuj4yEH4e-PdMGVVv&_nc_zt=23&_nc_ht=scontent.fmnl4-4.fna&_nc_gid=KqX8ZnJtAz8o2lqOrR3_GQ&_nc_ss=7a3a8&oh=00_Af2Nhe2ptbOQ8RivCOKLOLbGoguXxg4Fn2lFG9N68PouDQ&oe=69F3F8EF,
      "imageAlt": "Children playing with VR",
      "text": "Explore Sports & Games",
      "url": "#sports-and-games"
    },
    {
      "imageSrc": "https://photos.fife.usercontent.google.com/pw/AP1GczMNoRY2MeyeU5iN4YLiY7FX0XhTpA0ct_njVmG5CFv5vdBfjLHYLhw=w748-h714-no?authuser=0",
      "imageAlt": "Jigsaw puzzle",
      "text": "Join the Movement",
      "url": "#meta-movement"
    }
  ],
  "cta": {
    "text": "Welcome to the MetaGames"
  },
  "catchphrase": {
    "text": "Where Sports, Games, and Digital Worlds Unite",
    "paragraph": "MetaGames is a global movement that brings together traditional sports, esports, digital sports, and virtual experiences into one unified international event."
  }
}');