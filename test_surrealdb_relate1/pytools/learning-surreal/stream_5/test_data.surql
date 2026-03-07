CREATE post:post4 SET
    title = "Post 4",
    description = "...",
    slug = "post-4",
    obsolete = false,
    draft = false,
    learnable = true,
    og_image = "wololo.png",
    published_at = time::now()
;

RELATE user:user_2kg38yfLgcs5xwqbzLfcmRzAHp8->authored->[post:post1, post:post2, post:post3, post:post4];

CREATE comment SET
    content = "Give up already!",
    author = $auth,
    post = post:post2
;