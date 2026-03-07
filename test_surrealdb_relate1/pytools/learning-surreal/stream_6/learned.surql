DEFINE TABLE OVERWRITE learned
    TYPE RELATION
    SCHEMAFULL
;

DEFINE FIELD OVERWRITE in
    ON TABLE learned
    TYPE record<user>
    ASSERT !!$value.id
;

DEFINE FIELD OVERWRITE out
    ON TABLE learned
    TYPE record<post>
    ASSERT !!$value.id AND $value.learnable
;

DEFINE FIELD OVERWRITE date
    ON TABLE learned
    TYPE datetime
    VALUE time::now()
    READONLY
;

DEFINE INDEX OVERWRITE unique_relation
    ON TABLE learned 
    COLUMNS in, out UNIQUE;