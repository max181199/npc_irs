CREATE SCHEMA IF NOT EXISTS npc_irs; 

DROP TABLE IF EXISTS  npc_irs.book CASCADE;

CREATE TABLE IF NOT EXISTS npc_irs.book (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	author VARCHAR(255) NOT NULL,
	publication VARCHAR(255) NOT NULL,
	release_date DATE,
	edition INTEGER,
	rating NUMERIC,
	pages INTEGER,
	UNIQUE(name, author, publication)
);

INSERT INTO npc_irs.book (id, name, author, publication, release_date, edition, rating, pages) VALUES (0, 'Не известно', 'Не известно', 'Не известно', NULL, NULL, NULL, NULL);

\COPY npc_irs.book(name, author, publication, release_date, edition, rating, pages)  FROM './mock_data_book.csv' DELIMITER ',' CSV;

DROP TABLE IF EXISTS  npc_irs.book_mark CASCADE;

CREATE TABLE IF NOT EXISTS npc_irs.book_mark (
	id SERIAL PRIMARY KEY,
	book INTEGER REFERENCES npc_irs.book (id),
	page INTEGER,
	login VARCHAR(255),
	date DATE,
	rating NUMERIC
);

\COPY npc_irs.book_mark(book, login, date, rating)  FROM './mock_data_book_mark.csv' DELIMITER ',' CSV;

UPDATE 
	npc_irs.book_mark 
SET 
	page = random() * ((SELECT pages FROM npc_irs.book WHERE npc_irs.book_mark.book = npc_irs.book.id) - 2) + 1;