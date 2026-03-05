DEFINE TABLE OVERWRITE contains
    TYPE RELATION
    SCHEMAFULL
;

DEFINE FIELD OVERWRITE in
    ON TABLE contains
    TYPE record<series>
    ASSERT !!$value.id
;

DEFINE FIELD OVERWRITE out
    ON TABLE contains
    TYPE record<post>
    ASSERT !!$value.id
;

DEFINE INDEX OVERWRITE unique_relation
    ON TABLE contains 
    COLUMNS in, out UNIQUE;