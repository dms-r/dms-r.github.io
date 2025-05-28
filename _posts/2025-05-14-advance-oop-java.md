---
title:  "Advance OOP Java"
date:   2000-04-09
categories: [Java, Backend]
tags: [OOP]
---

## 1. Object Lifecycle

### What is Object Lifecycle?
Object lifecycle refers to the stages an object goes through from creation to destruction in memory.

### Stages of Object Lifecycle:

#### 1. **Object Creation**
```java
public class Student {
    private String name;
    private int age;
    
    // Constructor
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
        System.out.println("Student object created: " + name);
    }
}

// Creating objects
Student student1 = new Student("Alice", 16); // Object created
Student student2 = new Student("Bob", 17);   // Another object created
```

#### 2. **Object Usage**
```java
// Using the objects
student1.setAge(17);
System.out.println(student1.getName());
```

#### 3. **Object Destruction (Garbage Collection)**
```java
public class Student {
    // Finalizer method (called before garbage collection)
    protected void finalize() throws Throwable {
        System.out.println("Student object being destroyed: " + name);
        super.finalize();
    }
}

// When objects go out of scope or are set to null
student1 = null; // Object eligible for garbage collection
student2 = null; // Another object eligible for garbage collection
// Garbage collector will eventually clean up these objects
```

#### Complete Example:
```java
public class LifecycleDemo {
    public static void main(String[] args) {
        // Creation phase
        Student student = new Student("Charlie", 15);
        
        // Usage phase
        student.study();
        student.setAge(16);
        
        // Destruction phase (setting to null makes it eligible for GC)
        student = null;
        
        // Suggest garbage collection (not guaranteed to run immediately)
        System.gc();
    }
}
```

---

## 2. Inheritance

### What is Inheritance?
Inheritance allows a class to inherit properties and methods from another class. It promotes code reusability and establishes an "is-a" relationship.

### Types of Inheritance:

#### 1. **Single Inheritance**
```java
// Parent class (Superclass)
public class Animal {
    protected String name;
    protected int age;
    
    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public void eat() {
        System.out.println(name + " is eating");
    }
    
    public void sleep() {
        System.out.println(name + " is sleeping");
    }
}

// Child class (Subclass)
public class Dog extends Animal {
    private String breed;
    
    public Dog(String name, int age, String breed) {
        super(name, age); // Call parent constructor
        this.breed = breed;
    }
    
    public void bark() {
        System.out.println(name + " is barking");
    }
    
    // Override parent method
    @Override
    public void eat() {
        System.out.println(name + " the dog is eating dog food");
    }
}
```

#### 2. **Multilevel Inheritance**
```java
// Grandparent class
public class Vehicle {
    protected String brand;
    
    public void start() {
        System.out.println("Vehicle started");
    }
}

// Parent class
public class Car extends Vehicle {
    protected int doors;
    
    public void drive() {
        System.out.println("Car is driving");
    }
}

// Child class
public class ElectricCar extends Car {
    private int batteryCapacity;
    
    public void charge() {
        System.out.println("Electric car is charging");
    }
}
```

#### 3. **Hierarchical Inheritance**
```java
// Parent class
public class Shape {
    protected String color;
    
    public void draw() {
        System.out.println("Drawing a shape");
    }
}

// Multiple child classes
public class Circle extends Shape {
    private double radius;
    
    public void calculateArea() {
        System.out.println("Calculating circle area");
    }
}

public class Rectangle extends Shape {
    private double length, width;
    
    public void calculateArea() {
        System.out.println("Calculating rectangle area");
    }
}

public class Triangle extends Shape {
    private double base, height;
    
    public void calculateArea() {
        System.out.println("Calculating triangle area");
    }
}
```

### Key Concepts:
- **super** keyword: Access parent class methods and constructors
- **@Override** annotation: Indicates method overriding
- **protected** access modifier: Accessible to subclasses

---

## 3. Abstraction

### What is Abstraction?
Abstraction hides complex implementation details and shows only essential features. It's implemented using abstract classes and interfaces.

### Abstract Classes:
```java
// Abstract class
public abstract class Shape {
    protected String color;
    
    // Concrete method
    public void setColor(String color) {
        this.color = color;
    }
    
    // Abstract method (must be implemented by subclasses)
    public abstract double calculateArea();
    
    // Abstract method
    public abstract double calculatePerimeter();
    
    // Concrete method that uses abstract methods
    public void displayInfo() {
        System.out.println("Shape color: " + color);
        System.out.println("Area: " + calculateArea());
        System.out.println("Perimeter: " + calculatePerimeter());
    }
}

// Concrete class implementing abstract class
public class Circle extends Shape {
    private double radius;
    
    public Circle(double radius) {
        this.radius = radius;
    }
    
    @Override
    public double calculateArea() {
        return Math.PI * radius * radius;
    }
    
    @Override
    public double calculatePerimeter() {
        return 2 * Math.PI * radius;
    }
}

public class Rectangle extends Shape {
    private double length, width;
    
    public Rectangle(double length, double width) {
        this.length = length;
        this.width = width;
    }
    
    @Override
    public double calculateArea() {
        return length * width;
    }
    
    @Override
    public double calculatePerimeter() {
        return 2 * (length + width);
    }
}
```

