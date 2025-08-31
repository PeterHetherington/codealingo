-- USERS
CREATE TABLE users(
  clerk_id TEXT NOT NULL PRIMARY KEY,
  username VARCHAR(25) NOT NULL UNIQUE,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  bio VARCHAR(255),
  profile_banner TEXT -- image url?
);

-- USER XP
CREATE TABLE xp(
  user_id TEXT NOT NULL PRIMARY KEY references users(clerk_id) on delete cascade,
  xp BIGINT NOT NULL DEFAULT 0
)

-- FRIENDS
CREATE TABLE friends(
  user_id TEXT NOT NULL references users(clerk_id) on delete cascade,
  friend_id TEXT NOT NULL references users(clerk_id) on delete cascade,
  primary key (user_id, friend_id)
);

-- LANGUAGES
CREATE TABLE languages(
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  language_name varchar(255) NOT NULL,
  icon TEXT,
  active BOOLEAN DEFAULT true NOT NULL
);

-- USERS_LANGUAGES
CREATE TABLE users_languages(
  user_id TEXT NOT NULL references users(clerk_id) on delete cascade,
  language_id INT NOT NULL references languages(id) on delete cascade,
  primary key (user_id, language_id)
)

-- UNITS
CREATE TABLE units(
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  language_id INT NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
  unit_name varchar(255) NOT NULL
);

-- LESSONS
CREATE TABLE lessons(
   id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   unit_id INT NOT NULL REFERENCES units(id) ON DELETE CASCADE,
   lesson_name varchar(255) NOT NULL
);

-- LESSON pre-reading
CREATE TABLE lesson_reading(
   id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   lesson_id INT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
   content TEXT NOT NULL,
   pre_type INT NOT NULL REFERENCES pre_type(id) ON DELETE CASCADE
);

-- QUESTION TYPES (image, code, text)
CREATE TABLE pre_types(
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(55) NOT NULL
);

-- QUESTION TYPES (multiple choice, fill-in-the-blank, matching-pairs, code-output)
CREATE TABLE types(
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(55) NOT NULL
);

-- QUESTIONS
CREATE TABLE questions(
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  lesson_id INT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  question TEXT not null,
  type INT NOT NULL REFERENCES types(id),
  explanation TEXT -- feedback if user answers incorrectly
);

-- ANSWERS
CREATE TABLE answer_options(
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  question_id INT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  option TEXT not null,
  is_answer boolean not null
);

-- PROGRESS TRACKING
CREATE TABLE user_progress(
  user_id TEXT NOT NULL REFERENCES users(clerk_id) ON DELETE CASCADE,
  lesson_id INT NOT NULL REFERENCES lessons(id),
  PRIMARY KEY (user_id, lesson_id),
  completed TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- MISTAKE TRACKING
CREATE TABLE mistakes(
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id TEXT NOT NULL REFERENCES users(clerk_id),
  question_id INT NOT NULL REFERENCES questions(id)
);

-- DAILY STREAK
CREATE TABLE streaks(
  user_id TEXT PRIMARY KEY NOT NULL REFERENCES users(clerk_id),
  current_streak INT default 0,
  longest_streak INT default 0,
  last_active DATE
);
