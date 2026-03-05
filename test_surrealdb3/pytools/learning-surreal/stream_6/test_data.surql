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

RELATE user:user_2kg38yfLgcs5xwqbzLfcmRzAHp8->approved->comment:xngvv5un5ofefxmrtuq3;

# Calculate likes_count and comments_count for each post
UPDATE post SET
    likes_count = (SELECT count() AS count FROM liked WHERE out.id == $parent.id GROUP ALL)[0].count OR 0,
    comments_count = (SELECT count() AS count FROM comment WHERE post.id == $parent.id AND approved == true GROUP ALL)[0].count OR 0
;