---
title:  "Java Exeption Handling to File Operation"
date:   2025-05-28
categories: [Java, Backend]
tags: [Other]
---

## Exception Handling

### What are Exceptions?
Think of exceptions as unexpected events that happen while your program is running - like trying to divide by zero or opening a file that doesn't exist. Java provides a way to handle these situations gracefully instead of letting your program crash.

### Types of Exceptions

#### 1. Checked Exceptions
These are exceptions that Java forces you to handle at compile time.
```java
// Example: FileNotFoundException
import java.io.*;

public class CheckedExceptionExample {
    public static void main(String[] args) {
        try {
            FileReader file = new FileReader("nonexistent.txt");
        } catch (FileNotFoundException e) {
            System.out.println("File not found: " + e.getMessage());
        }
    }
}
```

#### 2. Unchecked Exceptions (Runtime Exceptions)
These happen during program execution and don't need to be declared.
```java
public class UncheckedExceptionExample {
    public static void main(String[] args) {
        try {
            int result = 10 / 0; // ArithmeticException
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero!");
        }
    }
}
```

### The Try-Catch-Finally Block

```java
public class ExceptionHandlingExample {
    public static void main(String[] args) {
        try {
            // Code that might throw an exception
            String text = null;
            int length = text.length(); // NullPointerException
            
        } catch (NullPointerException e) {
            // Handle the specific exception
            System.out.println("Null pointer error: " + e.getMessage());
            
        } catch (Exception e) {
            // Handle any other exception
            System.out.println("General error: " + e.getMessage());
            
        } finally {
            // This block always executes
            System.out.println("Cleanup code goes here");
        }
    }
}
```

### Creating Custom Exceptions

```java
// Custom exception class
class StudentNotFoundException extends Exception {
    public StudentNotFoundException(String message) {
        super(message);
    }
}

// Using the custom exception
public class CustomExceptionExample {
    public static Student findStudent(int id) throws StudentNotFoundException {
        if (id <= 0) {
            throw new StudentNotFoundException("Student ID must be positive");
        }
        // Simulate student not found
        throw new StudentNotFoundException("Student with ID " + id + " not found");
    }
    
    public static void main(String[] args) {
        try {
            Student student = findStudent(-1);
        } catch (StudentNotFoundException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

---

## Lambda Expressions

### What are Lambda Expressions?
Lambda expressions are a way to write short, anonymous functions. Think of them as a more concise way to write simple methods.

### Basic Syntax
```
(parameters) -> expression
(parameters) -> { statements; }
```

### Simple Examples

#### 1. Basic Lambda
```java
import java.util.*;
import java.util.function.*;

public class LambdaBasics {
    public static void main(String[] args) {
        // Traditional way
        Runnable traditionalRunnable = new Runnable() {
            @Override
            public void run() {
                System.out.println("Hello from traditional runnable");
            }
        };
        
        // Lambda way
        Runnable lambdaRunnable = () -> System.out.println("Hello from lambda");
        
        // Execute both
        traditionalRunnable.run();
        lambdaRunnable.run();
    }
}
```

#### 2. Lambda with Parameters
```java
import java.util.function.*;

public class LambdaWithParameters {
    public static void main(String[] args) {
        // Lambda that takes two integers and returns their sum
        BinaryOperator<Integer> add = (a, b) -> a + b;
        System.out.println("5 + 3 = " + add.apply(5, 3));
        
        // Lambda that takes a string and returns its length
        Function<String, Integer> stringLength = s -> s.length();
        System.out.println("Length of 'Hello': " + stringLength.apply("Hello"));
        
        // Lambda that checks if a number is even
        Predicate<Integer> isEven = n -> n % 2 == 0;
        System.out.println("Is 4 even? " + isEven.test(4));
    }
}
```

#### 3. Lambda with Collections
```java
import java.util.*;
import java.util.stream.*;

public class LambdaWithCollections {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "Diana");
        
        // Print all names (traditional way)
        System.out.println("Traditional way:");
        for (String name : names) {
            System.out.println(name);
        }
        
        // Print all names (lambda way)
        System.out.println("\nLambda way:");
        names.forEach(name -> System.out.println(name));
        
        // Filter and print names starting with 'A'
        System.out.println("\nNames starting with 'A':");
        names.stream()
             .filter(name -> name.startsWith("A"))
             .forEach(System.out::println);
        
        // Transform names to uppercase
        System.out.println("\nUppercase names:");
        names.stream()
             .map(name -> name.toUpperCase())
             .forEach(System.out::println);
    }
}
```

### Functional Interfaces
```java
// Custom functional interface
@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);
}