### Usage Example:
```java
public class AbstractionDemo {
    public static void main(String[] args) {
        // Cannot instantiate abstract class
        // Shape shape = new Shape(); // This would cause an error
        
        // Create concrete objects
        Shape circle = new Circle(5.0);
        Shape rectangle = new Rectangle(4.0, 6.0);
        
        circle.setColor("Red");
        circle.displayInfo();
        
        rectangle.setColor("Blue");
        rectangle.displayInfo();
    }
}
```

---

## 4. Method Chaining

### What is Method Chaining?
Method chaining allows multiple method calls on the same object in a single statement by returning the object itself.

### Implementation:
```java
public class Student {
    private String name;
    private int age;
    private String grade;
    private String subject;
    
    // Constructor
    public Student() {}
    
    // Method chaining - each method returns 'this'
    public Student setName(String name) {
        this.name = name;
        return this; // Return current object
    }
    
    public Student setAge(int age) {
        this.age = age;
        return this;
    }
    
    public Student setGrade(String grade) {
        this.grade = grade;
        return this;
    }
    
    public Student setSubject(String subject) {
        this.subject = subject;
        return this;
    }
    
    public Student study() {
        System.out.println(name + " is studying " + subject);
        return this;
    }
    
    public Student displayInfo() {
        System.out.println("Name: " + name + ", Age: " + age + 
                          ", Grade: " + grade + ", Subject: " + subject);
        return this;
    }
}
```

### Usage Example:
```java
public class MethodChainingDemo {
    public static void main(String[] args) {
        // Method chaining in action
        Student student = new Student()
            .setName("Alice")
            .setAge(16)
            .setGrade("10th")
            .setSubject("Mathematics")
            .study()
            .displayInfo();
            
        // Another example with StringBuilder (built-in method chaining)
        String result = new StringBuilder()
            .append("Hello ")
            .append("World")
            .append("!")
            .toString();
        System.out.println(result);
    }
}
```

### Builder Pattern Example:
```java
public class Computer {
    private String cpu;
    private String ram;
    private String storage;
    private String gpu;
    
    private Computer(Builder builder) {
        this.cpu = builder.cpu;
        this.ram = builder.ram;
        this.storage = builder.storage;
        this.gpu = builder.gpu;
    }
    
    // Builder class
    public static class Builder {
        private String cpu;
        private String ram;
        private String storage;
        private String gpu;
        
        public Builder setCpu(String cpu) {
            this.cpu = cpu;
            return this;
        }
        
        public Builder setRam(String ram) {
            this.ram = ram;
            return this;
        }
        
        public Builder setStorage(String storage) {
            this.storage = storage;
            return this;
        }
        
        public Builder setGpu(String gpu) {
            this.gpu = gpu;
            return this;
        }
        
        public Computer build() {
            return new Computer(this);
        }
    }
    
    @Override
    public String toString() {
        return "Computer{" +
                "cpu='" + cpu + '\'' +
                ", ram='" + ram + '\'' +
                ", storage='" + storage + '\'' +
                ", gpu='" + gpu + '\'' +
                '}';
    }
}

// Usage
Computer computer = new Computer.Builder()
    .setCpu("Intel i7")
    .setRam("16GB")
    .setStorage("1TB SSD")
    .setGpu("NVIDIA GTX 1660")
    .build();
```

---

## 5. Encapsulation

### What is Encapsulation?
Encapsulation is the bundling of data and methods that operate on that data within a single unit (class), and restricting access to some components.

### Principles of Encapsulation:

#### 1. **Data Hiding:**
```java
public class BankAccount {
    // Private fields (hidden from outside)
    private String accountNumber;
    private double balance;
    private String accountHolder;
    
    // Constructor
    public BankAccount(String accountNumber, String accountHolder) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = 0.0;
    }
    
    // Public methods to access private data (Getters)
    public String getAccountNumber() {
        return accountNumber;
    }
    
    public double getBalance() {
        return balance;
    }
    
    public String getAccountHolder() {
        return accountHolder;
    }
    
    // Public methods to modify private data (Setters with validation)
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: $" + amount);
        } else {
            System.out.println("Invalid deposit amount");
        }
    }
    
    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Withdrawn: $" + amount);
        } else {
            System.out.println("Invalid withdrawal amount or insufficient balance");
        }
    }
    
    // Private helper method (not accessible from outside)
    private void logTransaction(String type, double amount) {
        System.out.println("Transaction: " + type + " - $" + amount);
    }
}
```

#### 2. **Access Modifiers:**
```java
public class EncapsulationExample {
    public String publicField;        // Accessible everywhere
    protected String protectedField;  // Accessible in same package and subclasses
    String packageField;              // Accessible in same package only
    private String privateField;      // Accessible only within this class
    
    public void publicMethod() {
        // Anyone can call this
    }
    
    protected void protectedMethod() {
        // Subclasses and same package can call this
    }
    
    void packageMethod() {
        // Same package can call this
    }
    
    private void privateMethod() {
        // Only this class can call this
    }
}
```

