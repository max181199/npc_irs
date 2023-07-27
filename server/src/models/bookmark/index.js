var {
  get: get_db,
  drop: drop_db,
  insert: insert_db,
  update: update_db,
  getById: getById_db
} = require('../../controllers').bookmark

var {
  isPageCorrect,
  isBookExists,
  isDateCorrect
} = require('../../controllers').book

async function get({ startRow, endRow, sort }){
  return await get_db({
    limit: endRow - startRow,
    offset: startRow,
    sortBy:   sort[0] ? sort[0].colId : "id",
    sortDir:  sort[0] ? sort[0].sort : "ASC"
  })
}

async function drop({id}){
  if(!id) throw(new Error(`Неверно указан идентификатор, ${id}`))
  await drop_db({id})
  return {id}
}

async function insert(){
  var now = new Date()
  var id = await insert_db({
    book: 0,
    page: null,
    login: null,
    date: `0${now.getDate()}/`.slice(-3) + `0${now.getMonth() + 1}/`.slice(-3) + `${now.getFullYear()}`,
    rating: null
  })
  return await getById_db(id)
}

function isInt(n) {
  return n % 1 === 0;
}

async function update({
  id,
  book_id,
  page,
  login,
  date,
  rating
}){
  var now = date ? new Date(date) : new Date() 
   
  if (rating){
    if (0 > rating || rating > 100) throw(new Error("Рейтинг должен принадлжеать [0, 100]"))
  }
  if (book_id){
    if (book_id < 0 || !isInt(book_id)) throw(new Error("ID книги должен быть положительным целым"))
    var findingBookId = await isBookExists({book_id})
    if (!findingBookId) throw(new Error(`Книга:${book_id} не найдена`))
    if (page){
      if (page < 0 || !isInt(page)) throw(new Error("Страница должена быть положительным целым"))
      var {ispagecorrect : correct} = await isPageCorrect({page, book_id})
      if (!correct) throw(new Error("Страница превышает кол-во страниц в книге")) 
    }
    if (date){
      var {isdatecorrect : correct} = await isDateCorrect({
        date: `0${now.getDate()}/`.slice(-3) + `0${now.getMonth() + 1}/`.slice(-3) + `${now.getFullYear()}`, 
        book_id
      })
      if (!correct) throw(new Error("Дата добавления закладки должна быть позже чем дата выпуска книги")) 
    }
  }
  
  await update_db({
    id,
    book_id : book_id || 0,
    page: page || null,
    login: login || null,
    date: `0${now.getDate()}/`.slice(-3) + `0${now.getMonth() + 1}/`.slice(-3) + `${now.getFullYear()}`,
    rating: rating ? parseFloat(rating, 10).toFixed(2) : null
  })
  return {id}
}



module.exports.get = get
module.exports.drop = drop
module.exports.update = update
module.exports.insert = insert
