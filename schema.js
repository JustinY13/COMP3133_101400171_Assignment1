const { gql } = require('apollo-server-express');

const schema = gql `
    type Users{
        username: String!
        email: String!
        password: String!
    }
    
    type Employees{
        first_name: String!
        last_name: String!
        email: String
        gender: String
        designation: String
        salary: Float!
        date_of_joining: String!
        department: String!
        employee_photo: String
    }


    type Query{
        users: [Users]
        user(id: ID!): Users
        login(username: String!, password: String!): String
        employees: [Employees]
        employee(id: ID!): Employees
        searchEmployeesByDesignationOrDepartment(keywordSearch: String!): [Employees]
    }

    type Mutation {
         addUser(
            username: String!
            email: String!
            password: String!
            created_at: String
            updated_at: String
        ): Users

        addEmployee(
            first_name: String!
            last_name: String!
            email: String
            gender: String
            designation: String
            salary: Float!
            date_of_joining: String!
            department: String!
            employee_photo: String
        ): Employees

        updateEmployee(
            id: ID!
            first_name: String!
            last_name: String!
            email: String
            gender: String
            designation: String
            salary: Float!
            date_of_joining: String!
            department: String!
            employee_photo: String
        ): Employees

        deleteEmployee(id: ID!): Employees

        searchEmployee(
            id: ID!
            first_name: String!
            last_name: String!
            email: String
            gender: String
            designation: String
            salary: Float!
            date_of_joining: String!
            department: String!
            employee_photo: String
        ): Employees

    }
`

module.exports = schema