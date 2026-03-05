DEFINE TABLE OVERWRITE liked
    TYPE RELATION
    SCHEMAFULL
    PERMISSIONS
        FOR select, create, delete WHERE $access = "users" AND in = $auth.id
;

DEFINE FIELD OVERWRITE in
    ON TABLE liked
    TYPE record<user>
    ASSERT !!$value.id
    PERMISSIONS FOR create WHERE id == $auth.id
;

DEFINE FIELD OVERWRITE out
    ON TABLE liked
    TYPE record<post|comment>
;

DEFINE INDEX OVERWRITE unique_relation
    ON TABLE liked
    COLUMNS in, out UNIQUE;

DEFINE EVENT OVERWRITE on_create_update_likes_count ON TABLE liked
    WHEN $event == "CREATE"
    THEN {
        IF $after.out.id IS NONE {
            THROW "Can't like something that doesn't exist";
        };
        IF meta::tb($after.out) == "comment" AND $after.out.approved == false {
            THROW "Can't like an unapproved comment";
        };
        LET $new_count = $after.out.likes_count + 1;
        UPDATE $after.out SET likes_count = $new_count;
    }
;

DEFINE EVENT OVERWRITE on_delete_update_likes_count ON TABLE liked
    WHEN $event == "DELETE"
    THEN {
        LET $new_count = $before.out.likes_count - 1;
        UPDATE $before.out SET likes_count = $new_count;
    }
;