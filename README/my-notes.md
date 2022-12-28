# My Notes

Installing/uninstalling packages inside our Express app:
```
docker exec -it 59b9ef0e502a npm uninstall dotenv
```

In the command above, `59b9ef0e502a` is the id of the container where Node.js runs (get it with `docker ps`).