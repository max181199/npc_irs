function get(db, {offset, limit, sortBy, sortDir}){
  return db.manyOrNone(`
      SELECT 
        book_mark.id as id,
        name,
        book.id as book_id,
        author,
        publication,
        page,
        login,
        date,
        book_mark.rating as rating 
      FROM
        npc_irs.book_mark
          LEFT JOIN npc_irs.book
            on book_mark.book = book.id
      ORDER BY
        $(sortBy:name)
          $(sortDir:value)
            NULLS LAST
      OFFSET
        $(offset)
      LIMIT
        $(limit)
    `,
    {
      offset,
      limit,
      sortBy,
      sortDir
    }
  )
}

function getById(db, param){
  return db.oneOrNone(`
      SELECT 
        book_mark.id as id,
        name,
        author,
        publication,
        page,
        login,
        date,
        book_mark.rating as rating 
      FROM
        npc_irs.book_mark
          LEFT JOIN npc_irs.book
            on book_mark.book = book.id
      WHERE
        book_mark.id = $(id)
    `, 
    param
  )
}

function drop(db, param){
  return db.none(`
    DELETE FROM npc_irs.book_mark WHERE id = $(id)
  `, param
  )
}

function update(db, param){
  return db.none(`
    UPDATE
      npc_irs.book_mark
    SET
      book = $(book_id),
      page = $(page),
      login = $(login),
      date = $(date),
      rating = $(rating)
    WHERE
      id = $(id)
  `, param)
}

function insert(db, param){
  return db.one(`
    INSERT INTO npc_irs.book_mark
      (book, page, login, date, rating)
    VALUES
      ($(book), $(page), $(login), $(date), $(rating))
    RETURNING id
  `, param)
}

module.exports.get = get
module.exports.getById = getById
module.exports.drop = drop
module.exports.update = update
module.exports.insert = insert