DEFINE TABLE OVERWRITE requires
    TYPE RELATION
    FROM post TO post
    SCHEMAFULL
    COMMENT "Whether a post requires the knowledge from another post"
;

DEFINE FIELD OVERWRITE in
    ON TABLE requires
    TYPE record<post>
    ASSERT $value != $this.out AND !!$value.id
;

DEFINE FIELD OVERWRITE out
    ON TABLE requires
    TYPE record<post>
    ASSERT $value != $this.in AND !!$value.id AND $value.learnable
;

DEFINE INDEX OVERWRITE unique_post_requirements 
    ON TABLE requires 
    COLUMNS in, out UNIQUE;