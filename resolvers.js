const Employee = require('./models/Employees')
const User = require('./models/Users');

const resolver = {
    Query: {

        // Find All User in the database
        users: async (parent, args, contextValue, info) => {
            return await User.find()
        },

        // Query to Login User and Validate Password
        login: async (_, { username, password }) => {

                if (!username) {
                    return "Username is required!"
                }
                if (!password) {
                    return "Password is required!"
                }

                const user = await User.findOne({ username: username }); 
                // If the user is found and the password is correct, return login successful
                if (user && await user.comparePassword(password)) {
                    return "Login successful"
                }
                else {
                    return "Username or password is invalid"
                }
        }, 

        // Find user by id
        user: async (_, { id }) => {
            return await User.findById(id)
        }, 

        // Find all employees
        employees: async (parent, args, contextValue, info) => {
            return await Employee.find()
        },

        // Find employee by id
        employee: async (_, { id }) => {
            return await Employee.findById(id)
        }, 

        // Search Employee by designation or departtment
        searchEmployeesByDesignationOrDepartment: async (_, { keywordSearch }) => {
                const employees = await Employee.find({
                    $or: [
                        { designation: { $regex: keywordSearch, $options: "i" } },
                        { department: { $regex: keywordSearch, $options: "i" } }
                    ]
                });
                return employees
        },
    },
    Mutation: {
        // Add a new user
        addUser: async (_, args) => {
            const newUser = new User({
                username: args.username,
                email: args.email,
                password: args.password
            })

            const users = await newUser.save()
            return users

        },

        // Add new employee to database 
        addEmployee: async (_, args) => {
            const newEmployee = new Employee({
                first_name: args.first_name,
                last_name: args.last_name,
                email: args.email,
                gender: args.gender,
                designation: args.designation,
                salary: args.salary,
                date_of_joining: args.date_of_joining,
                department: args.department,
                employee_photo: args.employee_photo
            })

            const employees = await newEmployee.save()
            return employees
        },

        // Update employee by id
        updateEmployee: async (_, { id, first_name, last_name, email, gender, designation, salary, date_of_joining, department, employee_photo}) => {
            const employee = await Employee.findById(id);
            if (!employee) return null;
            if (first_name) employee.first_name = first_name;
            if (last_name) employee.last_name = last_name;
            if (email) employee.email = email;
            if (gender) employee.gender = gender;
            if (designation) employee.designation = designation;
            if (salary) employee.salary = salary;
            if (date_of_joining) employee.date_of_joining = date_of_joining;
            if (department) employee.department = department;
            if (employee_photo) employee.employee_photo = employee_photo
            return await employee.save();
        },

        // Delete employee by id
        deleteEmployee: async (_, { id }) => {
            const employee = await Employee.findById(id);
            if (!employee) return null;
            await employee.remove(); 
            return employee;
        },
    }
}

module.exports = resolver