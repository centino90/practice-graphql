exports.up = (pgm) => {
  pgm.createTable("books", {
    id: { type: "bigserial", primarKey: true },
    created_at: { type: "biginit", notNull: true },
    updated_at: { type: "biginit", notNull: true },
    deleted: { type: "boolean", notNull: true },
    title: { type: "text", notNull: true },
    author: { type: "text", notNull: true },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("books");
};
