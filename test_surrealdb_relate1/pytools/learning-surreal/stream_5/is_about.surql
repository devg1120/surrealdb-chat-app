DEFINE TABLE OVERWRITE is_about
    TYPE RELATION
    FROM post|series TO topic
    SCHEMAFULL
;

DEFINE FIELD OVERWRITE in
    ON TABLE is_about
    TYPE record<post|series>
    ASSERT !!$value.id
;

DEFINE FIELD OVERWRITE out
    ON TABLE is_about
    TYPE record<topic>
    ASSERT !!$value.id
;

DEFINE INDEX OVERWRITE unique_relation
    ON TABLE is_about 
    COLUMNS in, out UNIQUE;