#### 3. **Benefits of Encapsulation:**
```java
public class Student {
    private String name;
    private int age;
    private double gpa;
    
    // Controlled access through methods
    public void setAge(int age) {
        if (age >= 0 && age <= 150) {  // Validation
            this.age = age;
        } else {
            throw new IllegalArgumentException("Invalid age");
        }
    }
    
    public void setGpa(double gpa) {
        if (gpa >= 0.0 && gpa <= 4.0) {  // Validation
            this.gpa = gpa;
        } else {
            throw new IllegalArgumentException("GPA must be between 0.0 and 4.0");
        }
    }
    
    // Read-only property (no setter)
    public String getAcademicStatus() {
        if (gpa >= 3.5) return "Excellent";
        else if (gpa >= 3.0) return "Good";
        else if (gpa >= 2.0) return "Satisfactory";
        else return "Needs Improvement";
    }
}
```

---

## 6. Interfaces

### What are Interfaces?
Interfaces define a contract that classes must follow. They contain abstract methods and constants that implementing classes must provide.

### Interface Basics:
```java
// Interface definition
public interface Drawable {
    // Public and static by default
    int MAX_SIZE = 1000;
    
    // Abstract methods (public and abstract by default)
    void draw();
    void resize(int size);
    void setColor(String color);
    
    // Default method (Java 8+)
    default void display() {
        System.out.println("Displaying drawable object");
    }
    
    // Static method (Java 8+)
    static void printInfo() {
        System.out.println("This is a drawable interface");
    }
}

// Implementing the interface
public class Circle implements Drawable {
    private double radius;
    private String color;
    
    public Circle(double radius) {
        this.radius = radius;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing a circle with radius " + radius);
    }
    
    @Override
    public void resize(int size) {
        this.radius = size;
        System.out.println("Circle resized to radius " + radius);
    }
    
    @Override
    public void setColor(String color) {
        this.color = color;
        System.out.println("Circle color set to " + color);
    }
}

public class Rectangle implements Drawable {
    private double width, height;
    private String color;
    
    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing rectangle " + width + "x" + height);
    }
    
    @Override
    public void resize(int size) {
        this.width = size;
        this.height = size;
        System.out.println("Rectangle resized to " + size + "x" + size);
    }
    
    @Override
    public void setColor(String color) {
        this.color = color;
        System.out.println("Rectangle color set to " + color);
    }
}
```

### Multiple Interface Implementation:
```java
interface Flyable {
    void fly();
    default void land() {
        System.out.println("Landing...");
    }
}

interface Swimmable {
    void swim();
    default void dive() {
        System.out.println("Diving...");
    }
}

// Class implementing multiple interfaces
public class Duck implements Flyable, Swimmable {
    @Override
    public void fly() {
        System.out.println("Duck is flying");
    }
    
    @Override
    public void swim() {
        System.out.println("Duck is swimming");
    }
}
```

### Interface vs Abstract Class:
```java
// When to use Interface:
interface PaymentProcessor {
    void processPayment(double amount);
    default void sendReceipt() {
        System.out.println("Receipt sent");
    }
}

// When to use Abstract Class:
abstract class Animal {
    protected String name;
    
    public Animal(String name) {
        this.name = name;
    }
    
    // Concrete method
    public void sleep() {
        System.out.println(name + " is sleeping");
    }
    
    // Abstract method
    public abstract void makeSound();
}
```

---

## 7. Enums

### What are Enums?
Enums are special classes that represent a fixed set of constants. They're useful for representing a collection of related constants.

### Basic Enum:
```java
public enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}

public enum Size {
    SMALL, MEDIUM, LARGE, EXTRA_LARGE
}

// Usage
public class EnumBasicExample {
    public static void main(String[] args) {
        Day today = Day.MONDAY;
        Size shirtSize = Size.MEDIUM;
        
        System.out.println("Today is: " + today);
        System.out.println("Shirt size: " + shirtSize);
        
        // Enum comparison
        if (today == Day.MONDAY) {
            System.out.println("It's Monday!");
        }
        
        // Iterating through enum values
        System.out.println("All days:");
        for (Day day : Day.values()) {
            System.out.println(day);
        }
    }
}
```

### Enum with Fields and Methods:
```java
public enum Planet {
    MERCURY(3.303e+23, 2.4397e6),
    VENUS(4.869e+24, 6.0518e6),
    EARTH(5.976e+24, 6.37814e6),
    MARS(6.421e+23, 3.3972e6);
    
    private final double mass;   // in kilograms
    private final double radius; // in meters
    
    // Constructor
    Planet(double mass, double radius) {
        this.mass = mass;
        this.radius = radius;
    }
    
    // Methods
    public double getMass() {
        return mass;
    }
    
    public double getRadius() {
        return radius;
    }
    
    // Calculate surface gravity
    public double surfaceGravity() {
        final double G = 6.67300E-11;
        return G * mass / (radius * radius);
    }
    
    // Calculate weight on this planet
    public double surfaceWeight(double otherMass) {
        return otherMass * surfaceGravity();
    }
}

// Usage
public class PlanetExample {
    public static void main(String[] args) {
        double earthWeight = 75.0; // kg
        double mass = earthWeight / Planet.EARTH.surfaceGravity();
        
        for (Planet planet : Planet.values()) {
            System.out.printf("Your weight on %s is %f kg%n",
                            planet, planet.surfaceWeight(mass));
        }
    }
}
```

