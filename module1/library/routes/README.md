## inser value in database
 * one value

```js
    db.books.insertOne(
        {
            title: "title",
            description: "description",
            authors: "authors"
        }
    );
```

 * many values
 
 ```js
    db.books.insertMany([
        {
            title: "first title",
            description: "first description",
            authors: "first authors"
        },
        {
            title: "second title",
            description: "second description",
            authors: "second authors"
        }
    ]);
 ```

## find book

```js
    db.books.findOne({ title: "title" });
```

## update book

```js
    db.books.updateOne(
        { _id: 1 }
        {
            $set: {
                title: "other title",
                description: "other description",
                authors: "other authors"
            }
        }
    );
```