public class FunctionalInterfaceExample {
    public static void main(String[] args) {
        // Different implementations using lambda
        Calculator addition = (a, b) -> a + b;
        Calculator subtraction = (a, b) -> a - b;
        Calculator multiplication = (a, b) -> a * b;
        Calculator division = (a, b) -> a / b;
        
        System.out.println("10 + 5 = " + addition.calculate(10, 5));
        System.out.println("10 - 5 = " + subtraction.calculate(10, 5));
        System.out.println("10 * 5 = " + multiplication.calculate(10, 5));
        System.out.println("10 / 5 = " + division.calculate(10, 5));
    }
}
```

---

## Annotations

### What are Annotations?
Annotations are metadata that provide information about your code to the compiler, development tools, or runtime environment. Think of them as labels or notes attached to your code.

### Built-in Annotations

#### 1. @Override
```java
class Animal {
    public void makeSound() {
        System.out.println("Some generic animal sound");
    }
}

class Dog extends Animal {
    @Override // This ensures we're actually overriding the parent method
    public void makeSound() {
        System.out.println("Woof!");
    }
    
    // This would cause a compile error because there's no method to override
    // @Override
    // public void makeSoun() { // Note the typo
    //     System.out.println("Woof!");
    // }
}
```

#### 2. @Deprecated
```java
public class DeprecatedExample {
    @Deprecated
    public void oldMethod() {
        System.out.println("This method is deprecated");
    }
    
    public void newMethod() {
        System.out.println("Use this method instead");
    }
    
    public static void main(String[] args) {
        DeprecatedExample example = new DeprecatedExample();
        example.oldMethod(); // Compiler will show a warning
        example.newMethod();
    }
}
```

#### 3. @SuppressWarnings
```java
import java.util.*;

public class SuppressWarningsExample {
    @SuppressWarnings("unchecked")
    public void demonstrateRawTypes() {
        List rawList = new ArrayList(); // Raw type usage
        rawList.add("Hello");
        rawList.add(123);
        
        // Without @SuppressWarnings, this would generate compiler warnings
    }
}
```

### Creating Custom Annotations

#### 1. Simple Custom Annotation
```java
import java.lang.annotation.*;

// Define the annotation
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@interface StudentInfo {
    String name();
    int grade() default 12;
    String school() default "Unknown";
}

// Use the annotation
public class CustomAnnotationExample {
    @StudentInfo(name = "John Doe", grade = 11, school = "Central High")
    public void studentMethod1() {
        System.out.println("This is student method 1");
    }
    
    @StudentInfo(name = "Jane Smith") // Using default values for grade and school
    public void studentMethod2() {
        System.out.println("This is student method 2");
    }
}
```

#### 2. Processing Annotations at Runtime
```java
import java.lang.reflect.*;

public class AnnotationProcessor {
    public static void main(String[] args) {
        Class<?> clazz = CustomAnnotationExample.class;
        Method[] methods = clazz.getDeclaredMethods();
        
        for (Method method : methods) {
            if (method.isAnnotationPresent(StudentInfo.class)) {
                StudentInfo info = method.getAnnotation(StudentInfo.class);
                System.out.println("Method: " + method.getName());
                System.out.println("Student Name: " + info.name());
                System.out.println("Grade: " + info.grade());
                System.out.println("School: " + info.school());
                System.out.println("---");
            }
        }
    }
}
```

---

## Modules

### What are Modules?
Modules (introduced in Java 9) are a way to organize your code into logical groups and control which parts are accessible to other modules. Think of modules as containers that hold related packages and classes.

### Creating a Simple Module

#### 1. Module Structure
```
my-app/
├── src/
│   └── com.example.myapp/
│       ├── module-info.java
│       └── com/
│           └── example/
│               └── myapp/
│                   └── Main.java
```

#### 2. module-info.java
```java
// module-info.java
module com.example.myapp {
    // This module doesn't require any other modules beyond java.base
    // java.base is automatically included
    
    // If we needed other modules:
    // requires java.logging;
    // requires java.sql;
    
    // Export packages that other modules can use
    exports com.example.myapp;
}
```

#### 3. Main.java
```java
// com/example/myapp/Main.java
package com.example.myapp;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from modular Java application!");
    }
}

public class MathUtils {
    public static int add(int a, int b) {
        return a + b;
    }
    
    public static int multiply(int a, int b) {
        return a * b;
    }
}
```

### Module with Dependencies

#### 1. Math Module
```java
// math-module/src/com.example.math/module-info.java
module com.example.math {
    exports com.example.math.operations;
}
```

```java
// math-module/src/com.example.math/com/example/math/operations/Calculator.java
package com.example.math.operations;

public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
    
    public int subtract(int a, int b) {
        return a - b;
    }
    
    public double divide(double a, double b) {
        if (b == 0) {
            throw new IllegalArgumentException("Cannot divide by zero");
        }
        return a / b;
    }
}
```

#### 2. App Module (uses Math Module)
```java
// app-module/src/com.example.app/module-info.java
module com.example.app {
    requires com.example.math;
}
```

```java
// app-module/src/com.example.app/com/example/app/Application.java
package com.example.app;

import com.example.math.operations.Calculator;