### Enum with Abstract Methods:
```java
public enum Operation {
    PLUS("+") {
        public double apply(double x, double y) {
            return x + y;
        }
    },
    MINUS("-") {
        public double apply(double x, double y) {
            return x - y;
        }
    },
    MULTIPLY("*") {
        public double apply(double x, double y) {
            return x * y;
        }
    },
    DIVIDE("/") {
        public double apply(double x, double y) {
            return x / y;
        }
    };
    
    private final String symbol;
    
    Operation(String symbol) {
        this.symbol = symbol;
    }
    
    public abstract double apply(double x, double y);
    
    @Override
    public String toString() {
        return symbol;
    }
}

// Usage
public class OperationExample {
    public static void main(String[] args) {
        double x = 2.0, y = 4.0;
        
        for (Operation op : Operation.values()) {
            System.out.printf("%f %s %f = %f%n",
                            x, op, y, op.apply(x, y));
        }
    }
}
```

### Enum in Switch Statements:
```java
public enum TrafficLight {
    RED, YELLOW, GREEN
}

public class TrafficController {
    public void handleTrafficLight(TrafficLight light) {
        switch (light) {
            case RED:
                System.out.println("Stop!");
                break;
            case YELLOW:
                System.out.println("Caution!");
                break;
            case GREEN:
                System.out.println("Go!");
                break;
            default:
                System.out.println("Unknown traffic light");
        }
    }
}
```

---

## 8. Record

### What are Records?
Records (introduced in Java 14) are special classes designed to hold immutable data. They automatically generate constructor, getters, equals(), hashCode(), and toString() methods.

### Basic Record:
```java
// Traditional class
public class PersonClass {
    private final String name;
    private final int age;
    
    public PersonClass(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String getName() { return name; }
    public int getAge() { return age; }
    
    @Override
    public boolean equals(Object obj) {
        // ... implementation
    }
    
    @Override
    public int hashCode() {
        // ... implementation
    }
    
    @Override
    public String toString() {
        // ... implementation
    }
}

// Same functionality with Record
public record Person(String name, int age) {}

// Usage
public class RecordExample {
    public static void main(String[] args) {
        Person person = new Person("Alice", 25);
        
        // Automatic getters
        System.out.println("Name: " + person.name());
        System.out.println("Age: " + person.age());
        
        // Automatic toString()
        System.out.println(person); // Person[name=Alice, age=25]
        
        // Automatic equals() and hashCode()
        Person person2 = new Person("Alice", 25);
        System.out.println("Equal: " + person.equals(person2)); // true
    }
}
```

### Record with Validation:
```java
public record Student(String name, int age, double gpa) {
    // Compact constructor for validation
    public Student {
        if (name == null || name.isEmpty()) {
            throw new IllegalArgumentException("Name cannot be null or empty");
        }
        if (age < 0 || age > 150) {
            throw new IllegalArgumentException("Invalid age");
        }
        if (gpa < 0.0 || gpa > 4.0) {
            throw new IllegalArgumentException("GPA must be between 0.0 and 4.0");
        }
    }
    
    // Additional methods
    public String getGrade() {
        if (gpa >= 3.5) return "A";
        else if (gpa >= 3.0) return "B";
        else if (gpa >= 2.0) return "C";
        else return "F";
    }
    
    public boolean isHonorStudent() {
        return gpa >= 3.5;
    }
}
```

### Record with Static Methods:
```java
public record Point(double x, double y) {
    // Static factory methods
    public static Point origin() {
        return new Point(0, 0);
    }
    
    public static Point of(double x, double y) {
        return new Point(x, y);
    }
    
    // Instance methods
    public double distanceFromOrigin() {
        return Math.sqrt(x * x + y * y);
    }
    
    public Point translate(double dx, double dy) {
        return new Point(x + dx, y + dy);
    }
}

// Usage
Point p1 = Point.origin();
Point p2 = Point.of(3, 4);
double distance = p2.distanceFromOrigin();
Point p3 = p2.translate(1, 1);
```

### Nested Records:
```java
public record Address(String street, String city, String zipCode) {}

public record Customer(String name, String email, Address address) {
    // Method using nested record
    public String getFullAddress() {
        return address.street() + ", " + address.city() + " " + address.zipCode();
    }
}

// Usage
Address address = new Address("123 Main St", "Springfield", "12345");
Customer customer = new Customer("John Doe", "john@email.com", address);
System.out.println(customer.getFullAddress());
```

---

## 9. Method Overloading / Overriding

### Method Overloading
Method overloading allows multiple methods with the same name but different parameters in the same class.

#### Rules for Method Overloading:
1. Same method name
2. Different parameter list (number, type, or order)
3. Return type can be different
4. Access modifiers can be different

