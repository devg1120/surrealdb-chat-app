DEFINE TABLE post_interactions TYPE NORMAL AS
    SELECT
        id AS post_id,
        likes_count AS likes_count,
        comments_count AS comments_count
    FROM post
    PERMISSIONS
        FOR select FULL
;
