function get(db, {offset, limit, sortBy, sortDir}){
  return db.manyOrNone(`
      SELECT 
        id,
        name,
        author,
        publication,
        release_date,
        edition,
        rating,
        pages
      FROM
        npc_irs.book
      WHERE 
        id > 0
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
        id,
        name,
        author,
        publication,
        release_date,
        edition,
        rating,
        pages
      FROM
        npc_irs.book
      WHERE 
        id $(id)
    `, param
  )
}

function isPageCorrect(db, {book_id, page}){
  return db.one(`
    SELECT 
      $(page) <= book.pages as isPageCorrect
    FROM 
      npc_irs.book 
    WHERE 
      id = $(book_id)
  `,{
    book_id,
    page
  })  
}

function isDateCorrect(db, {date, book_id}){
  return db.one(`
    SELECT 
      $(date) >= release_date as isdatecorrect
    FROM 
      npc_irs.book 
    WHERE 
      id = $(book_id)
  `,{
    book_id,
    date
  })  
}

function insert(db, param){
  return db.one(`
    INSERT INTO npc_irs.book
      (name, author, publication)
    VALUES
      ($(name), $(author), $(publication))
    ON CONFLICT DO NOTHING
    RETURNING id
  `, param)
}

function isBookExists(db, param){
  return db.oneOrNone(`
    SELECT
      id
    FROM 
      npc_irs.book
    WHERE 
      id = $(book_id)
  `, param)
}

module.exports.get = get
module.exports.getById = getById
module.exports.isPageCorrect = isPageCorrect
module.exports.insert = insert
module.exports.isBookExists = isBookExists
module.exports.isDateCorrect = isDateCorrect