public class Application {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        
        System.out.println("5 + 3 = " + calc.add(5, 3));
        System.out.println("10 - 4 = " + calc.subtract(10, 4));
        System.out.println("15 / 3 = " + calc.divide(15, 3));
    }
}
```

---

## Optionals

### What are Optionals?
Optional is a container that may or may not contain a value. It's Java's way of avoiding null pointer exceptions and making your code more explicit about when values might be absent.

### Creating Optionals

```java
import java.util.Optional;

public class OptionalBasics {
    public static void main(String[] args) {
        // Creating an empty Optional
        Optional<String> emptyOptional = Optional.empty();
        
        // Creating an Optional with a value
        Optional<String> nameOptional = Optional.of("John");
        
        // Creating an Optional that might be null
        String possibleNull = null;
        Optional<String> nullableOptional = Optional.ofNullable(possibleNull);
        
        System.out.println("Empty optional: " + emptyOptional);
        System.out.println("Name optional: " + nameOptional);
        System.out.println("Nullable optional: " + nullableOptional);
    }
}
```

### Working with Optionals

#### 1. Checking if Value is Present
```java
import java.util.Optional;

public class OptionalChecking {
    public static void main(String[] args) {
        Optional<String> name = Optional.of("Alice");
        Optional<String> emptyName = Optional.empty();
        
        // Check if value is present
        if (name.isPresent()) {
            System.out.println("Name is: " + name.get());
        }
        
        // Better way using ifPresent
        name.ifPresent(n -> System.out.println("Hello, " + n));
        
        // Check if empty
        if (emptyName.isEmpty()) {
            System.out.println("No name provided");
        }
    }
}
```

#### 2. Providing Default Values
```java
import java.util.Optional;

