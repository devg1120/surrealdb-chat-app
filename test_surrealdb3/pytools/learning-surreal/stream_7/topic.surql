DEFINE TABLE OVERWRITE topic TYPE NORMAL SCHEMAFULL;

DEFINE FIELD OVERWRITE name
    ON TABLE topic
    TYPE string
;

DEFINE FIELD OVERWRITE description
    ON TABLE topic
    TYPE string
;

DEFINE FIELD OVERWRITE slug
    ON TABLE topic
    TYPE string
    ASSERT $value.len() > 1 AND $value == $value.slug()
;

DEFINE INDEX OVERWRITE unique_slug
    ON TABLE topic 
    COLUMNS slug
    UNIQUE;