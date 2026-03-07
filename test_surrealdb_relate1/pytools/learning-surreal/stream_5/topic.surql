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
    ASSERT string::len($value) > 1 AND $value == string::slug($value)
;

DEFINE INDEX OVERWRITE unique_slug
    ON TABLE topic 
    COLUMNS slug
    UNIQUE;