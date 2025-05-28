---
title:  "Java Collections"
date:   2025-06-05
categories: [Java, Backend]
tags: [Collection]
---

## Introduction to Collections {#introduction}

### What are Collections?
Think of collections as **containers** that hold multiple objects. Just like how you might have a box to store your books, or a folder to organize your papers, Java collections help you organize and manage multiple pieces of data in your programs.

### Why Use Collections?
- **Dynamic Size**: Unlike arrays, collections can grow or shrink during program execution
- **Built-in Methods**: Collections come with useful methods for adding, removing, and searching
- **Type Safety**: With generics, you can ensure only specific types of objects are stored
- **Efficiency**: Different collections are optimized for different operations

---

## Array vs ArrayList {#array-vs-arraylist}

### Arrays - The Traditional Way

Arrays are like **fixed-size lockers** in a school hallway. Once you decide how many lockers you need, you can't change that number.

```java
// Creating an array
int[] numbers = new int[5]; // Fixed size of 5
numbers[0] = 10;
numbers[1] = 20;
// ... and so on

// You CANNOT add a 6th element!
```

**Array Characteristics:**
- ✅ Fast access by index
- ✅ Memory efficient
- ❌ Fixed size
- ❌ No built-in methods for adding/removing

### ArrayList - The Flexible Way

ArrayList is like a **magical backpack** that can expand or shrink based on what you put in it.

```java
import java.util.ArrayList;

// Creating an ArrayList
ArrayList<Integer> numbers = new ArrayList<>();

// Adding elements (backpack expands automatically!)
numbers.add(10);
numbers.add(20);
numbers.add(30);

// Removing elements
numbers.remove(1); // Removes element at index 1 (value 20)

// Accessing elements
int firstNumber = numbers.get(0); // Gets 10

System.out.println("Size: " + numbers.size()); // Shows current size
```

**ArrayList Characteristics:**
- ✅ Dynamic size
- ✅ Many useful methods
- ✅ Easy to use
- ❌ Slightly slower than arrays
- ❌ Uses more memory

### When to Use Which?

**Use Arrays when:**
- You know exactly how many elements you need
- You need maximum performance
- You're working with primitive types (int, double, etc.)

**Use ArrayList when:**
- You don't know how many elements you'll have
- You need to frequently add/remove elements
- You want convenient methods

---

## Set Collection {#set-collection}

### What is a Set?
A Set is like a **club membership list** - each person can only be a member once. No duplicates allowed!

### HashSet - The Most Common Set

```java
import java.util.HashSet;
import java.util.Set;

Set<String> studentNames = new HashSet<>();

// Adding names
studentNames.add("Alice");
studentNames.add("Bob");
studentNames.add("Alice"); // This won't be added again!

System.out.println(studentNames); // Output: [Alice, Bob]
System.out.println("Size: " + studentNames.size()); // Output: 2
```

### Practical Example: Managing Unique Student IDs

```java
import java.util.HashSet;
import java.util.Set;

public class SchoolRegistry {
    public static void main(String[] args) {
        Set<String> studentIDs = new HashSet<>();
        
        // Registering students
        studentIDs.add("STU001");
        studentIDs.add("STU002");
        studentIDs.add("STU001"); // Duplicate - won't be added
        
        System.out.println("Total unique students: " + studentIDs.size());
        
        // Check if a student is registered
        if (studentIDs.contains("STU001")) {
            System.out.println("Student STU001 is registered!");
        }
    }
}
```

**Set Characteristics:**
- ✅ No duplicates
- ✅ Fast checking if element exists
- ❌ No index-based access
- ❌ No guaranteed order (for HashSet)

---

## Map Collection {#map-collection}

### What is a Map?
A Map is like a **dictionary** or **phone book** - you look up a key (word/name) to find its value (definition/phone number).

### HashMap - Key-Value Pairs

```java
import java.util.HashMap;
import java.util.Map;

Map<String, Integer> studentGrades = new HashMap<>();

// Adding key-value pairs
studentGrades.put("Alice", 95);
studentGrades.put("Bob", 87);
studentGrades.put("Charlie", 92);

// Getting values by key
int aliceGrade = studentGrades.get("Alice"); // Returns 95

// Check if key exists
if (studentGrades.containsKey("David")) {
    System.out.println("David's grade: " + studentGrades.get("David"));
} else {
    System.out.println("David not found in records");
}
```

### Practical Example: Student Information System