public class OptionalDefaults {
    public static void main(String[] args) {
        Optional<String> name = Optional.empty();
        
        // Provide default value
        String actualName = name.orElse("Anonymous");
        System.out.println("Name: " + actualName);
        
        // Provide default using supplier (lazy evaluation)
        String lazyDefault = name.orElseGet(() -> "Generated at " + System.currentTimeMillis());
        System.out.println("Lazy default: " + lazyDefault);
        
        // Throw exception if empty
        try {
            String requiredName = name.orElseThrow(() -> new IllegalArgumentException("Name is required"));
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

#### 3. Transforming Optional Values
```java
import java.util.Optional;

public class OptionalTransformation {
    public static void main(String[] args) {
        Optional<String> name = Optional.of("john doe");
        
        // Transform the value if present
        Optional<String> upperCaseName = name.map(String::toUpperCase);
        System.out.println("Uppercase: " + upperCaseName.orElse("No name"));
        
        // Chain transformations
        Optional<Integer> nameLength = name
            .map(String::trim)
            .map(String::length);
        System.out.println("Name length: " + nameLength.orElse(0));
        
        // Filter values
        Optional<String> longName = name.filter(n -> n.length() > 5);
        System.out.println("Long name: " + longName.orElse("Name is too short"));
    }
}
```

### Practical Example: User Service
```java
import java.util.*;

class User {
    private String name;
    private String email;
    private int age;
    
    public User(String name, String email, int age) {
        this.name = name;
        this.email = email;
        this.age = age;
    }
    
    // Getters
    public String getName() { return name; }
    public String getEmail() { return email; }
    public int getAge() { return age; }
    
    @Override
    public String toString() {
        return "User{name='" + name + "', email='" + email + "', age=" + age + "}";
    }
}

class UserService {
    private List<User> users = Arrays.asList(
        new User("Alice", "alice@email.com", 25),
        new User("Bob", "bob@email.com", 30),
        new User("Charlie", "charlie@email.com", 22)
    );
    
    public Optional<User> findUserByName(String name) {
        return users.stream()
                   .filter(user -> user.getName().equalsIgnoreCase(name))
                   .findFirst();
    }
    
    public Optional<User> findUserByAge(int age) {
        return users.stream()
                   .filter(user -> user.getAge() == age)
                   .findFirst();
    }
}

public class OptionalPracticalExample {
    public static void main(String[] args) {
        UserService userService = new UserService();
        
        // Find existing user
        Optional<User> alice = userService.findUserByName("Alice");
        alice.ifPresentOrElse(
            user -> System.out.println("Found user: " + user),
            () -> System.out.println("User not found")
        );
        
        // Find non-existing user
        Optional<User> david = userService.findUserByName("David");
        String message = david
            .map(User::getName)
            .map(name -> "Hello, " + name)
            .orElse("User not found, please register");
        System.out.println(message);
        
        // Chain operations
        userService.findUserByAge(25)
                  .filter(user -> user.getEmail().contains("@"))
                  .map(User::getEmail)
                  .ifPresent(email -> System.out.println("Valid email found: " + email));
    }
}
```

---

## Dependency Injection

### What is Dependency Injection?
Dependency Injection (DI) is a design pattern where objects receive their dependencies from external sources rather than creating them internally. Think of it as having someone else provide what you need instead of making it yourself.

### Manual Dependency Injection

#### 1. Without Dependency Injection (Tightly Coupled)
```java
// Tightly coupled - hard to test and modify
class EmailService {
    public void sendEmail(String to, String message) {
        System.out.println("Sending email to " + to + ": " + message);
    }
}

class NotificationService {
    private EmailService emailService;
    
    public NotificationService() {
        this.emailService = new EmailService(); // Tightly coupled!
    }
    
    public void notify(String user, String message) {
        emailService.sendEmail(user + "@example.com", message);
    }
}
```

#### 2. With Dependency Injection (Loosely Coupled)
```java
// Define interfaces for flexibility
interface MessageService {
    void sendMessage(String to, String message);
}

class EmailService implements MessageService {
    @Override
    public void sendMessage(String to, String message) {
        System.out.println("Sending email to " + to + ": " + message);
    }
}

class SMSService implements MessageService {
    @Override
    public void sendMessage(String to, String message) {
        System.out.println("Sending SMS to " + to + ": " + message);
    }
}

// Notification service now depends on abstraction
class NotificationService {
    private MessageService messageService;
    
    // Constructor injection
    public NotificationService(MessageService messageService) {
        this.messageService = messageService;
    }
    
    // Setter injection
    public void setMessageService(MessageService messageService) {
        this.messageService = messageService;
    }
    
    public void notify(String user, String message) {
        messageService.sendMessage(user, message);
    }
}

public class DependencyInjectionExample {
    public static void main(String[] args) {
        // We can now easily switch between implementations
        MessageService emailService = new EmailService();
        MessageService smsService = new SMSService();
        
        NotificationService notifier1 = new NotificationService(emailService);
        notifier1.notify("john@example.com", "Hello via Email!");
        
        NotificationService notifier2 = new NotificationService(smsService);
        notifier2.notify("+1234567890", "Hello via SMS!");
    }
}
```

### Simple DI Container
```java
import java.util.*;
import java.util.function.Supplier;

// Simple DI Container
class DIContainer {
    private Map<Class<?>, Supplier<?>> services = new HashMap<>();
    
    public <T> void register(Class<T> serviceClass, Supplier<T> supplier) {
        services.put(serviceClass, supplier);
    }
    
    @SuppressWarnings("unchecked")
    public <T> T resolve(Class<T> serviceClass) {
        Supplier<T> supplier = (Supplier<T>) services.get(serviceClass);
        if (supplier == null) {
            throw new IllegalArgumentException("Service not registered: " + serviceClass.getName());
        }
        return supplier.get();
    }
}

// Example services
interface DatabaseService {
    void save(String data);
}

class MySQLDatabase implements DatabaseService {
    @Override
    public void save(String data) {
        System.out.println("Saving to MySQL: " + data);
    }
}

class PostgreSQLDatabase implements DatabaseService {
    @Override
    public void save(String data) {
        System.out.println("Saving to PostgreSQL: " + data);
    }
}

class UserRepository {
    private DatabaseService database;
    
    public UserRepository(DatabaseService database) {
        this.database = database;
    }
    
    public void saveUser(String userData) {
        database.save(userData);
    }
}

public class SimpleDIContainerExample {
    public static void main(String[] args) {
        DIContainer container = new DIContainer();
        
        // Register services
        container.register(DatabaseService.class, MySQLDatabase::new);
        container.register(UserRepository.class, () -> {
            DatabaseService db = container.resolve(DatabaseService.class);
            return new UserRepository(db);
        });
        
        // Resolve and use services
        UserRepository userRepo = container.resolve(UserRepository.class);
        userRepo.saveUser("John Doe, age 25");
        
        // Switch to different database implementation
        container.register(DatabaseService.class, PostgreSQLDatabase::new);
        UserRepository userRepo2 = container.resolve(UserRepository.class);
        userRepo2.saveUser("Jane Smith, age 30");
    }
}
```

---

## I/O Operations

### What are I/O Operations?
I/O (Input/Output) operations allow your program to read data from external sources (like keyboard, files, network) and write data to external destinations (like console, files, network).

### Console I/O

#### 1. Reading from Console
```java
import java.util.Scanner;
import java.io.*;

public class ConsoleIO {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter your name: ");
        String name = scanner.nextLine();
        
        System.out.print("Enter your age: ");
        int age = scanner.nextInt();
        
        System.out.print("Enter your GPA: ");
        double gpa = scanner.nextDouble();
        
        System.out.println("\n--- Student Information ---");
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("GPA: " + gpa);
        
        scanner.close();
    }
}
```

#### 2. Using BufferedReader
```java
import java.io.*;

public class BufferedReaderExample {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        
        System.out.print("Enter a sentence: ");
        String sentence = reader.readLine();
        
        System.out.print("Enter a number: ");
        String numberStr = reader.readLine();
        int number = Integer.parseInt(numberStr);
        
        System.out.println("You entered: " + sentence);
        System.out.println("Number squared: " + (number * number));
        
        reader.close();
    }
}
```

### Stream Operations

#### 1. Byte Streams
```java
import java.io.*;

public class ByteStreamExample {
    public static void main(String[] args) {
        // Writing bytes to a file
        try (FileOutputStream fos = new FileOutputStream("data.bin")) {
            String data = "Hello, World!";
            fos.write(data.getBytes());
            System.out.println("Data written to file");
        } catch (IOException e) {
            System.out.println("Error writing file: " + e.getMessage());
        }
        
        // Reading bytes from a file
        try (FileInputStream fis = new FileInputStream("data.bin")) {
            int byteData;
            System.out.print("Reading from file: ");
            while ((byteData = fis.read()) != -1) {
                System.out.print((char) byteData);
            }
            System.out.println();
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
        }
    }
}
```

#### 2. Character Streams
```java
import java.io.*;

public class CharacterStreamExample {
    public static void main(String[] args) {
        // Writing characters to a file
        try (FileWriter writer = new FileWriter("text.txt")) {
            writer.write("Hello, Java I/O!\n");
            writer.write("This is character stream example.\n");
            writer.write("Line 3 of the file.");
            System.out.println("Text written to file");
        } catch (IOException e) {
            System.out.println("Error writing file: " + e.getMessage());
        }
        
        // Reading characters from a file
        try (FileReader reader = new FileReader("text.txt")) {
            int charData;
            System.out.println("Reading from file:");
            while ((charData = reader.read()) != -1) {
                System.out.print((char) charData);
            }
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
        }
    }
}
```

#### 3. Buffered Streams
```java
import java.io.*;

public class BufferedStreamExample {
    public static void main(String[] args) {
        // Buffered writing (more efficient for large data)
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("buffered.txt"))) {
            for (int i = 1; i <= 1000; i++) {
                writer.write("Line " + i + ": This is a sample line.\n");
            }
            System.out.println("1000 lines written efficiently using BufferedWriter");
        } catch (IOException e) {
            System.out.println("Error writing file: " + e.getMessage());
        }
        
        // Buffered reading
        try (BufferedReader reader = new BufferedReader(new FileReader("buffered.txt"))) {
            String line;
            int lineCount = 0;
            System.out.println("First 5 lines from the file:");
            while ((line = reader.readLine()) != null && lineCount < 5) {
                System.out.println(line);
                lineCount++;
            }
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
        }
    }
}
```

### Object Serialization
```java
import java.io.*;

// Class must implement Serializable
class Student implements Serializable {
    private String name;
    private int age;
    private double gpa;
    
    public Student(String name, int age, double gpa) {
        this.name = name;
        this.age = age;
        this.gpa = gpa;
    }
    
    @Override
    public String toString() {
        return "Student{name='" + name + "', age=" + age + ", gpa=" + gpa + "}";
    }
}

public class SerializationExample {
    public static void main(String[] args) {
        Student student = new Student("Alice Johnson", 20, 3.8);
        
        // Serialize object to file
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("student.ser"))) {
            oos.writeObject(student);
            System.out.println("Student object serialized successfully");
        } catch (IOException e) {
            System.out.println("Error serializing: " + e.getMessage());
        }
        
        // Deserialize object from file
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream("student.ser"))) {
            Student deserializedStudent = (Student) ois.readObject();
            System.out.println("Deserialized student: " + deserializedStudent);
        } catch (IOException | ClassNotFoundException e) {
            System.out.println("Error deserializing: " + e.getMessage());
        }
    }
}
```

---

## File Operations

### Basic File Operations

#### 1. Creating and Checking Files
```java
import java.io.*;
import java.nio.file.*;

public class BasicFileOperations {
    public static void main(String[] args) {
        // Using File class (older approach)
        File file1 = new File("example.txt");
        
        try {
            // Create new file
            if (file1.createNewFile()) {
                System.out.println("File created: " + file1.getName());
            } else {
                System.out.println("File already exists");
            }
            
            // Check file properties
            System.out.println("File exists: " + file1.exists());
            System.out.println("File name: " + file1.getName());
            System.out.println("Absolute path: " + file1.getAbsolutePath());
            System.out.println("File size: " + file1.length() + " bytes");
            System.out.println("Can read: " + file1.canRead());
            System.out.println("Can write: " + file1.canWrite());
            System.out.println("Is directory: " + file1.isDirectory());
            System.out.println("Is file: " + file1.isFile());
            
        } catch (IOException e) {
            System.out.println("Error creating file: " + e.getMessage());
        }
        
        // Using Path and Files (newer approach - Java 7+)
        Path path = Paths.get("modern_example.txt");
        
        try {
            // Create file if it doesn't exist
            if (!Files.exists(path)) {
                Files.createFile(path);
                System.out.println("File created using modern approach");
            }
            
            // Check file attributes
            System.out.println("File size: " + Files.size(path) + " bytes");
            System.out.println("Is readable: " + Files.isReadable(path));
            System.out.println("Is writable: " + Files.isWritable(path));
            System.out.println("Is executable: " + Files.isExecutable(path));
            
        } catch (IOException e) {
            System.out.println("Error with modern file operations: " + e.getMessage());
        }
    }
}
```

#### 2. Reading and Writing Files
```java
import java.io.*;
import java.nio.file.*;
import java.util.List;
import java.util.Arrays;

public class FileReadWrite {
    public static void main(String[] args) {
        String fileName = "student_data.txt";
        
        // Writing to file using traditional approach
        try (PrintWriter writer = new PrintWriter(new FileWriter(fileName))) {
            writer.println("Student Records");
            writer.println("================");
            writer.println("Alice Johnson, Age: 20, GPA: 3.8");
            writer.println("Bob Smith, Age: 19, GPA: 3.6");
            writer.println("Charlie Brown, Age: 21, GPA: 3.9");
            System.out.println("Data written to file successfully");
        } catch (IOException e) {
            System.out.println("Error writing to file: " + e.getMessage());
        }
        
        // Reading from file using traditional approach
        System.out.println("\nReading file using BufferedReader:");
        try (BufferedReader reader = new BufferedReader(new FileReader(fileName))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
        }
        
        // Modern approach using Files class
        Path filePath = Paths.get(fileName);
        
        // Write using Files.write()
        List<String> newContent = Arrays.asList(
            "Updated Student Records",
            "=======================",
            "Diana Wilson, Age: 22, GPA: 4.0",
            "Eve Davis, Age: 20, GPA: 3.7"
        );
        
        try {
            Files.write(filePath, newContent, StandardOpenOption.APPEND);
            System.out.println("\nAppended new data using modern approach");
        } catch (IOException e) {
            System.out.println("Error appending to file: " + e.getMessage());
        }
        
        // Read using Files.readAllLines()
        try {
            List<String> allLines = Files.readAllLines(filePath);
            System.out.println("\nReading all lines using modern approach:");
            allLines.forEach(System.out::println);
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
        }
    }
}
```

### Directory Operations

```java
import java.io.*;
import java.nio.file.*;
import java.util.stream.Stream;

public class DirectoryOperations {
    public static void main(String[] args) {
        // Create directories
        try {
            // Create single directory
            Path singleDir = Paths.get("test_folder");
            if (!Files.exists(singleDir)) {
                Files.createDirectory(singleDir);
                System.out.println("Created directory: " + singleDir);
            }
            
            // Create nested directories
            Path nestedDir = Paths.get("parent/child/grandchild");
            Files.createDirectories(nestedDir);
            System.out.println("Created nested directories: " + nestedDir);
            
            // Create some test files
            Files.write(Paths.get("test_folder/file1.txt"), "Content 1".getBytes());
            Files.write(Paths.get("test_folder/file2.txt"), "Content 2".getBytes());
            Files.write(Paths.get("parent/parent_file.txt"), "Parent content".getBytes());
            
        } catch (IOException e) {
            System.out.println("Error creating directories: " + e.getMessage());
        }
        
        // List directory contents
        System.out.println("\nListing contents of test_folder:");
        try (Stream<Path> paths = Files.list(Paths.get("test_folder"))) {
            paths.forEach(path -> {
                try {
                    System.out.println(path.getFileName() + 
                        (Files.isDirectory(path) ? " [Directory]" : " [File - " + Files.size(path) + " bytes]"));
                } catch (IOException e) {
                    System.out.println("Error getting file info: " + e.getMessage());
                }
            });
        } catch (IOException e) {
            System.out.println("Error listing directory: " + e.getMessage());
        }
        
        // Walk directory tree
        System.out.println("\nWalking directory tree from current directory:");
        try (Stream<Path> paths = Files.walk(Paths.get("."))) {
            paths.filter(path -> path.toString().contains("parent") || path.toString().contains("test_folder"))
                 .limit(10) // Limit output for readability
                 .forEach(path -> {
                     try {
                         String indent = "  ".repeat(path.getNameCount() - 1);
                         System.out.println(indent + path.getFileName() + 
                             (Files.isDirectory(path) ? "/" : ""));
                     } catch (Exception e) {
                         System.out.println("Error processing path: " + e.getMessage());
                     }
                 });
        } catch (IOException e) {
            System.out.println("Error walking directory tree: " + e.getMessage());
        }
    }
}
```

### File Copying and Moving

```java
import java.io.*;
import java.nio.file.*;

public class FileCopyMove {
    public static void main(String[] args) {
        try {
            // Create source file
            Path sourceFile = Paths.get("source.txt");
            Files.write(sourceFile, "This is the original content.".getBytes());
            System.out.println("Created source file");
            
            // Copy file
            Path copiedFile = Paths.get("copied.txt");
            Files.copy(sourceFile, copiedFile, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("File copied successfully");
            
            // Move/rename file
            Path movedFile = Paths.get("moved.txt");
            Files.move(copiedFile, movedFile, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("File moved/renamed successfully");
            
            // Copy directory
            Path sourceDir = Paths.get("source_directory");
            Path targetDir = Paths.get("target_directory");
            
            Files.createDirectories(sourceDir);
            Files.write(sourceDir.resolve("file_in_dir.txt"), "File inside directory".getBytes());
            
            // Note: Files.copy() only copies the directory, not its contents
            // For recursive copy, you need to walk the tree
            copyDirectoryRecursively(sourceDir, targetDir);
            System.out.println("Directory copied recursively");
            
            // Verify copied content
            System.out.println("\nVerifying copied content:");
            System.out.println("Original file content: " + new String(Files.readAllBytes(sourceFile)));
            System.out.println("Moved file content: " + new String(Files.readAllBytes(movedFile)));
            System.out.println("Copied directory file content: " + 
                new String(Files.readAllBytes(targetDir.resolve("file_in_dir.txt"))));
            
        } catch (IOException e) {
            System.out.println("Error in file operations: " + e.getMessage());
        }
    }
    
    public static void copyDirectoryRecursively(Path source, Path target) throws IOException {
        Files.walk(source)
             .forEach(sourcePath -> {
                 try {
                     Path targetPath = target.resolve(source.relativize(sourcePath));
                     if (Files.isDirectory(sourcePath)) {
                         Files.createDirectories(targetPath);
                     } else {
                         Files.copy(sourcePath, targetPath, StandardCopyOption.REPLACE_EXISTING);
                     }
                 } catch (IOException e) {
                     System.out.println("Error copying: " + e.getMessage());
                 }
             });
    }
}
```

### Working with CSV Files

```java
import java.io.*;
import java.nio.file.*;
import java.util.*;

class Student {
    private String name;
    private int age;
    private double gpa;
    private String major;
    
    public Student(String name, int age, double gpa, String major) {
        this.name = name;
        this.age = age;
        this.gpa = gpa;
        this.major = major;
    }
    
    // Getters
    public String getName() { return name; }
    public int getAge() { return age; }
    public double getGpa() { return gpa; }
    public String getMajor() { return major; }
    
    // Convert to CSV line
    public String toCSV() {
        return String.join(",", name, String.valueOf(age), String.valueOf(gpa), major);
    }
    
    // Create from CSV line
    public static Student fromCSV(String csvLine) {
        String[] parts = csvLine.split(",");
        return new Student(parts[0], Integer.parseInt(parts[1]), 
                          Double.parseDouble(parts[2]), parts[3]);
    }
    
    @Override
    public String toString() {
        return String.format("Student{name='%s', age=%d, gpa=%.2f, major='%s'}", 
                           name, age, gpa, major);
    }
}

public class CSVFileOperations {
    public static void main(String[] args) {
        String csvFile = "students.csv";
        
        // Create sample student data
        List<Student> students = Arrays.asList(
            new Student("Alice Johnson", 20, 3.8, "Computer Science"),
            new Student("Bob Smith", 19, 3.6, "Mathematics"),
            new Student("Charlie Brown", 21, 3.9, "Physics"),
            new Student("Diana Wilson", 22, 4.0, "Engineering"),
            new Student("Eve Davis", 20, 3.7, "Biology")
        );
        
        // Write students to CSV file
        writeStudentsToCSV(students, csvFile);
        
        // Read students from CSV file
        List<Student> loadedStudents = readStudentsFromCSV(csvFile);
        
        // Display loaded students
        System.out.println("Loaded students from CSV:");
        loadedStudents.forEach(System.out::println);
        
        // Perform some operations
        System.out.println("\nStudents with GPA > 3.7:");
        loadedStudents.stream()
                     .filter(s -> s.getGpa() > 3.7)
                     .forEach(System.out::println);
        
        double averageGPA = loadedStudents.stream()
                                        .mapToDouble(Student::getGpa)
                                        .average()
                                        .orElse(0.0);
        System.out.println("\nAverage GPA: " + String.format("%.2f", averageGPA));
    }
    
    public static void writeStudentsToCSV(List<Student> students, String fileName) {
        try (PrintWriter writer = new PrintWriter(new FileWriter(fileName))) {
            // Write header
            writer.println("Name,Age,GPA,Major");
            
            // Write student data
            for (Student student : students) {
                writer.println(student.toCSV());
            }
            
            System.out.println("Successfully wrote " + students.size() + " students to " + fileName);
            
        } catch (IOException e) {
            System.out.println("Error writing CSV file: " + e.getMessage());
        }
    }
    
    public static List<Student> readStudentsFromCSV(String fileName) {
        List<Student> students = new ArrayList<>();
        
        try (BufferedReader reader = new BufferedReader(new FileReader(fileName))) {
            String line;
            boolean isFirstLine = true;
            
            while ((line = reader.readLine()) != null) {
                if (isFirstLine) {
                    isFirstLine = false; // Skip header
                    continue;
                }
                
                try {
                    Student student = Student.fromCSV(line);
                    students.add(student);
                } catch (Exception e) {
                    System.out.println("Error parsing line: " + line + " - " + e.getMessage());
                }
            }
            
            System.out.println("Successfully loaded " + students.size() + " students from " + fileName);
            
        } catch (IOException e) {
            System.out.println("Error reading CSV file: " + e.getMessage());
        }
        
        return students;
    }
}
```

### File Monitoring (Advanced)

```java
import java.io.*;
import java.nio.file.*;
import java.util.concurrent.TimeUnit;

public class FileMonitoring {
    public static void main(String[] args) {
        // Create a directory to monitor
        Path monitoredDir = Paths.get("monitored_folder");
        
        try {
            Files.createDirectories(monitoredDir);
            System.out.println("Created directory to monitor: " + monitoredDir);
            System.out.println("Monitoring for file changes... (Press Ctrl+C to stop)");
            
            // Start monitoring in a separate thread
            Thread monitorThread = new Thread(() -> monitorDirectory(monitoredDir));
            monitorThread.setDaemon(true);
            monitorThread.start();
            
            // Simulate some file operations
            simulateFileOperations(monitoredDir);
            
            // Keep the main thread alive
            Thread.sleep(10000);
            
        } catch (IOException | InterruptedException e) {
            System.out.println("Error in file monitoring: " + e.getMessage());
        }
    }
    
    public static void monitorDirectory(Path directory) {
        try (WatchService watchService = FileSystems.getDefault().newWatchService()) {
            
            directory.register(watchService, 
                StandardWatchEventKinds.ENTRY_CREATE,
                StandardWatchEventKinds.ENTRY_MODIFY,
                StandardWatchEventKinds.ENTRY_DELETE);
            
            while (true) {
                WatchKey key = watchService.take();
                
                for (WatchEvent<?> event : key.pollEvents()) {
                    WatchEvent.Kind<?> kind = event.kind();
                    Path fileName = (Path) event.context();
                    
                    System.out.println("Event: " + kind.name() + " - File: " + fileName);
                    
                    if (kind == StandardWatchEventKinds.ENTRY_CREATE) {
                        System.out.println("  -> New file created: " + fileName);
                    } else if (kind == StandardWatchEventKinds.ENTRY_MODIFY) {
                        System.out.println("  -> File modified: " + fileName);
                    } else if (kind == StandardWatchEventKinds.ENTRY_DELETE) {
                        System.out.println("  -> File deleted: " + fileName);
                    }
                }
                
                if (!key.reset()) {
                    break;
                }
            }
            
        } catch (IOException | InterruptedException e) {
            System.out.println("Error monitoring directory: " + e.getMessage());
        }
    }
    
    public static void simulateFileOperations(Path directory) {
        try {
            // Wait a bit for monitor to start
            Thread.sleep(1000);
            
            // Create a file
            Path testFile = directory.resolve("test_file.txt");
            Files.write(testFile, "Initial content".getBytes());
            Thread.sleep(1000);
            
            // Modify the file
            Files.write(testFile, "Modified content".getBytes());
            Thread.sleep(1000);
            
            // Create another file
            Path anotherFile = directory.resolve("another_file.txt");
            Files.write(anotherFile, "Another file content".getBytes());
            Thread.sleep(1000);
            
            // Delete a file
            Files.delete(testFile);
            Thread.sleep(1000);
            
        } catch (IOException | InterruptedException e) {
            System.out.println("Error in file simulation: " + e.getMessage());
        }
    }
}
```

## Summary and Best Practices

### Key Takeaways

1. **Exception Handling**: Always handle exceptions appropriately. Use specific exception types when possible and provide meaningful error messages.

2. **Lambda Expressions**: Use lambdas to write more concise and readable code, especially when working with collections and functional interfaces.

3. **Annotations**: Leverage annotations for metadata and to provide information to tools and frameworks.

4. **Modules**: Use modules in larger applications to organize code and control dependencies.

5. **Optionals**: Use Optional to handle null values safely and make your intentions clear.

6. **Dependency Injection**: Design your classes to be loosely coupled by injecting dependencies rather than creating them internally.

7. **I/O Operations**: Choose the appropriate I/O classes based on your needs (byte vs character streams, buffered vs unbuffered).

8. **File Operations**: Use the modern java.nio.file API for better performance and more features.

### Best Practices

- **Always close resources**: Use try-with-resources statements for automatic resource management
- **Handle exceptions appropriately**: Don't ignore exceptions or catch them too broadly
- **Use meaningful variable names**: Code should be self-documenting
- **Keep methods small and focused**: Each method should do one thing well
- **Write tests**: Test your code to ensure it works correctly
- **Use version control**: Keep track of your code changes
- **Comment complex logic**: Explain why, not just what
- **Follow Java naming conventions**: Use camelCase for variables and methods, PascalCase for classes

Remember: Programming is a skill that improves with practice. Try to build small projects using these concepts to reinforce your learning!