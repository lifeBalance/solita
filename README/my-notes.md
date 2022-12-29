# My Notes
Really fun project where I learned a few interesting things. 

## Stack
I decided to to the SPA route using:

* Express.js in the backend, with MongoDB, because I wanted to take the chance to become familiar with NoSQL databases.

* React.js in the front-end.

I should have used TypeScript, but honestly I still have to become faster with it, so I hope JavaScript also makes the cut for this ocassion.

## Docker Setup
I used Docker Compose for delivering the assignment, so I had to adjust my workflow a bit (compared to what I usually do when developing locally). For example, installing/uninstalling packages inside our Express app:
```
docker exec -it 59b9ef0e502a npm uninstall dotenv
```

In the command above, `59b9ef0e502a` is the id of the container where Node.js runs (get it with `docker ps`).

It was worthy :-)

## Importing the datasets
Here is where I spent most of the time, facing several small issues:

* Since the datasets were relatively big, I couldn't upload them to my GitHub repo, so I had to find a way to download them during **local deployment**. So I put together a `Makefile` and used `curl` to download them (with the ``-L`` flag to deal with the redirects) to the filesystem before anything else.

* The datasets were mounted as volumes so they were accessible once the containers were launched.

* Importing them into the database required a bit of Unix ingenuity to get rid of the CSV header (with ``tail``) and filter short journeys (with ``awk``). I had to use ``mongoimport``, because when I tried with a script, the setup seemed to choke with the amount of data that was written (crashed after successfully saving about half a million documents). I was using streams and mongoose schemas for validation. Not sure if it was the runtime (after all Node.js is almost a browser) or my script. Luckily for such datasets, a native tool like ``mongoimport`` was relatively fast, and learned a few interesting flags (creating my own header in a separate file, adding types to validate data, etc)
