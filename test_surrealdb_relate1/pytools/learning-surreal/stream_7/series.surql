DEFINE TABLE OVERWRITE series TYPE NORMAL SCHEMAFULL;

DEFINE FIELD OVERWRITE name
    ON TABLE series
    TYPE string
;

DEFINE FIELD OVERWRITE description
    ON TABLE series
    TYPE string
;

DEFINE FIELD OVERWRITE slug
    ON TABLE series
    TYPE string
    ASSERT $value.len() > 3 AND $value == $value.slug()
;

DEFINE INDEX OVERWRITE unique_slug
    ON TABLE series 
    COLUMNS slug
    UNIQUE;