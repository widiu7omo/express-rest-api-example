const bookResponseMessage = {
  successAddBook: "Buku berhasil ditambahkan",
  successUpdateBook: "Buku berhasil diperbarui",
  successDeleteBook: "Buku berhasil dihapus",
  genericErrorBook: "Buku gagal ditambahkan",
  failBookNotFound: "Buku tidak ditemukan",
  missingNamePropAddBook: "Gagal menambahkan buku. Mohon isi nama buku",
  missingNamePropUpdateBook: "Gagal memperbarui buku. Mohon isi nama buku",
  failUpdateByIdBook: "Gagal memperbarui buku. Id tidak ditemukan",
  failDeleteByIdBook: "Buku gagal dihapus. Id tidak ditemukan",
  errorReadPageCountAddBook:
    "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
  errorReadPageCountUpdateBook:
    "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
};
module.exports = bookResponseMessage;
