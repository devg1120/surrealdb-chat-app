DEFINE TABLE OVERWRITE is_about
    TYPE RELATION
    IN post|series OUT topic ENFORCED
    SCHEMAFULL
;

DEFINE INDEX OVERWRITE unique_relation
    ON TABLE is_about 
    COLUMNS in, out UNIQUE;