```java
public class Calculator {
    // Overloaded add methods
    public int add(int a, int b) {
        System.out.println("Adding two integers");
        return a + b;
    }
    
    public double add(double a, double b) {
        System.out.println("Adding two doubles");
        return a + b;
    }
    
    public int add(int a, int b, int c) {
        System.out.println("Adding three integers");
        return a + b + c;
    }
    
    public String add(String a, String b) {
        System.out.println("Concatenating two strings");
        return a + b;
    }
    
    // Overloaded constructors
    public Calculator() {
        System.out.println("Default calculator created");
    }
    
    public Calculator(String brand) {
        System.out.println("Calculator created with brand: " + brand);
    }
}

// Usage
public class OverloadingExample {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        
        System.out.println(calc.add(5, 3));           // Calls int version
        System.out.println(calc.add(5.5, 3.2));      // Calls double version
        System.out.println(calc.add(1, 2, 3));       // Calls three-parameter version
        System.out.println(calc.add("Hello", "World")); // Calls String version
    }
}
```

### Method Overriding
Method overriding allows a subclass to provide a specific implementation of a method already defined in its parent class.

#### Rules for Method Overriding:
1. Same method name
2. Same parameter list
3. Same or covariant return type
4. Cannot have more restrictive access modifier
5. Cannot override static, final, or private methods

```java
// Parent class
public class Animal {
    public void makeSound() {
        System.out.println("The animal makes a sound");
    }
    
    public void sleep() {
        System.out.println("The animal sleeps");
    }
    
    public Animal reproduce() {
        return new Animal();
    }
}

// Child class
public class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("The dog barks: Woof! Woof!");
    }
    
    // Covariant return type (Dog is subtype of Animal)
    @Override
    public Dog reproduce() {
        return new Dog();
    }
    
    // Additional method specific to Dog
    public void wagTail() {
        System.out.println("The dog wags its tail");
    }
}

public class Cat extends Animal {
    @Override
    public void makeSound() {
        System.out.println("The cat meows: Meow!");
    }
}
```

### Polymorphism with Overriding:
```java
public class PolymorphismExample {
    public static void main(String[] args) {
        // Polymorphism: parent reference, child objects
        Animal[] animals = {
            new Dog(),
            new Cat(),
            new Animal()
        };
        
        // Method calls are resolved at runtime (dynamic binding)
        for (Animal animal : animals) {
            animal.makeSound(); // Calls overridden version for Dog and Cat
            animal.sleep();     // Calls inherited version for all
        }
        
        // Demonstrating covariant return types
        Animal animal = new Dog();
        Animal offspring = animal.reproduce(); // Returns Dog object
    }
}
```

### Abstract Methods and Overriding:
```java
abstract class Shape {
    protected String color;
    
    public abstract double calculateArea();  // Must be overridden
    public abstract void draw();            // Must be overridden
    
    public void setColor(String color) {    // Can be inherited or overridden
        this.color = color;
    }
}

class Circle extends Shape {
    private double radius;
    
    public Circle(double radius) {
        this.radius = radius;
    }
    
    @Override
    public double calculateArea() {
        return Math.PI * radius * radius;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing a circle with radius " + radius);
    }
}
```

---

## 10. Initializer Block

### What are Initializer Blocks?
Initializer blocks are code blocks that execute when an object is created, before constructors run.

### Types of Initializer Blocks:

#### 1. **Instance Initializer Block:**
```java
public class Student {
    private String name;
    private int id;
    private static int nextId = 1;
    
    // Instance initializer block
    {
        System.out.println("Instance initializer block executed");
        id = nextId++;
        System.out.println("Assigned ID: " + id);
    }
    
    // Constructor
    public Student(String name) {
        System.out.println("Constructor called");
        this.name = name;
    }
    
    public Student() {
        this("Unknown");
    }
    
    public void displayInfo() {
        System.out.println("Student: " + name + ", ID: " + id);
    }
}

// Usage
public class InitializerExample {
    public static void main(String[] args) {
        System.out.println("Creating first student:");
        Student student1 = new Student("Alice");
        student1.displayInfo();
        
        System.out.println("\nCreating second student:");
        Student student2 = new Student("Bob");
        student2.displayInfo();
    }
}
```

#### 2. **Static Initializer Block:**
```java
public class DatabaseConnection {
    private static String databaseUrl;
    private static String username;
    private static String password;
    
    // Static initializer block - runs once when class is first loaded
    static {
        System.out.println("Static initializer block executed");
        databaseUrl = "jdbc:mysql://localhost:3306/school";
        username = "admin";
        password = "password123";
        System.out.println("Database configuration loaded");
    }
    
    // Instance initializer block - runs every time an object is created
    {
        System.out.println("Instance initializer: Preparing connection");
    }
    
    private String connectionId;
    
    public DatabaseConnection() {
        this.connectionId = "CONN_" + System.currentTimeMillis();
        System.out.println("Database connection created: " + connectionId);
    }
    
    public static void displayConfig() {
        System.out.println("Database URL: " + databaseUrl);
        System.out.println("Username: " + username);
    }
}
```

