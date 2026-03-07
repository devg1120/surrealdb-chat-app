DEFINE TABLE OVERWRITE viewed
    TYPE RELATION
    SCHEMAFULL
;

DEFINE FIELD OVERWRITE in
    ON TABLE viewed
    TYPE record<user>
    ASSERT !!$value.id
;

DEFINE FIELD OVERWRITE out
    ON TABLE viewed
    TYPE record<post|series|topic>
    ASSERT !!$value.id
;

DEFINE FIELD OVERWRITE date
    ON TABLE viewed
    TYPE datetime
    VALUE time::now()
    READONLY
;

-- TODO: Make it keep only last 10 entries for each unique user->thing