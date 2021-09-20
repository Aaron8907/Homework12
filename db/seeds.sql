INSERT INTO department (name)
VALUES ("Finance"),
        ("Engineering"),
        ("Sales"),
        ("Quality");

INSERT INTO roles (title, salary,department)
VALUES ("Accounting Payable", 10000, 1),
        ("Accounting Collects", 10000, 1),
        ("Production Engineer", 15000, 2),
        ("Quotation Engineer", 20000, 2),
       ("Internal Sales", 12000, 3),
        ("External Sales", 25000, 3),
        ("Supplier quality", 8000, 4),
        ("Customer quality", 10000, 4);


INSERT INTO employee (firstName, lastName,roles,managerID)
VALUES  ("Juan","Lopez", 1, 100),
        ("Miguel","Hernandez", 2, 100),
        ("Abraham","Martinez", 3, 101),
        ("Brenda","Figueroa", 4, 101),
        ("Katia","Gonzalez", 5, 102),
        ("Roberto","Rodriguez", 6, 102),
        ("Liliana","Elizondo", 7, 103),
        ("Ricardo","Dominguez", 8, 103);
       
