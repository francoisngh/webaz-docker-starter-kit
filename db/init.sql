-- Activer PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;

-- Créer une table points avec un champ géométrie
CREATE TABLE points (
    id SERIAL PRIMARY KEY,
    name TEXT,
    geom geometry(Point, 4326)
);

CREATE TABLE objets(
	id integer GENERATED ALWAYS AS IDENTITY,
    nom  character varying,
    classe  character varying,
    objet_precedent character varying,
    emplacement GEOGRAPHY 
);



    

-- Insérer des données exemples
INSERT INTO points (name, geom) VALUES
('Paris', ST_SetSRID(ST_MakePoint(2.3522, 48.8566), 4326)),
('Lyon', ST_SetSRID(ST_MakePoint(4.8357, 45.7640), 4326)),
('Marseille', ST_SetSRID(ST_MakePoint(5.3698, 43.2965), 4326));

INSERT INTO objets(nom, classe, objet_precedent, emplacement)
VALUES 
    ('cle','cle','aucun', ST_SetSRID(ST_MakePoint(2.347945214328, 48.85428222416), 4326)::geography),
    ('coffre','coffre','cle', ST_SetSRID(ST_MakePoint(4.83291201926, 45.75702277188), 4326)::geography),
    ('code','code','coffre', ST_SetSRID(ST_MakePoint(3.878881544095, 43.6109099758), 4326)::geography),
    ('code2','code','code', ST_SetSRID(ST_MakePoint(1.714190719246, 48.9880364611), 4326)::geography);