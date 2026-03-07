DEFINE TABLE OVERWRITE authored
    TYPE RELATION
    SCHEMAFULL
;

DEFINE FIELD OVERWRITE in
    ON TABLE authored
    TYPE record<user>
    ASSERT !!$value.id
;

DEFINE FIELD OVERWRITE out
    ON TABLE authored
    TYPE record<post>
    ASSERT !!$value.id
;

DEFINE FIELD OVERWRITE notes
    ON TABLE authored
    TYPE option<string>
    DEFAULT NONE
;

DEFINE INDEX OVERWRITE unique_relation
    ON TABLE authored 
    COLUMNS in, out UNIQUE;