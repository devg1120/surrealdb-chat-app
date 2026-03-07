DEFINE TABLE OVERWRITE comment TYPE NORMAL SCHEMAFULL
    PERMISSIONS
        FOR select WHERE approved = true
        FOR create FULL
;

DEFINE FIELD OVERWRITE content
    ON TABLE comment
    TYPE string
    ASSERT string::len($value) <= 1000
;

DEFINE FIELD OVERWRITE author
    ON TABLE comment
    TYPE record<user>
    ASSERT !!$value.id
    PERMISSIONS
        FOR create WHERE author = $auth.id
;

DEFINE FIELD OVERWRITE created_at
    ON TABLE comment
    TYPE datetime
    VALUE time::now()
    READONLY
;

DEFINE FIELD OVERWRITE post
    ON TABLE comment
    TYPE record<post>
    ASSERT $this.reply_to IS NONE OR $this.reply_to.post.id == $value.id
    READONLY
;

DEFINE FIELD OVERWRITE reply_to
    ON TABLE comment
    TYPE option<record<comment>>
    ASSERT $value IS NONE OR !!$value.id
;

DEFINE FIELD OVERWRITE likes_count
    ON TABLE comment
	TYPE int
    DEFAULT 0
    PERMISSIONS
        FOR create, update, delete NONE
        FOR select FULL
    COMMENT "Calculated automatically"
;

DEFINE FIELD OVERWRITE approved
    ON TABLE comment
  	TYPE bool
    DEFAULT false
    PERMISSIONS
        FOR select, update, create, delete NONE
;

DEFINE EVENT OVERWRITE on_comment_created ON TABLE comment
    WHEN $event == "CREATE"
    THEN {
        IF $after.post.id IS NONE {
            THROW "Can't comment on something that doesn't exist";
        };
        UPDATE $after.id SET
            approved = false,
            likes_count = 0
        ;
        # TODO: This is an opportunity to automatically approve the comment if it's the author's comment
    }
;

DEFINE EVENT OVERWRITE on_comment_approval_update ON TABLE comment
    WHEN $event == "UPDATE" AND $before.approved IS NOT NONE AND $before.approved != $after.approved
    THEN {
        IF $after.approved == true {
            UPDATE $after.post SET comments_count = $this.comments_count + 1;
        }
        ELSE {
            UPDATE $after.post SET comments_count = $this.comments_count - 1;
        };
    }
;

DEFINE EVENT OVERWRITE on_comment_delete ON TABLE comment
    WHEN $event == "DELETE"
    THEN {
        IF $before.approved == true {
            UPDATE $before.post SET comments_count = $this.comments_count - 1;
        };
    }
;