DEFINE TABLE approved
    TYPE RELATION
    SCHEMAFULL
;


DEFINE FIELD OVERWRITE in
    ON TABLE approved
    TYPE record<user>
    ASSERT !!$value.id AND $value.id IN (SELECT VALUE ->comment.post<-authored<-user.id FROM ONLY $this LIMIT 1).flatten()
;

DEFINE FIELD OVERWRITE out
    ON TABLE approved
    TYPE record<comment>
    ASSERT !!$value.id
;

DEFINE FIELD OVERWRITE date
    ON TABLE approved
    TYPE datetime
    VALUE time::now()
    READONLY
;

DEFINE FIELD OVERWRITE note
    ON TABLE approved
    TYPE option<string>
;

DEFINE INDEX OVERWRITE only_one_approval_per_comment
    ON TABLE approved 
    COLUMNS out UNIQUE;


DEFINE EVENT OVERWRITE on_approval_creation
    ON TABLE approved
    WHEN
        $event == "CREATE"
    THEN {
        UPDATE $after.out SET approved = true;
    }
;

DEFINE EVENT OVERWRITE on_approval_deletion
    ON TABLE approved
    WHEN
        $event == "DELETE"
    THEN {
        UPDATE $before.out SET approved = false;
    }
;

DEFINE EVENT OVERWRITE on_approval_update
    ON TABLE approved
    WHEN
        $event == "UPDATE"
    THEN {
        THROW "Cannot update approval status (" + <string>$after.id + ")";
    }
;