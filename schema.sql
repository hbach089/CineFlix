CREATE TABLE IF NOT EXISTS User(
  uid TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Search(
  sid INTEGER NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  uid INTEGER NOT NULL,
  PRIMARY KEY(uid,sid),
  FOREIGN KEY (uid) REFERENCES User(uid)
);