```java
import java.util.HashMap;
import java.util.Map;

public class StudentSystem {
    public static void main(String[] args) {
        // Map student ID to student name
        Map<String, String> students = new HashMap<>();
        students.put("001", "Alice Johnson");
        students.put("002", "Bob Smith");
        students.put("003", "Charlie Brown");
        
        // Map student ID to grades
        Map<String, Integer> grades = new HashMap<>();
        grades.put("001", 95);
        grades.put("002", 87);
        grades.put("003", 92);
        
        // Display student information
        String studentId = "001";
        String name = students.get(studentId);
        Integer grade = grades.get(studentId);
        
        System.out.println("Student: " + name);
        System.out.println("Grade: " + grade);
    }
}
```

**Map Characteristics:**
- ✅ Fast lookup by key
- ✅ Perfect for associations/relationships
- ✅ Keys must be unique
- ❌ More complex than simple collections

---

## Queue and Dequeue {#queue-and-dequeue}

### Queue - First In, First Out (FIFO)
A Queue is like a **line at the cafeteria** - the first person in line is the first person served.

```java
import java.util.LinkedList;
import java.util.Queue;

Queue<String> cafeteriaLine = new LinkedList<>();

// Adding people to the back of the line
cafeteriaLine.offer("Alice");
cafeteriaLine.offer("Bob");
cafeteriaLine.offer("Charlie");

System.out.println("Line: " + cafeteriaLine); // [Alice, Bob, Charlie]

// Serving people from the front
String firstPerson = cafeteriaLine.poll(); // Removes and returns "Alice"
System.out.println("Served: " + firstPerson);
System.out.println("Remaining line: " + cafeteriaLine); // [Bob, Charlie]

// Check who's next without removing
String nextPerson = cafeteriaLine.peek(); // Returns "Bob" without removing
System.out.println("Next to be served: " + nextPerson);
```

### Deque - Double-Ended Queue
A Deque (pronounced "deck") is like a **line where you can join or leave from both ends**.

```java
import java.util.ArrayDeque;
import java.util.Deque;

Deque<String> line = new ArrayDeque<>();

// Add to front and back
line.addFirst("Alice");  // Alice
line.addLast("Bob");     // Alice, Bob
line.addFirst("Charlie"); // Charlie, Alice, Bob

System.out.println("Line: " + line); // [Charlie, Alice, Bob]

// Remove from front and back
String fromFront = line.removeFirst(); // Removes Charlie
String fromBack = line.removeLast();   // Removes Bob
System.out.println("Remaining: " + line); // [Alice]
```

### Practical Example: Print Queue

```java
import java.util.LinkedList;
import java.util.Queue;

public class PrinterQueue {
    public static void main(String[] args) {
        Queue<String> printJobs = new LinkedList<>();
        
        // Adding print jobs
        printJobs.offer("Math Homework.pdf");
        printJobs.offer("Science Report.docx");
        printJobs.offer("History Essay.pdf");
        
        System.out.println("Print queue: " + printJobs);
        
        // Processing print jobs
        while (!printJobs.isEmpty()) {
            String currentJob = printJobs.poll();
            System.out.println("Printing: " + currentJob);
        }
        
        System.out.println("All jobs completed!");
    }
}
```

---

## Stack Collection {#stack-collection}

### Stack - Last In, First Out (LIFO)
A Stack is like a **stack of plates** - you can only add or remove plates from the top.

```java
import java.util.Stack;

Stack<String> plateStack = new Stack<>();

// Adding plates (pushing onto stack)
plateStack.push("Blue Plate");
plateStack.push("Red Plate");
plateStack.push("Green Plate");

System.out.println("Stack: " + plateStack); // [Blue Plate, Red Plate, Green Plate]

// Removing plates (popping from stack)
String topPlate = plateStack.pop(); // Removes and returns "Green Plate"
System.out.println("Removed: " + topPlate);
System.out.println("Stack now: " + plateStack); // [Blue Plate, Red Plate]

// Check top plate without removing
String nextPlate = plateStack.peek(); // Returns "Red Plate" without removing
System.out.println("Next plate: " + nextPlate);
```

### Practical Example: Undo Functionality

```java
import java.util.Stack;

public class TextEditor {
    private String currentText = "";
    private Stack<String> undoStack = new Stack<>();
    
    public void type(String text) {
        undoStack.push(currentText); // Save current state
        currentText += text;
        System.out.println("Current text: " + currentText);
    }
    
    public void undo() {
        if (!undoStack.isEmpty()) {
            currentText = undoStack.pop(); // Restore previous state
            System.out.println("After undo: " + currentText);
        } else {
            System.out.println("Nothing to undo!");
        }
    }
    
    public static void main(String[] args) {
        TextEditor editor = new TextEditor();
        
        editor.type("Hello ");
        editor.type("World");
        editor.type("!");
        
        editor.undo(); // Remove "!"
        editor.undo(); // Remove "World"
    }
}
```

