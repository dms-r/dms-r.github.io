---
title: "Basic OOP Java"
classes: wide
categories: 
  - Java
---

## What is Object-Oriented Programming?

Imagine you're organizing your bedroom. Instead of throwing everything randomly, you group similar items together: clothes in the wardrobe, books on shelves, and electronics on the desk. Object-Oriented Programming works similarly - it organizes code into logical groups called "objects" that work together to solve problems.

Think of OOP as a way to model real-world things in code. Just like how a car has properties (color, model, speed) and behaviors (start, stop, accelerate), objects in programming have attributes (data) and methods (functions).

---

## Chapter 1: Classes and Objects

### Understanding Classes

A **class** is like a blueprint or template. Think of it as a cookie cutter - it defines the shape and structure, but it's not an actual cookie. In programming terms, a class defines what attributes and behaviors objects of that type will have.

```java
// This is our blueprint for creating Car objects
public class Car {
    // Attributes (what a car has)
    String brand;
    String color;
    int year;
    boolean isRunning;
    
    // Methods (what a car can do)
    public void start() {
        isRunning = true;
        System.out.println("The car is now running!");
    }
    
    public void stop() {
        isRunning = false;
        System.out.println("The car has stopped.");
    }
    
    public void displayInfo() {
        System.out.println("Brand: " + brand);
        System.out.println("Color: " + color);
        System.out.println("Year: " + year);
        System.out.println("Running: " + isRunning);
    }
}
```

### Creating Objects

An **object** is an actual instance created from a class. If the class is the cookie cutter, the object is the actual cookie. You can create multiple objects from the same class, each with different values.

```java
public class CarDemo {
    public static void main(String[] args) {
        // Creating objects (instances) of the Car class
        Car myCar = new Car();
        Car friendsCar = new Car();
        
        // Setting attributes for my car
        myCar.brand = "Toyota";
        myCar.color = "Red";
        myCar.year = 2020;
        myCar.isRunning = false;
        
        // Setting attributes for friend's car
        friendsCar.brand = "Honda";
        friendsCar.color = "Blue";
        friendsCar.year = 2019;
        friendsCar.isRunning = false;
        
        // Using methods
        myCar.start();
        myCar.displayInfo();
        
        friendsCar.start();
        friendsCar.displayInfo();
    }
}
```

### Real-World Analogy

Think of a class like a form you fill out at the doctor's office. The form has spaces for name, age, address, etc. The class defines these spaces (attributes). When you fill out the form with your specific information, you create an "instance" or "object" of that form.

---

## Chapter 2: Attributes and Methods

### Attributes (Instance Variables)

Attributes are the characteristics or properties that objects have. They store data that describes the object's state. Think of them as adjectives that describe the object.

```java
public class Student {
    // These are attributes - they describe what a student has
    String name;
    int age;
    String grade;
    double gpa;
    boolean isPresent;
    
    // Every student object will have these attributes,
    // but each student can have different values
}
```

### Methods (Behaviors)

Methods define what objects can do. They are like verbs - actions that the object can perform. Methods can change the object's attributes or perform calculations using them.

```java
public class Student {
    String name;
    int age;
    String grade;
    double gpa;
    boolean isPresent;
    
    // Method to mark attendance
    public void markPresent() {
        isPresent = true;
        System.out.println(name + " is marked present.");
    }
    
    // Method to mark absent
    public void markAbsent() {
        isPresent = false;
        System.out.println(name + " is marked absent.");
    }
    
    // Method to update GPA
    public void updateGPA(double newGPA) {
        if (newGPA >= 0.0 && newGPA <= 4.0) {
            gpa = newGPA;
            System.out.println(name + "'s GPA updated to " + gpa);
        } else {
            System.out.println("Invalid GPA value!");
        }
    }
    
    // Method to display student information
    public void displayStudentInfo() {
        System.out.println("=== Student Information ===");
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Grade: " + grade);
        System.out.println("GPA: " + gpa);
        System.out.println("Present: " + (isPresent ? "Yes" : "No"));
    }
    
    // Method that returns a value
    public boolean isHonorStudent() {
        return gpa >= 3.5;
    }
}
```

### Types of Methods

**Void Methods**: These don't return anything, they just perform an action.
```java
public void sayHello() {
    System.out.println("Hello!");
}
```

**Methods that Return Values**: These calculate something and give back a result.
```java
public double calculateFinalGrade(double midterm, double finalExam) {
    return (midterm * 0.4) + (finalExam * 0.6);
}
```

---

## Chapter 3: Access Specifiers

Access specifiers control who can see and use your class attributes and methods. Think of them like different levels of privacy in your house.

### Public Access

Public means "everyone can access this." It's like your front door - anyone can see it and use it.

```java
public class BankAccount {
    public String accountHolder; // Anyone can see and change this
    
    public void displayBalance() { // Anyone can call this method
        System.out.println("Balance: $" + balance);
    }
}
```

### Private Access

Private means "only this class can access this." It's like your diary - only you should be able to read and write in it.