#### 3. **Multiple Initializer Blocks:**
```java
public class InitializerOrder {
    private String name;
    private int value;
    
    // First instance initializer block
    {
        System.out.println("First instance initializer block");
        name = "Default";
    }
    
    // Static initializer block
    static {
        System.out.println("Static initializer block");
    }
    
    // Second instance initializer block
    {
        System.out.println("Second instance initializer block");
        value = 100;
    }
    
    // Constructor
    public InitializerOrder(String name) {
        System.out.println("Constructor called");
        this.name = name;
    }
    
    public void display() {
        System.out.println("Name: " + name + ", Value: " + value);
    }
}

// Execution order demonstration
public class ExecutionOrderDemo {
    public static void main(String[] args) {
        System.out.println("Main method starts");
        InitializerOrder obj1 = new InitializerOrder("Object1");
        obj1.display();
        
        System.out.println("\nCreating second object:");
        InitializerOrder obj2 = new InitializerOrder("Object2");
        obj2.display();
    }
}
/* 
Output:
Main method starts
Static initializer block
First instance initializer block
Second instance initializer block
Constructor called
Name: Object1, Value: 100

Creating second object:
First instance initializer block
Second instance initializer block
Constructor called
Name: Object2, Value: 100
*/
```

#### 4. **Practical Example - Logger Setup:**
```java
public class Logger {
    private static boolean isConfigured = false;
    private String loggerName;
    
    // Static initializer - configure logging system once
    static {
        System.out.println("Configuring logging system...");
        // Simulate reading configuration from file
        isConfigured = true;
        System.out.println("Logging system configured");
    }
    
    // Instance initializer - setup for each logger instance
    {
        if (!isConfigured) {
            throw new RuntimeException("Logging system not configured");
        }
        System.out.println("Setting up logger instance");
    }
    
    public Logger(String name) {
        this.loggerName = name;
        System.out.println("Logger created: " + loggerName);
    }
    
    public void log(String message) {
        System.out.println("[" + loggerName + "] " + message);
    }
}
```

---

## 11. Static vs Dynamic Binding

### What is Binding?
Binding is the association of a method call with the method body. It determines which method to execute when there are multiple methods with the same name.

### Static Binding (Early Binding):
Static binding occurs at compile time. It's used for private, static, and final methods.

```java
public class StaticBindingExample {
    // Static method - resolved at compile time
    public static void display() {
        System.out.println("Static method in StaticBindingExample");
    }
    
    // Private method - resolved at compile time
    private void privateMethod() {
        System.out.println("Private method");
    }
    
    // Final method - resolved at compile time
    public final void finalMethod() {
        System.out.println("Final method");
    }
    
    public void callPrivateMethod() {
        privateMethod(); // Static binding
    }
}

class ChildClass extends StaticBindingExample {
    // Cannot override static method (hiding, not overriding)
    public static void display() {
        System.out.println("Static method in ChildClass");
    }
    
    // Cannot override final method - compile error if you try
    // public void finalMethod() { } // This would cause compilation error
    
    // Cannot override private method - this is a new method
    private void privateMethod() {
        System.out.println("Private method in ChildClass");
    }
}

public class StaticBindingDemo {
    public static void main(String[] args) {
        StaticBindingExample parent = new StaticBindingExample();
        StaticBindingExample child = new ChildClass();
        
        // Static binding - methods resolved at compile time
        parent.display();     // Calls StaticBindingExample.display()
        child.display();      // Calls StaticBindingExample.display() (not ChildClass)
        
        // Reference type determines which static method is called
        StaticBindingExample.display();  // Parent class method
        ChildClass.display();            // Child class method
        
        parent.finalMethod();  // Final method - static binding
        child.finalMethod();   // Same final method - static binding
    }
}
```

### Dynamic Binding (Late Binding):
Dynamic binding occurs at runtime. It's used for overridden methods (polymorphism).

```java
// Parent class
class Animal {
    public void makeSound() {
        System.out.println("Animal makes a sound");
    }
    
    public void move() {
        System.out.println("Animal moves");
    }
    
    public static void staticMethod() {
        System.out.println("Static method in Animal");
    }
}

// Child classes
class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Dog barks: Woof!");
    }
    
    @Override
    public void move() {
        System.out.println("Dog runs");
    }
    
    public void wagTail() {
        System.out.println("Dog wags tail");
    }
    
    public static void staticMethod() {
        System.out.println("Static method in Dog");
    }
}

class Cat extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Cat meows: Meow!");
    }
    
    @Override
    public void move() {
        System.out.println("Cat prowls");
    }
    
    public void climb() {
        System.out.println("Cat climbs");
    }
}

public class DynamicBindingDemo {
    public static void main(String[] args) {
        // Dynamic binding demonstration
        Animal[] animals = {
            new Animal(),
            new Dog(),
            new Cat()
        };
        
        System.out.println("=== Dynamic Binding (Runtime Resolution) ===");
        for (Animal animal : animals) {
            // Method resolved at runtime based on actual object type
            animal.makeSound(); // Dynamic binding
            animal.move();      // Dynamic binding
            System.out.println();
        }
        
        System.out.println("=== Static Binding vs Dynamic Binding ===");
        Animal animalRef = new Dog();
        Dog dogRef = new Dog();
        
        // Dynamic binding - overridden methods
        animalRef.makeSound(); // Calls Dog's makeSound() - runtime resolution
        dogRef.makeSound();    // Calls Dog's makeSound()
        
        // Static binding - static methods
        animalRef.staticMethod(); // Calls Animal's staticMethod() - compile time
        dogRef.staticMethod();    // Calls Dog's staticMethod()
        
        // Compile-time error - method not available in reference type
        // animalRef.wagTail(); // Error: Animal reference cannot access Dog-specific methods
        dogRef.wagTail(); // OK: Dog reference can access Dog methods
    }
}
```

