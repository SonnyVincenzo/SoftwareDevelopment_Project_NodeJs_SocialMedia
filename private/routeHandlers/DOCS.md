# Route Handlers
Endpoint handlers, for endpoints delegated by inside [routers](../routers/). These files handles specific endpoints such: /post, /post?id=n, etc.

# Structure
To ensure proper handling of functions and not to crash the application, we wrap the inner content of the function with a `try-catch` block.

## Simple
For the most simplistic manner of handling endpoints, you'd (preferably) use the prefix "handle" + endpoint + HTTP request (GET, POST, PUT/PATCH/EDIT, DELETE), with the parameters of `(req, res)`. 

It would look like:
```js
export function handleAboutGet(req, res) {
    ...
}
```

## Database enabled handling
For managning database content you'd need to encapsulate the simple funciton to ensure proper pass of db into proper endpoint handler, it would encapsulate with the nomenclature structure "create" + endpoint + HTTP req + "Handler". Then handle a sub function in the manner of return with a proper function with a name or lambda function (works both ways).

It could look like:
```js
export function createPostGetHandler(db) {
    return async function handlePostGet(req, res) {
        ...
    }
}

export function createPostDeleteHandler(db) {
    return async (req, res) => {
        ...
    }
}
```