```java
public class BankAccount {
    private double balance; // Only BankAccount methods can access this
    private String accountNumber; // Hidden from outside access
    
    // Private method - only other methods in this class can call it
    private boolean validateTransaction(double amount) {
        return amount > 0 && amount <= balance;
    }
}
```

### Protected Access (We'll cover this more with inheritance)

Protected is like sharing with family members only. We'll explore this when we learn about inheritance.

### Default (Package-Private) Access

When you don't specify an access modifier, it's package-private. Think of it like sharing with neighbors in your apartment building.

```java
class Rectangle {
    double width;  // Package-private - classes in same package can access
    double height; // Package-private
    
    double calculateArea() { // Package-private method
        return width * height;
    }
}
```

### Why Use Access Specifiers?

```java
public class SmartBankAccount {
    private double balance; // Protected from direct manipulation
    private String accountNumber;
    public String accountHolder;
    
    // Public method to deposit money (with validation)
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited $" + amount);
        } else {
            System.out.println("Invalid deposit amount!");
        }
    }
    
    // Public method to withdraw money (with validation)
    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Withdrew $" + amount);
        } else {
            System.out.println("Invalid withdrawal!");
        }
    }
    
    // Public method to check balance (safe way to access private data)
    public double getBalance() {
        return balance;
    }
}
```

---

## Chapter 4: Static Keyword

The **static** keyword means "belongs to the class itself, not to individual objects." Think of it like shared facilities in a school - the library belongs to the school, not to any particular student.

### Static Variables

Static variables are shared among all objects of a class. There's only one copy, no matter how many objects you create.

```java
public class Student {
    private String name;
    private int age;
    
    // Static variable - shared by all Student objects
    private static int totalStudents = 0;
    private static String schoolName = "Springfield High School";
    
    // Constructor (we'll learn more about this later)
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
        totalStudents++; // Increment the count when a new student is created
    }
    
    // Static method to get total number of students
    public static int getTotalStudents() {
        return totalStudents;
    }
    
    // Static method to get school name
    public static String getSchoolName() {
        return schoolName;
    }
}

// Usage example
public class StudentDemo {
    public static void main(String[] args) {
        System.out.println("Total students: " + Student.getTotalStudents()); // 0
        
        Student alice = new Student("Alice", 16);
        Student bob = new Student("Bob", 17);
        Student carol = new Student("Carol", 16);
        
        // Notice we call static methods on the class name, not objects
        System.out.println("Total students: " + Student.getTotalStudents()); // 3
        System.out.println("School: " + Student.getSchoolName());
    }
}
```

### Static Methods

Static methods belong to the class and can be called without creating an object. They can only directly access static variables and other static methods.

```java
public class MathHelper {
    // Static method - utility function that doesn't need object state
    public static double calculateCircleArea(double radius) {
        return Math.PI * radius * radius;
    }
    
    // Static method for temperature conversion
    public static double celsiusToFahrenheit(double celsius) {
        return (celsius * 9/5) + 32;
    }
    
    // Static method that uses static variable
    private static int calculationCount = 0;
    
    public static int add(int a, int b) {
        calculationCount++;
        return a + b;
    }
    
    public static int getCalculationCount() {
        return calculationCount;
    }
}

// Usage - no need to create MathHelper objects
public class MathDemo {
    public static void main(String[] args) {
        double area = MathHelper.calculateCircleArea(5.0);
        double temp = MathHelper.celsiusToFahrenheit(25.0);
        int sum = MathHelper.add(10, 20);
        
        System.out.println("Circle area: " + area);
        System.out.println("Temperature: " + temp + "°F");
        System.out.println("Sum: " + sum);
        System.out.println("Calculations performed: " + 
                          MathHelper.getCalculationCount());
    }
}
```

### When to Use Static

Use static when:
- The functionality doesn't depend on object state (like utility functions)
- You want to count instances of a class
- You're creating constants that should be shared
- You're making helper methods that work independently

---

## Chapter 5: Final Keyword

The **final** keyword means "cannot be changed." It's like writing in permanent ink - once set, it stays that way.

### Final Variables (Constants)

Final variables can only be assigned once. Think of them as mathematical constants like π.

```java
public class Circle {
    private double radius;
    
    // Final variable - this value never changes
    private static final double PI = 3.14159;
    
    // Final instance variable - set once per object
    private final String color;
    
    public Circle(double radius, String color) {
        this.radius = radius;
        this.color = color; // Can only set this once
    }
    
    public double calculateArea() {
        return PI * radius * radius;
    }
    
    public String getColor() {
        return color; // color cannot be changed after object creation
    }
    
    // This would cause an error:
    // public void changeColor(String newColor) {
    //     color = newColor; // ERROR: Cannot assign to final variable
    // }
}
```

### Final Methods