### Binding in Practice:
```java
interface Shape {
    void draw();
    double calculateArea();
    
    // Default method
    default void displayInfo() {
        System.out.println("Shape area: " + calculateArea());
    }
}

class Rectangle implements Shape {
    private double width, height;
    
    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing rectangle: " + width + "x" + height);
    }
    
    @Override
    public double calculateArea() {
        return width * height;
    }
}

class Circle implements Shape {
    private double radius;
    
    public Circle(double radius) {
        this.radius = radius;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing circle with radius: " + radius);
    }
    
    @Override
    public double calculateArea() {
        return Math.PI * radius * radius;
    }
    
    // Override default method
    @Override
    public void displayInfo() {
        System.out.println("Circle area: " + calculateArea() + 
                          " (circumference: " + (2 * Math.PI * radius) + ")");
    }
}

public class BindingWithInterfaces {
    public static void processShape(Shape shape) {
        // All these method calls use dynamic binding
        shape.draw();          // Resolved at runtime
        shape.displayInfo();   // Resolved at runtime
        System.out.println("Area: " + shape.calculateArea()); // Resolved at runtime
    }
    
    public static void main(String[] args) {
        Shape[] shapes = {
            new Rectangle(5, 3),
            new Circle(4)
        };
        
        for (Shape shape : shapes) {
            processShape(shape);
            System.out.println();
        }
    }
}
```

---

## 12. Pass by Value / Pass by Reference

### Java Parameter Passing
Java uses **pass by value** for all parameters, but the behavior differs for primitives and objects.

### Pass by Value (Primitives):
```java
public class PassByValuePrimitives {
    public static void modifyPrimitive(int number) {
        System.out.println("Inside method, before: " + number);
        number = 100; // This only changes the local copy
        System.out.println("Inside method, after: " + number);
    }
    
    public static void modifyPrimitives(int a, double b, boolean c) {
        a = 999;
        b = 88.88;
        c = !c;
        System.out.println("Inside method: a=" + a + ", b=" + b + ", c=" + c);
    }
    
    public static void main(String[] args) {
        int originalNumber = 50;
        System.out.println("Before method call: " + originalNumber);
        
        modifyPrimitive(originalNumber);
        
        System.out.println("After method call: " + originalNumber); // Still 50
        
        // Multiple primitives
        int x = 10;
        double y = 3.14;
        boolean z = true;
        
        System.out.println("\nBefore: x=" + x + ", y=" + y + ", z=" + z);
        modifyPrimitives(x, y, z);
        System.out.println("After: x=" + x + ", y=" + y + ", z=" + z); // Unchanged
    }
}
```

### Pass by Value (Object References):
```java
class Student {
    private String name;
    private int age;
    
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // Getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
    
    @Override
    public String toString() {
        return "Student{name='" + name + "', age=" + age + "}";
    }
}

public class PassByValueObjects {
    // Modifying object's state through reference
    public static void modifyStudentState(Student student) {
        System.out.println("Inside method, before: " + student);
        student.setName("Modified Name");
        student.setAge(999);
        System.out.println("Inside method, after: " + student);
    }
    
    // Trying to reassign the reference (won't affect original)
    public static void reassignReference(Student student) {
        System.out.println("Inside reassign, before: " + student);
        student = new Student("New Student", 25); // Only changes local reference
        System.out.println("Inside reassign, after: " + student);
    }
    
    // Working with arrays (reference types)
    public static void modifyArray(int[] array) {
        System.out.println("Inside method, array before: " + java.util.Arrays.toString(array));
        array[0] = 999; // Modifies the actual array
        System.out.println("Inside method, array after: " + java.util.Arrays.toString(array));
    }
    
    public static void reassignArray(int[] array) {
        System.out.println("Inside reassign, before: " + java.util.Arrays.toString(array));
        array = new int[]{100, 200, 300}; // Only changes local reference
        System.out.println("Inside reassign, after: " + java.util.Arrays.toString(array));
    }
    
    public static void main(String[] args) {
        // Object state modification
        Student originalStudent = new Student("Alice", 20);
        System.out.println("Original before: " + originalStudent);
        
        modifyStudentState(originalStudent);
        System.out.println("Original after state modification: " + originalStudent);
        
        // Reference reassignment
        System.out.println("\n--- Reference Reassignment ---");
        reassignReference(originalStudent);
        System.out.println("Original after reassignment attempt: " + originalStudent);
        
        // Array example
        System.out.println("\n--- Array Examples ---");
        int[] numbers = {1, 2, 3, 4, 5};
        System.out.println("Original array: " + java.util.Arrays.toString(numbers));
        
        modifyArray(numbers);
        System.out.println("After modification: " + java.util.Arrays.toString(numbers));
        
        reassignArray(numbers);
        System.out.println("After reassignment attempt: " + java.util.Arrays.toString(numbers));
    }
}
```