---

## Iterator {#iterator}

### What is an Iterator?
An Iterator is like a **bookmark** that helps you go through a collection one element at a time, without needing to know the internal structure.

### Basic Iterator Usage

```java
import java.util.ArrayList;
import java.util.Iterator;

public class IteratorExample {
    public static void main(String[] args) {
        ArrayList<String> fruits = new ArrayList<>();
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Cherry");
        
        // Using Iterator
        Iterator<String> it = fruits.iterator();
        
        System.out.println("Fruits in the list:");
        while (it.hasNext()) {
            String fruit = it.next();
            System.out.println("- " + fruit);
        }
    }
}
```

### Enhanced For Loop (Foreach)
Java provides a simpler way to iterate through collections:

```java
ArrayList<String> fruits = new ArrayList<>();
fruits.add("Apple");
fruits.add("Banana");
fruits.add("Cherry");

// Enhanced for loop - much simpler!
System.out.println("Fruits in the list:");
for (String fruit : fruits) {
    System.out.println("- " + fruit);
}
```

### Safe Removal with Iterator

```java
import java.util.ArrayList;
import java.util.Iterator;

public class SafeRemoval {
    public static void main(String[] args) {
        ArrayList<Integer> numbers = new ArrayList<>();
        numbers.add(1);
        numbers.add(2);
        numbers.add(3);
        numbers.add(4);
        numbers.add(5);
        
        // Remove all even numbers safely
        Iterator<Integer> it = numbers.iterator();
        while (it.hasNext()) {
            Integer number = it.next();
            if (number % 2 == 0) {
                it.remove(); // Safe removal
            }
        }
        
        System.out.println("After removing even numbers: " + numbers);
        // Output: [1, 3, 5]
    }
}
```

---

## Generic Collections {#generic-collections}

### What are Generics?
Generics are like **labeled boxes** - they tell Java what type of objects can be stored in a collection. This prevents you from accidentally putting the wrong type of object in the wrong place.

### Without Generics (Old Way - Don't Do This!)

```java
// Old way - not type-safe
ArrayList list = new ArrayList();
list.add("Hello");
list.add(42);
list.add(true);

// This can cause problems!
String text = (String) list.get(1); // Runtime error! 42 is not a String
```

### With Generics (Modern Way - Do This!)

```java
// Modern way - type-safe
ArrayList<String> textList = new ArrayList<String>();
textList.add("Hello");
textList.add("World");
// textList.add(42); // This would cause a compile-time error - good!

String text = textList.get(0); // No casting needed - safe!
```

### Generic Examples for Different Collections

```java
// ArrayList with specific types
ArrayList<Integer> scores = new ArrayList<Integer>();
ArrayList<String> names = new ArrayList<String>();
ArrayList<Double> prices = new ArrayList<Double>();

// Set with specific types
Set<String> uniqueEmails = new HashSet<String>();

// Map with specific key-value types
Map<String, Integer> studentAges = new HashMap<String, Integer>();
Map<Integer, String> idToName = new HashMap<Integer, String>();

// Queue with specific type
Queue<String> waitingList = new LinkedList<String>();

// Stack with specific type
Stack<Integer> numberStack = new Stack<Integer>();
```

### Diamond Operator (Java 7+)
You can make generic declarations shorter:

```java
// Instead of writing the type twice:
ArrayList<String> names = new ArrayList<String>();

// You can use the diamond operator:
ArrayList<String> names = new ArrayList<>(); // Java figures out the type
```

### Custom Object Collections

```java
// Let's create a Student class
class Student {
    private String name;
    private int age;
    
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String getName() { return name; }
    public int getAge() { return age; }
    
    @Override
    public String toString() {
        return "Student{name='" + name + "', age=" + age + "}";
    }
}

public class StudentCollection {
    public static void main(String[] args) {
        // Collection of Student objects
        ArrayList<Student> classroom = new ArrayList<>();
        
        classroom.add(new Student("Alice", 16));
        classroom.add(new Student("Bob", 17));
        classroom.add(new Student("Charlie", 16));
        
        // Print all students
        for (Student student : classroom) {
            System.out.println(student);
        }
        
        // Map student names to their ages
        Map<String, Integer> studentAges = new HashMap<>();
        for (Student student : classroom) {
            studentAges.put(student.getName(), student.getAge());
        }
        
        System.out.println("Student ages: " + studentAges);
    }
}
```

