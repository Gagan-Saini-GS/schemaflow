# Schema Flow

Schema Flow is a visual tool designed for generating database schemas and custom enumerations (Enums) with a simple syntax. It allows users to define database tables, their columns, relationships between tables (using foreign keys), constraints, and custom enumerations. The tool generates visual nodes representing tables and their relationships, offering an intuitive and dynamic way to build and understand your schema.

## Features

### 1. Table Creation

Allows users to create database tables by defining their names and specifying the columns, data types, and optional configurations like primary keys and constraints.

### 2. Column Creation

Easily define columns within tables, assigning data types, and adding configurations like length, constraints (e.g., NOT NULL, UNIQUE), and default values.

### 3. Mark Column Primary Key

Specify a column as the primary key using `[primary_key]`, ensuring that it uniquely identifies each row in the table.

### 4. Foreign Key Relationships

Define relationships between tables by using foreign keys. Use `> ref` to reference columns from other tables, establishing connections between data entities.

### 5. Constraints

Add constraints such as `UNIQUE`, `NOT NULL`, or `DEFAULT` to ensure data integrity and enforce specific rules on column values.

### 6. Custom Enums

Create custom enumerations (Enums) for columns that require predefined sets of values. Enums can also include notes for additional information.

### 7. Visual Flow

View tables, columns, and relationships visually as nodes and edges, offering a comprehensive and intuitive understanding of the database schema.

### 8. Schema Export

Export the entire schema design as a .txt file with a simple click, allowing easy sharing or further use in other applications.

### 9. Docs Available

Comprehensive documentation is provided to guide users on how to use Schema Flow, including syntax explanations and feature details.

## Installation

**1. Clone the Repository**

```
git clone https://github.com/Gagan-Saini-GS/schemaflow.git
cd schema-flow
```

**2. Install Dependencies**

```
npm install
```

**3. Run the Application**

```
npm start
```

This will start the application on your local machine.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Contributing

Contributions are welcome! Please create an issue or pull request if you want to add new features, report bugs, or improve documentation.

## Contact

Schema Flow is built by `Gagan Saini`.

For any questions or feedback, feel free to reach out at `gagansaini10999@gmail.com`.

---