Final methods cannot be overridden by subclasses (we'll learn about this in inheritance).

```java
public class Vehicle {
    protected String brand;
    
    // This method can be overridden by subclasses
    public void start() {
        System.out.println("Vehicle starting...");
    }
    
    // This method CANNOT be overridden by subclasses
    public final void displayBrand() {
        System.out.println("Brand: " + brand);
    }
}
```

### Final Classes

Final classes cannot be extended (cannot have subclasses).

```java
// This class cannot be extended
public final class MathConstants {
    public static final double PI = 3.14159;
    public static final double E = 2.71828;
    
    // Private constructor prevents instantiation
    private MathConstants() {
    }
}

// This would cause an error:
// public class ExtendedMath extends MathConstants { // ERROR!
// }
```

---

## Chapter 6: Nested Classes

Sometimes it makes sense to define a class inside another class. Think of it like having a specialized tool that only makes sense in the context of a particular job.

### Inner Classes

```java
public class Computer {
    private String brand;
    private Processor processor; // Using the inner class
    
    public Computer(String brand, String processorType, double speed) {
        this.brand = brand;
        this.processor = new Processor(processorType, speed);
    }
    
    // Inner class - closely related to Computer
    public class Processor {
        private String type;
        private double speed;
        
        public Processor(String type, double speed) {
            this.type = type;
            this.speed = speed;
        }
        
        public void displayInfo() {
            // Inner class can access outer class variables
            System.out.println("Computer: " + brand);
            System.out.println("Processor: " + type + " @ " + speed + "GHz");
        }
    }
    
    public void displayComputerInfo() {
        System.out.println("Computer Brand: " + brand);
        processor.displayInfo();
    }
}
```

### Static Nested Classes

Static nested classes don't need a reference to the outer class instance.

```java
public class School {
    private String name;
    
    // Static nested class
    public static class Address {
        private String street;
        private String city;
        private String zipCode;
        
        public Address(String street, String city, String zipCode) {
            this.street = street;
            this.city = city;
            this.zipCode = zipCode;
        }
        
        public String getFullAddress() {
            return street + ", " + city + " " + zipCode;
        }
    }
}

// Usage
public class SchoolDemo {
    public static void main(String[] args) {
        // Can create Address without creating School instance
        School.Address schoolAddress = new School.Address(
            "123 Education St", "Learning City", "12345");
        
        System.out.println(schoolAddress.getFullAddress());
    }
}
```

---

## Chapter 7: Packages

Packages are like folders for organizing your Java classes. Just like you organize files in folders on your computer, packages help organize related classes together.

### Creating and Using Packages

```java
// File: com/school/student/Student.java
package com.school.student;

public class Student {
    private String name;
    private int grade;
    
    public Student(String name, int grade) {
        this.name = name;
        this.grade = grade;
    }
    
    public void displayInfo() {
        System.out.println("Student: " + name + ", Grade: " + grade);
    }
}

// File: com/school/teacher/Teacher.java
package com.school.teacher;

public class Teacher {
    private String name;
    private String subject;
    
    public Teacher(String name, String subject) {
        this.name = name;
        this.subject = subject;
    }
    
    public void displayInfo() {
        System.out.println("Teacher: " + name + ", Subject: " + subject);
    }
}

// File: com/school/SchoolDemo.java
package com.school;

// Importing classes from other packages
import com.school.student.Student;
import com.school.teacher.Teacher;

public class SchoolDemo {
    public static void main(String[] args) {
        Student student = new Student("Alice", 10);
        Teacher teacher = new Teacher("Mr. Smith", "Mathematics");
        
        student.displayInfo();
        teacher.displayInfo();
    }
}
```

### Package Benefits

1. **Organization**: Related classes are grouped together
2. **Name Conflicts**: Different packages can have classes with the same name
3. **Access Control**: Package-private access provides another level of encapsulation
4. **Distribution**: Packages make it easier to distribute and reuse code

---

## Summary and Best Practices

As we wrap up this introduction to Java OOP basics, remember these key principles:

**Encapsulation**: Keep related data and methods together in classes, and use appropriate access specifiers to protect your data.

**Organization**: Use packages to organize your code logically, and choose meaningful names for your classes, methods, and variables.

**Reusability**: Write methods and classes that can be reused. Static methods are great for utility functions that don't depend on object state.

**Immutability**: Use final for values that shouldn't change, which makes your code more predictable and safer.

### Practice Exercise

Try creating a simple Library Management System with the following classes:

1. **Book** class with attributes (title, author, ISBN, isAvailable) and methods (borrow, return, displayInfo)
2. **Library** class that manages a collection of books
3. **LibraryMember** class for people who can borrow books

Think about what should be public, private, static, or final in your design. Consider how these classes should interact with each other.

The next part of your OOP journey will cover more advanced topics like inheritance, polymorphism, and interfaces. These concepts build upon what you've learned here, so make sure you're comfortable with classes, objects, methods, and access control before moving forward.

Remember: programming is like learning a musical instrument - it takes practice to become fluent. Don't worry if everything doesn't click immediately. Keep experimenting with code, and these concepts will become second nature over time!