### String Special Case:
```java
public class StringPassByValue {
    public static void modifyString(String str) {
        System.out.println("Inside method, before: " + str);
        str = "Modified String"; // Creates new String object, doesn't affect original
        System.out.println("Inside method, after: " + str);
    }
    
    public static void modifyStringBuilder(StringBuilder sb) {
        System.out.println("Inside method, before: " + sb);
        sb.append(" - Modified"); // Modifies the actual StringBuilder object
        System.out.println("Inside method, after: " + sb);
    }
    
    public static void reassignStringBuilder(StringBuilder sb) {
        System.out.println("Inside reassign, before: " + sb);
        sb = new StringBuilder("New StringBuilder"); // Only changes local reference
        System.out.println("Inside reassign, after: " + sb);
    }
    
    public static void main(String[] args) {
        // String (immutable)
        String originalString = "Original String";
        System.out.println("Before: " + originalString);
        modifyString(originalString);
        System.out.println("After: " + originalString); // Unchanged
        
        // StringBuilder (mutable)
        StringBuilder originalSB = new StringBuilder("Original StringBuilder");
        System.out.println("\nBefore: " + originalSB);
        modifyStringBuilder(originalSB);
        System.out.println("After modification: " + originalSB); // Changed
        
        reassignStringBuilder(originalSB);
        System.out.println("After reassignment: " + originalSB); // Unchanged by reassignment
    }
}
```

### Wrapper Classes and Autoboxing:
```java
public class WrapperClassPassing {
    public static void modifyInteger(Integer num) {
        System.out.println("Inside method, before: " + num);
        num = 999; // Creates new Integer object, doesn't affect original
        System.out.println("Inside method, after: " + num);
    }
    
    public static void modifyIntegerList(java.util.List<Integer> list) {
        System.out.println("Inside method, before: " + list);
        list.set(0, 999); // Modifies the list content
        list.add(777);     // Adds to the list
        System.out.println("Inside method, after: " + list);
    }
    
    public static void main(String[] args) {
        // Integer wrapper (immutable like String)
        Integer originalInt = 42;
        System.out.println("Before: " + originalInt);
        modifyInteger(originalInt);
        System.out.println("After: " + originalInt); // Unchanged
        
        // List of Integers (mutable collection)
        java.util.List<Integer> numbers = new java.util.ArrayList<>();
        numbers.add(1);
        numbers.add(2);
        numbers.add(3);
        
        System.out.println("\nBefore: " + numbers);
        modifyIntegerList(numbers);
        System.out.println("After: " + numbers); // Changed
    }
}
```

### Best Practices Summary:

#### **Key Points to Remember:**

1. **Primitives**: Always passed by value - changes inside methods don't affect originals
2. **Objects**: Reference passed by value - can modify object state but can't reassign the reference
3. **Immutable Objects** (String, Integer, etc.): Behave like primitives - can't be modified
4. **Arrays and Collections**: Can modify contents but can't reassign the reference
5. **Method Design**: Be careful when methods modify object state vs. creating new objects

```java
// Good practice: Return new object instead of modifying parameter
public static Student createModifiedStudent(Student original, String newName) {
    return new Student(newName, original.getAge());
}

// Alternative: Clearly document that method modifies the object
/**
 * Modifies the student's name in place.
 * @param student Student object to modify (will be changed)
 * @param newName New name to set
 */
public static void updateStudentName(Student student, String newName) {
    student.setName(newName);
}
```

---

## Practice Exercises

### Exercise 1: Advanced Inheritance
Create a hierarchy: `Vehicle` → `MotorVehicle` → `Car` and `Motorcycle`. Implement proper constructors, method overriding, and demonstrate polymorphism.

### Exercise 2: Interface Implementation
Create interfaces `Flyable`, `Swimmable`, and `Walkable`. Implement them in appropriate animal classes and demonstrate multiple interface implementation.

### Exercise 3: Enum with Methods
Create a `Grade` enum (A, B, C, D, F) with methods to:
- Get GPA equivalent
- Check if passing grade
- Get next/previous grade

### Exercise 4: Record Usage
Create a `Book` record with validation, additional methods, and demonstrate immutability.

### Exercise 5: Method Chaining Builder
Create a `Computer.Builder` class using method chaining to build computer configurations.

### Exercise 6: Abstract Class vs Interface
Design both an abstract class and interface for drawing shapes. Explain when to use each.

### Exercise 7: Binding Demonstration
Create examples showing static vs dynamic binding with inheritance and interfaces.

### Exercise 8: Parameter Passing
Write methods that demonstrate the difference between modifying object state vs reassigning references.

---

## Conclusion

This guide covers advanced OOP concepts that build upon basic Java knowledge. Understanding these concepts is crucial for:

- Writing maintainable and scalable code
- Implementing design patterns effectively
- Understanding framework architectures
- Preparing for advanced Java topics

### Key Takeaways:
- **Encapsulation** protects data and provides controlled access
- **Inheritance** promotes code reuse through "is-a" relationships
- **Polymorphism** allows treating different objects uniformly
- **Abstraction** hides complexity and defines contracts
- **Understanding binding** helps predict program behavior
- **Parameter passing** behavior differs for primitives vs objects

Remember: Object-Oriented Programming is about modeling real-world concepts in code. Practice thinking in terms of objects, their relationships, and responsibilities!
