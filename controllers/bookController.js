const fs = require("fs");
const { nanoid } = require("nanoid"); //unique id generater
const path = require("path");
const PATH_DATA = path.join(__dirname, "../data/book.json"); //book.json, file dimana data JSON disimpan
/** reading json from file path given */
const readJson = () => {
  /** surround with try and catch, if success then return parsed data, if fail then create an empty file with empty array */
  try {
    const data = fs.readFileSync(PATH_DATA, {
      encoding: "utf8",
    });
    return JSON.parse(data);
  } catch (e) {
    fs.writeFileSync(PATH_DATA, JSON.stringify([]));
    return readJson();
  }
};
/**
 * write string json to file
 * @param newData
 */
const writeJson = (newData) => {
  fs.writeFileSync(PATH_DATA, JSON.stringify(newData));
};
/**
 * validate data before modifying
 * @param data
 * @returns {boolean}
 */
const validateData = (data) => {
  return data && Array.isArray(data);
};
/**
 * find index from array books
 * @param arrayBooks
 * @param bookId
 * @returns {number} -1 if not matched, else will return index number of an array
 */
const findBookIndex = (arrayBooks, bookId) => {
  return arrayBooks.findIndex((value) => value.id === bookId);
};
/**
 * create new book
 * @param book
 * @returns {string|bookId}
 */
const createBook = (book) => {
  //reading file
  const currentBooks = readJson();
  const newBookId = nanoid();
  // ...book = copying book key-value, and add another key-value (id,insertedAt,updatedAt,finished)
  const modifiedBook = {
    ...book,
    id: newBookId,
    insertedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    finished: book.pageCount === book.readPage,
  };
  let modifiedBooks;
  if (validateData(currentBooks)) {
    // ...currentBooks = copying currentBooks array value, and append new array in last index
    modifiedBooks = [...currentBooks, modifiedBook];
  } else {
    modifiedBooks = [];
  }
  //write json
  writeJson(modifiedBooks);
  return newBookId;
};
/**
 * update existing book based on params
 * @param bookData
 * @param bookId
 * @returns {boolean}
 */
const updateBook = (bookData, bookId) => {
  //reading file
  const currentBooks = readJson();
  if (validateData(currentBooks)) {
    const foundIndex = findBookIndex(currentBooks, bookId);
    if (foundIndex > -1) {
      const modifiedBooks = currentBooks.filter((book) => book.id !== bookId);
      const modifiedBook = {
        ...currentBooks[foundIndex],
        ...bookData,
        updatedAt: new Date().toISOString(),
      };
      //write json
      writeJson([...modifiedBooks, modifiedBook]);
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
/**
 * delete existing book by id
 * @param bookId
 * @returns {boolean}
 */
const deleteBook = (bookId) => {
  const currentBooks = readJson();
  if (validateData(currentBooks)) {
    const foundIndex = findBookIndex(currentBooks, bookId);
    if (foundIndex > -1) {
      const modifiedBooks = currentBooks.filter((book) => book.id !== bookId);
      writeJson(modifiedBooks);
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
/**
 * get all books
 * @returns {any|*[]}
 */
const readBook = () => {
  const currentBooks = readJson();
  if (validateData(currentBooks)) {
    return currentBooks;
  } else {
    return [];
  }
};
/**
 * reading book by id
 * @param bookId
 * @returns {boolean|*}
 */
const readBookById = (bookId) => {
  const currentBooks = readJson();
  if (validateData(currentBooks)) {
    const foundIndex = findBookIndex(currentBooks, bookId);
    return currentBooks[foundIndex];
  } else {
    return false;
  }
};
module.exports = { createBook, updateBook, deleteBook, readBook, readBookById };
