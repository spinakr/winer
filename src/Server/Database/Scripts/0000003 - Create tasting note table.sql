CREATE TABLE TastingNote
(
    ID int NOT NULL IDENTITY(1,1),
    WineId int NOT NULL,
    Note VARCHAR(1000),
    Occation VARCHAR(200),
    ConsumptionDate DATETIME,
    Score int,
    PRIMARY KEY (ID),
    FOREIGN KEY (WineId) REFERENCES Wine(ID)
)