---

## Practice Examples {#practice-examples}

### Example 1: Library Book Management System

```java
import java.util.*;

public class LibrarySystem {
    public static void main(String[] args) {
        // Set of available books (no duplicates)
        Set<String> availableBooks = new HashSet<>();
        availableBooks.add("Harry Potter");
        availableBooks.add("Lord of the Rings");
        availableBooks.add("1984");
        
        // Map of borrowed books (student -> book)
        Map<String, String> borrowedBooks = new HashMap<>();
        borrowedBooks.put("Alice", "Harry Potter");
        borrowedBooks.put("Bob", "1984");
        
        // Queue of students waiting to borrow books
        Queue<String> waitingList = new LinkedList<>();
        waitingList.offer("Charlie");
        waitingList.offer("David");
        
        // Remove borrowed books from available set
        for (String book : borrowedBooks.values()) {
            availableBooks.remove(book);
        }
        
        System.out.println("Available books: " + availableBooks);
        System.out.println("Borrowed books: " + borrowedBooks);
        System.out.println("Waiting list: " + waitingList);
    }
}
```

### Example 2: Grade Calculator

```java
import java.util.*;

public class GradeCalculator {
    public static void main(String[] args) {
        // Student grades
        Map<String, ArrayList<Integer>> studentGrades = new HashMap<>();
        
        // Add grades for students
        studentGrades.put("Alice", new ArrayList<>(Arrays.asList(95, 87, 92, 89)));
        studentGrades.put("Bob", new ArrayList<>(Arrays.asList(78, 85, 90, 88)));
        studentGrades.put("Charlie", new ArrayList<>(Arrays.asList(92, 94, 89, 96)));
        
        // Calculate and display averages
        for (String student : studentGrades.keySet()) {
            ArrayList<Integer> grades = studentGrades.get(student);
            double average = calculateAverage(grades);
            System.out.println(student + "'s average: " + average);
        }
    }
    
    public static double calculateAverage(ArrayList<Integer> grades) {
        int sum = 0;
        for (int grade : grades) {
            sum += grade;
        }
        return (double) sum / grades.size();
    }
}
```

### Example 3: Simple Shopping Cart

```java
import java.util.*;

public class ShoppingCart {
    private Map<String, Integer> items; // item -> quantity
    private Map<String, Double> prices; // item -> price
    
    public ShoppingCart() {
        items = new HashMap<>();
        prices = new HashMap<>();
        
        // Initialize some prices
        prices.put("Apple", 0.50);
        prices.put("Banana", 0.30);
        prices.put("Orange", 0.60);
    }
    
    public void addItem(String item, int quantity) {
        if (prices.containsKey(item)) {
            items.put(item, items.getOrDefault(item, 0) + quantity);
            System.out.println("Added " + quantity + " " + item + "(s) to cart");
        } else {
            System.out.println("Item not available: " + item);
        }
    }
    
    public void displayCart() {
        System.out.println("\n--- Shopping Cart ---");
        double total = 0;
        
        for (String item : items.keySet()) {
            int quantity = items.get(item);
            double price = prices.get(item);
            double itemTotal = quantity * price;
            total += itemTotal;
            
            System.out.println(item + " x" + quantity + " = $" + itemTotal);
        }
        
        System.out.println("Total: $" + total);
    }
    
    public static void main(String[] args) {
        ShoppingCart cart = new ShoppingCart();
        
        cart.addItem("Apple", 3);
        cart.addItem("Banana", 2);
        cart.addItem("Orange", 1);
        cart.addItem("Grape", 1); // Not available
        
        cart.displayCart();
    }
}
```

## Summary

Java Collections provide powerful tools for managing groups of objects:

1. **ArrayList**: Dynamic arrays for ordered, indexed access
2. **Set**: Unique elements, no duplicates
3. **Map**: Key-value pairs for associations
4. **Queue/Deque**: Ordered processing (FIFO/both ends)
5. **Stack**: Last-in-first-out processing (LIFO)
6. **Iterator**: Safe way to traverse collections
7. **Generics**: Type safety and cleaner code

Choose the right collection based on your needs:
- Need indexed access? → **ArrayList**
- Need unique elements? → **Set**
- Need key-value lookup? → **Map**
- Need FIFO processing? → **Queue**
- Need LIFO processing? → **Stack**

Remember to always use generics to make your code safer and more readable!