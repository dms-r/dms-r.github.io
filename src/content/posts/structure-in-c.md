---
title: Chapter 6 - Learn C
published: 2025-05-29
description: 'Structures in c programming'
image: ''
tags: [Syntax, Embedded]
category: 'Clang'
draft: false 
lang: 'en'
---

## Introduction

Think of structures as custom-made containers that can hold different types of related information together. Just like a student record card contains a name (text), age (number), and grade (letter), structures in C allow us to group different data types under one roof. This chapter will take you from basic structure concepts to advanced techniques used in real-world programming.

---

## 6.1 Basics of Structures

### What is a Structure?

A structure is like a blueprint for creating a custom data type that can hold multiple pieces of related information. Imagine you're organizing information about students in your school. Instead of keeping separate variables for each piece of information, you can create a "student" structure that holds everything together.

### Declaring a Structure

Here's how we create our first structure:

```c
#include <stdio.h>
#include <string.h>

// Structure declaration - this is like creating a blueprint
struct Student {
    char name[50];      // Student's name (text)
    int age;           // Student's age (whole number)
    float grade;       // Student's grade (decimal number)
    char section;      // Student's section (single character)
};

int main() {
    // Creating a structure variable - like using the blueprint to build something
    struct Student student1;
    
    // Assigning values to structure members
    strcpy(student1.name, "Alice Johnson");  // Copy string into name
    student1.age = 16;
    student1.grade = 92.5;
    student1.section = 'A';
    
    // Displaying the information
    printf("Student Information:\n");
    printf("Name: %s\n", student1.name);
    printf("Age: %d years\n", student1.age);
    printf("Grade: %.1f%%\n", student1.grade);
    printf("Section: %c\n", student1.section);
    
    return 0;
}
```

### Structure Initialization

You can also initialize a structure when you declare it, similar to how you might fill out a form all at once:

```c
// Method 1: Initialize during declaration
struct Student student2 = {"Bob Smith", 17, 88.0, 'B'};

// Method 2: Designated initializers (C99 and later)
struct Student student3 = {
    .name = "Carol Davis",
    .age = 16,
    .grade = 95.2,
    .section = 'A'
};
```

---

## 6.2 Structures and Functions

### Passing Structures to Functions

Structures become really powerful when we use them with functions. Think of functions as specialized workers who can process your structure data.

```c
#include <stdio.h>
#include <string.h>

struct Student {
    char name[50];
    int age;
    float grade;
    char section;
};

// Function to display student information
// This function receives a copy of the structure
void displayStudent(struct Student s) {
    printf("\n=== Student Information ===\n");
    printf("Name: %s\n", s.name);
    printf("Age: %d years\n", s.age);
    printf("Grade: %.1f%%\n", s.grade);
    printf("Section: %c\n", s.section);
    printf("==========================\n");
}

// Function to update student grade
// This function receives the address of the structure
void updateGrade(struct Student *s, float newGrade) {
    s->grade = newGrade;  // Using arrow operator to access member
    printf("Grade updated to %.1f%%\n", newGrade);
}

// Function to check if student passed
int hasPassed(struct Student s) {
    return s.grade >= 60.0;  // Return 1 if passed, 0 if failed
}

int main() {
    struct Student student1 = {"David Wilson", 17, 75.5, 'C'};
    
    // Display original information
    displayStudent(student1);
    
    // Check if student passed
    if (hasPassed(student1)) {
        printf("%s has passed!\n", student1.name);
    } else {
        printf("%s needs to work harder.\n", student1.name);
    }
    
    // Update the grade
    updateGrade(&student1, 82.0);
    
    // Display updated information
    displayStudent(student1);
    
    return 0;
}
```

### Understanding Pass by Value vs Pass by Reference

When you pass a structure to a function normally, it's like making a photocopy - changes to the copy don't affect the original. When you pass a pointer to the structure, it's like giving someone the address of your house - they can come and make changes to the original.

---

## 6.3 Arrays of Structures

### Creating Multiple Records

Arrays of structures are like having multiple filing cabinets, each with the same organization system. This is perfect for managing multiple students, employees, or any collection of similar items.

```c
#include <stdio.h>
#include <string.h>

struct Student {
    int id;
    char name[50];
    float grade;
    char section;
};

// Function to input student data
void inputStudent(struct Student *s, int studentNumber) {
    printf("\nEntering data for Student %d:\n", studentNumber);
    
    printf("Enter ID: ");
    scanf("%d", &s->id);
    
    printf("Enter name: ");
    scanf(" %[^\n]", s->name);  // Read string with spaces
    
    printf("Enter grade: ");
    scanf("%f", &s->grade);
    
    printf("Enter section: ");
    scanf(" %c", &s->section);
}

// Function to display all students
void displayAllStudents(struct Student students[], int count) {
    printf("\n=== CLASS ROSTER ===\n");
    printf("ID\tName\t\tGrade\tSection\n");
    printf("----------------------------------------\n");
    
    for (int i = 0; i < count; i++) {
        printf("%d\t%-15s\t%.1f\t%c\n", 
               students[i].id, 
               students[i].name, 
               students[i].grade, 
               students[i].section);
    }
}

// Function to find highest grade
struct Student findTopStudent(struct Student students[], int count) {
    struct Student topStudent = students[0];
    
    for (int i = 1; i < count; i++) {
        if (students[i].grade > topStudent.grade) {
            topStudent = students[i];
        }
    }
    
    return topStudent;
}

int main() {
    const int MAX_STUDENTS = 5;
    struct Student classroom[MAX_STUDENTS];
    
    // Input data for all students
    for (int i = 0; i < MAX_STUDENTS; i++) {
        inputStudent(&classroom[i], i + 1);
    }
    
    // Display all students
    displayAllStudents(classroom, MAX_STUDENTS);
    
    // Find and display top student
    struct Student topStudent = findTopStudent(classroom, MAX_STUDENTS);
    printf("\nTop Student: %s with grade %.1f%%\n", 
           topStudent.name, topStudent.grade);
    
    return 0;
}
```

---

## 6.4 Pointers to Structures

### Understanding Structure Pointers

Pointers to structures are like having a remote control for your structure data. Instead of carrying the entire structure around, you carry a small pointer that tells you where to find it.

```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

struct Book {
    char title[100];
    char author[50];
    int pages;
    float price;
};

// Function to create a new book using dynamic memory
struct Book* createBook(char *title, char *author, int pages, float price) {
    // Allocate memory for a new book
    struct Book *newBook = (struct Book*)malloc(sizeof(struct Book));
    
    if (newBook == NULL) {
        printf("Memory allocation failed!\n");
        return NULL;
    }
    
    // Initialize the book data
    strcpy(newBook->title, title);
    strcpy(newBook->author, author);
    newBook->pages = pages;
    newBook->price = price;
    
    return newBook;
}

// Function to display book information using pointer
void displayBook(struct Book *book) {
    if (book == NULL) {
        printf("No book to display!\n");
        return;
    }
    
    printf("\n=== BOOK INFORMATION ===\n");
    printf("Title: %s\n", book->title);        // Using arrow operator
    printf("Author: %s\n", book->author);
    printf("Pages: %d\n", book->pages);
    printf("Price: $%.2f\n", book->price);
    printf("========================\n");
}

// Function to apply discount using pointer
void applyDiscount(struct Book *book, float discountPercent) {
    if (book == NULL) return;
    
    float discount = book->price * (discountPercent / 100.0);
    book->price -= discount;
    
    printf("Applied %.1f%% discount. New price: $%.2f\n", 
           discountPercent, book->price);
}

int main() {
    // Create books using dynamic allocation
    struct Book *book1 = createBook("The C Programming Language", 
                                   "Dennis Ritchie", 272, 45.99);
    
    struct Book *book2 = createBook("Learn C the Hard Way", 
                                   "Zed Shaw", 384, 39.99);
    
    // Display books
    displayBook(book1);
    displayBook(book2);
    
    // Apply discounts
    applyDiscount(book1, 10.0);  // 10% discount
    applyDiscount(book2, 15.0);  // 15% discount
    
    // Display updated prices
    printf("\nAfter discounts:\n");
    displayBook(book1);
    displayBook(book2);
    
    // Don't forget to free the memory!
    free(book1);
    free(book2);
    
    return 0;
}
```

### Arrow Operator vs Dot Operator

Think of these operators as two different ways to access information:
- Dot operator (`.`): Used when you have the actual structure
- Arrow operator (`->`): Used when you have a pointer to the structure

```c
struct Student s1;           // Actual structure
struct Student *ptr = &s1;   // Pointer to structure

s1.age = 18;        // Using dot operator
ptr->age = 18;      // Using arrow operator (equivalent to (*ptr).age = 18)
```

---

## 6.5 Self-referential Structures

### Building Connected Data

Self-referential structures are like a chain where each link knows about the next link. This is the foundation for building linked lists, trees, and other dynamic data structures.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Node structure for a simple linked list
struct Node {
    int data;              // The actual data we want to store
    struct Node *next;     // Pointer to the next node in the chain
};

// Function to create a new node
struct Node* createNode(int value) {
    struct Node *newNode = (struct Node*)malloc(sizeof(struct Node));
    
    if (newNode == NULL) {
        printf("Memory allocation failed!\n");
        return NULL;
    }
    
    newNode->data = value;
    newNode->next = NULL;   // Initially, this node doesn't point to anything
    
    return newNode;
}

// Function to add a node at the beginning of the list
struct Node* addToFront(struct Node *head, int value) {
    struct Node *newNode = createNode(value);
    
    if (newNode == NULL) return head;
    
    newNode->next = head;   // New node points to the old first node
    return newNode;         // New node becomes the new head
}

// Function to display the entire list
void displayList(struct Node *head) {
    printf("List contents: ");
    
    struct Node *current = head;
    while (current != NULL) {
        printf("%d ", current->data);
        current = current->next;  // Move to the next node
    }
    
    printf("\n");
}

// Function to count nodes in the list
int countNodes(struct Node *head) {
    int count = 0;
    struct Node *current = head;
    
    while (current != NULL) {
        count++;
        current = current->next;
    }
    
    return count;
}

// Function to find a value in the list
struct Node* findValue(struct Node *head, int target) {
    struct Node *current = head;
    
    while (current != NULL) {
        if (current->data == target) {
            return current;  // Found it!
        }
        current = current->next;
    }
    
    return NULL;  // Not found
}

// Function to free all nodes in the list
void freeList(struct Node *head) {
    struct Node *current = head;
    struct Node *next;
    
    while (current != NULL) {
        next = current->next;  // Save the next node before freeing current
        free(current);
        current = next;
    }
}

int main() {
    struct Node *head = NULL;  // Start with an empty list
    
    // Add some numbers to the list
    printf("Building a linked list:\n");
    head = addToFront(head, 10);
    displayList(head);
    
    head = addToFront(head, 20);
    displayList(head);
    
    head = addToFront(head, 30);
    displayList(head);
    
    // Display list information
    printf("\nList has %d nodes\n", countNodes(head));
    
    // Search for values
    int searchValue = 20;
    struct Node *found = findValue(head, searchValue);
    
    if (found != NULL) {
        printf("Found %d in the list!\n", searchValue);
    } else {
        printf("%d not found in the list.\n", searchValue);
    }
    
    // Clean up memory
    freeList(head);
    printf("Memory cleaned up.\n");
    
    return 0;
}
```

---

## 6.6 Table Lookup

### Efficient Data Searching

Table lookup is like having an organized phone book where you can quickly find information. We'll create a simple hash table for fast data retrieval.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define TABLE_SIZE 10

// Structure for storing key-value pairs
struct Entry {
    char key[50];          // The search key (like a word in dictionary)
    char value[100];       // The associated value (like the definition)
    struct Entry *next;    // For handling collisions (multiple items with same hash)
};

// Hash table structure
struct HashTable {
    struct Entry *table[TABLE_SIZE];
};

// Simple hash function - converts a string to an array index
int hash(char *key) {
    int hashValue = 0;
    
    for (int i = 0; key[i] != '\0'; i++) {
        hashValue += key[i];  // Add ASCII values of characters
    }
    
    return hashValue % TABLE_SIZE;  // Make sure it fits in our table
}

// Initialize the hash table
void initializeTable(struct HashTable *ht) {
    for (int i = 0; i < TABLE_SIZE; i++) {
        ht->table[i] = NULL;
    }
}

// Insert a key-value pair into the table
void insert(struct HashTable *ht, char *key, char *value) {
    int index = hash(key);
    
    // Create new entry
    struct Entry *newEntry = (struct Entry*)malloc(sizeof(struct Entry));
    if (newEntry == NULL) {
        printf("Memory allocation failed!\n");
        return;
    }
    
    strcpy(newEntry->key, key);
    strcpy(newEntry->value, value);
    newEntry->next = ht->table[index];  // Handle collisions with chaining
    
    ht->table[index] = newEntry;
    
    printf("Inserted: %s -> %s (at index %d)\n", key, value, index);
}

// Search for a value by key
char* lookup(struct HashTable *ht, char *key) {
    int index = hash(key);
    struct Entry *current = ht->table[index];
    
    // Search through the chain at this index
    while (current != NULL) {
        if (strcmp(current->key, key) == 0) {
            return current->value;  // Found it!
        }
        current = current->next;
    }
    
    return NULL;  // Not found
}

// Display the entire hash table
void displayTable(struct HashTable *ht) {
    printf("\n=== HASH TABLE CONTENTS ===\n");
    
    for (int i = 0; i < TABLE_SIZE; i++) {
        printf("Index %d: ", i);
        
        struct Entry *current = ht->table[i];
        if (current == NULL) {
            printf("(empty)\n");
        } else {
            while (current != NULL) {
                printf("[%s: %s] ", current->key, current->value);
                current = current->next;
            }
            printf("\n");
        }
    }
    printf("===========================\n");
}

// Free all memory used by the hash table
void freeTable(struct HashTable *ht) {
    for (int i = 0; i < TABLE_SIZE; i++) {
        struct Entry *current = ht->table[i];
        
        while (current != NULL) {
            struct Entry *temp = current;
            current = current->next;
            free(temp);
        }
    }
}

int main() {
    struct HashTable phoneBook;
    initializeTable(&phoneBook);
    
    // Add some contacts
    printf("Building a phone book using hash table:\n");
    insert(&phoneBook, "Alice", "555-1234");
    insert(&phoneBook, "Bob", "555-5678");
    insert(&phoneBook, "Carol", "555-9012");
    insert(&phoneBook, "David", "555-3456");
    insert(&phoneBook, "Eve", "555-7890");
    
    // Display the table structure
    displayTable(&phoneBook);
    
    // Look up some numbers
    printf("\nPhone number lookups:\n");
    char *names[] = {"Alice", "David", "Frank", "Bob"};
    int numNames = sizeof(names) / sizeof(names[0]);
    
    for (int i = 0; i < numNames; i++) {
        char *number = lookup(&phoneBook, names[i]);
        
        if (number != NULL) {
            printf("%s: %s\n", names[i], number);
        } else {
            printf("%s: Not found\n", names[i]);
        }
    }
    
    // Clean up
    freeTable(&phoneBook);
    
    return 0;
}
```

---

## 6.7 Typedef

### Creating Custom Data Types

`typedef` is like giving a nickname to complex data types. It makes your code cleaner and easier to understand, especially when working with complex structures.

```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

// Traditional way - using struct keyword every time
struct Point {
    float x, y;
};

// Using typedef to create a cleaner type name
typedef struct {
    float x, y, z;
} Point3D;

// typedef with named struct (both ways work)
typedef struct Rectangle {
    float width;
    float height;
    Point3D center;  // Using our custom type inside another structure
} Rectangle;

// typedef for function pointers (advanced concept)
typedef void (*DrawFunction)(Rectangle*);

// Function to display a rectangle
void displayRectangle(Rectangle *rect) {
    printf("Rectangle: %.1f x %.1f at (%.1f, %.1f, %.1f)\n",
           rect->width, rect->height,
           rect->center.x, rect->center.y, rect->center.z);
}

// Function to calculate rectangle area
float calculateArea(Rectangle *rect) {
    return rect->width * rect->height;
}

// Function to move rectangle to new position
void moveRectangle(Rectangle *rect, float newX, float newY, float newZ) {
    rect->center.x = newX;
    rect->center.y = newY;
    rect->center.z = newZ;
    printf("Rectangle moved to (%.1f, %.1f, %.1f)\n", newX, newY, newZ);
}

// Example of typedef with arrays
typedef int IntArray[10];
typedef char String[100];

// Example of typedef with pointers
typedef Rectangle* RectanglePtr;

int main() {
    // Using typedef makes declarations much cleaner
    Point3D origin = {0.0, 0.0, 0.0};
    Point3D corner = {10.0, 20.0, 5.0};
    
    // Create rectangles using our typedef
    Rectangle rect1 = {
        .width = 15.0,
        .height = 10.0,
        .center = {5.0, 3.0, 0.0}
    };
    
    Rectangle rect2;
    rect2.width = 8.0;
    rect2.height = 12.0;
    rect2.center = corner;
    
    printf("=== RECTANGLE MANAGEMENT SYSTEM ===\n");
    
    // Display rectangles
    printf("\nInitial rectangles:\n");
    displayRectangle(&rect1);
    displayRectangle(&rect2);
    
    // Calculate and display areas
    printf("\nAreas:\n");
    printf("Rectangle 1 area: %.2f square units\n", calculateArea(&rect1));
    printf("Rectangle 2 area: %.2f square units\n", calculateArea(&rect2));
    
    // Move rectangles
    printf("\nMoving rectangles:\n");
    moveRectangle(&rect1, 0.0, 0.0, 10.0);
    moveRectangle(&rect2, -5.0, 8.0, 2.0);
    
    // Display updated positions
    printf("\nUpdated rectangles:\n");
    displayRectangle(&rect1);
    displayRectangle(&rect2);
    
    // Example with typedef arrays and strings
    IntArray numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    String message;
    strcpy(message, "Hello from typedef!");
    
    printf("\nBonus examples:\n");
    printf("First few numbers: %d, %d, %d\n", numbers[0], numbers[1], numbers[2]);
    printf("Message: %s\n", message);
    
    // Example with typedef pointer
    RectanglePtr ptr = &rect1;
    printf("Using typedef pointer - width: %.1f\n", ptr->width);
    
    return 0;
}
```

### Benefits of typedef

Using `typedef` offers several advantages:
- **Cleaner code**: `Rectangle rect;` instead of `struct Rectangle rect;`
- **Easier maintenance**: Change the underlying type in one place
- **Better abstraction**: Hide complex type definitions behind simple names
- **Improved readability**: Code becomes more self-documenting

---

## 6.8 Unions

### Sharing Memory Efficiently

Unions are like a magical box that can hold different types of items, but only one at a time. Unlike structures where each member has its own memory space, union members share the same memory location.

```c
#include <stdio.h>
#include <string.h>

// Basic union example
union Data {
    int integer;
    float decimal;
    char character;
    char string[20];
};

// More practical example - different ways to interpret the same data
union IPv4Address {
    unsigned int fullAddress;    // Treat as single 32-bit number
    unsigned char bytes[4];      // Treat as 4 separate bytes
    struct {                     // Treat as individual octets
        unsigned char octet1;
        unsigned char octet2;
        unsigned char octet3;
        unsigned char octet4;
    } parts;
};

// Union with type identifier (tagged union)
typedef enum {
    TYPE_INTEGER,
    TYPE_FLOAT,
    TYPE_STRING
} DataType;

typedef struct {
    DataType type;      // Tells us which union member is currently valid
    union {
        int intValue;
        float floatValue;
        char stringValue[50];
    } data;
} TypedData;

// Function to display typed data
void displayTypedData(TypedData *item) {
    switch (item->type) {
        case TYPE_INTEGER:
            printf("Integer: %d\n", item->data.intValue);
            break;
        case TYPE_FLOAT:
            printf("Float: %.2f\n", item->data.floatValue);
            break;
        case TYPE_STRING:
            printf("String: %s\n", item->data.stringValue);
            break;
        default:
            printf("Unknown data type\n");
    }
}

// Function to create typed data
TypedData createInteger(int value) {
    TypedData data;
    data.type = TYPE_INTEGER;
    data.data.intValue = value;
    return data;
}

TypedData createFloat(float value) {
    TypedData data;
    data.type = TYPE_FLOAT;
    data.data.floatValue = value;
    return data;
}

TypedData createString(char *value) {
    TypedData data;
    data.type = TYPE_STRING;
    strcpy(data.data.stringValue, value);
    return data;
}

int main() {
    printf("=== UNDERSTANDING UNIONS ===\n");
    
    // Basic union demonstration
    union Data sample;
    
    printf("\nBasic union example:\n");
    printf("Size of union Data: %zu bytes\n", sizeof(sample));
    
    // Store different types of data
    sample.integer = 42;
    printf("As integer: %d\n", sample.integer);
    
    sample.decimal = 3.14159f;
    printf("As float: %.5f\n", sample.decimal);
    printf("Previous integer value is now corrupted: %d\n", sample.integer);
    
    sample.character = 'A';
    printf("As character: %c\n", sample.character);
    printf("Previous float value is now corrupted: %.5f\n", sample.decimal);
    
    strcpy(sample.string, "Hello Union!");
    printf("As string: %s\n", sample.string);
    printf("Previous values are now corrupted - char: %c, int: %d\n", 
           sample.character, sample.integer);
    
    // IP Address example
    printf("\n=== IP ADDRESS MANIPULATION ===\n");
    union IPv4Address ip;
    
    // Set IP address as individual bytes
    ip.bytes[0] = 192;
    ip.bytes[1] = 168;
    ip.bytes[2] = 1;
    ip.bytes[3] = 100;
    
    printf("IP Address: %d.%d.%d.%d\n", 
           ip.bytes[0], ip.bytes[1], ip.bytes[2], ip.bytes[3]);
    
    printf("As single number: %u\n", ip.fullAddress);
    
    printf("Using struct parts: %d.%d.%d.%d\n",
           ip.parts.octet1, ip.parts.octet2, 
           ip.parts.octet3, ip.parts.octet4);
    
    // Tagged union example
    printf("\n=== TAGGED UNION EXAMPLE ===\n");
    
    TypedData items[4];
    items[0] = createInteger(100);
    items[1] = createFloat(25.75);
    items[2] = createString("Hello World");
    items[3] = createInteger(-50);
    
    printf("Array of different data types:\n");
    for (int i = 0; i < 4; i++) {
        printf("Item %d - ", i);
        displayTypedData(&items[i]);
    }
    
    // Memory comparison
    printf("\n=== MEMORY USAGE COMPARISON ===\n");
    
    struct StructVersion {
        int integer;
        float decimal;
        char string[20];
    };
    
    union UnionVersion {
        int integer;
        float decimal;
        char string[20];
    };
    
    printf("Structure size: %zu bytes\n", sizeof(struct StructVersion));
    printf("Union size: %zu bytes\n", sizeof(union UnionVersion));
    printf("Memory saved with union: %zu bytes\n", 
           sizeof(struct StructVersion) - sizeof(union UnionVersion));
    
    return 0;
}
```

### When to Use Unions

Unions are particularly useful when:
- You need to save memory by storing only one type of data at a time
- You want to interpret the same data in different ways (like the IP address example)
- You're working with protocols or file formats that have variant data
- You're implementing polymorphic data structures

---

## 6.9 Bit-fields

### Precise Memory Control

Bit-fields allow you to specify exactly how many bits each member of a structure should use. This is like being able to divide a storage box into custom-sized compartments instead of using fixed-size containers.

```c
#include <stdio.h>

// Basic bit-field example
struct StatusFlags {
    unsigned int isActive    : 1;   // 1 bit  (0 or 1)
    unsigned int isVisible   : 1;   // 1 bit  (0 or 1)
    unsigned int priority    : 3;   // 3 bits (0 to 7)
    unsigned int category    : 4;   // 4 bits (0 to 15)
    unsigned int reserved    : 7;   // 7 bits (unused, for future use)
};

// Date structure using bit-fields
struct CompactDate {
    unsigned int day   : 5;   // 1-31  (5 bits can hold 0-31)
    unsigned int month : 4;   // 1-12  (4 bits can hold 0-15)
    unsigned int year  : 12;  // 0-4095 (12 bits, we'll add 2000 to get real year)
};

// RGB color using bit-fields
struct RGBColor {
    unsigned int red   : 8;   // 0-255
    unsigned int green : 8;   // 0-255
    unsigned int blue  : 8;   // 0-255
    unsigned int alpha : 8;   // 0-255 (transparency)
};

// Network packet header (simplified)
struct PacketHeader {
    unsigned int version    : 4;   // Protocol version
    unsigned int headerLen  : 4;   // Header length
    unsigned int serviceType: 8;   // Type of service
    unsigned int totalLen   : 16;  // Total packet length
    unsigned int id         : 16;  // Packet identification
    unsigned int flags      : 3;   // Control flags
    unsigned int fragOffset : 13;  // Fragment offset
};

// Function to display status flags
void displayStatus(struct StatusFlags *status) {
    printf("Status Information:\n");
    printf("  Active: %s\n", status->isActive ? "Yes" : "No");
    printf("  Visible: %s\n", status->isVisible ? "Yes" : "No");
    printf("  Priority: %u\n", status->priority);
    printf("  Category: %u\n", status->category);
    printf("  Reserved bits: %u\n", status->reserved);
}

// Function to create and display a date
void displayDate(struct CompactDate *date) {
    printf("Date: %02u/%02u/%u\n", 
           date->month, date->day, date->year + 2000);
}

// Function to display RGB color
void displayColor(struct RGBColor *color) {
    printf("RGB Color: (%u, %u, %u) Alpha: %u\n",
           color->red, color->green, color->blue, color->alpha);
    printf("Hex representation: #%02X%02X%02X%02X\n",
           color->red, color->green, color->blue, color->alpha);
}

// Function to display packet header
void displayPacketHeader(struct PacketHeader *header) {
    printf("Packet Header:\n");
    printf("  Version: %u\n", header->version);
    printf("  Header Length: %u\n", header->headerLen);
    printf("  Service Type: %u\n", header->serviceType);
    printf("  Total Length: %u bytes\n", header->totalLen);
    printf("  ID: %u\n", header->id);
    printf("  Flags: %u\n", header->flags);
    printf("  Fragment Offset: %u\n", header->fragOffset);
}

int main() {
    printf("=== BIT-FIELDS DEMONSTRATION ===\n");
    
    // Memory usage comparison
    printf("\nMemory usage comparison:\n");
    printf("Regular int: %zu bytes\n", sizeof(int));
    printf("StatusFlags: %zu bytes\n", sizeof(struct StatusFlags));
    printf("CompactDate: %zu bytes\n", sizeof(struct CompactDate));
    printf("RGBColor: %zu bytes\n", sizeof(struct RGBColor));
    
    // Status flags example
    printf("\n=== STATUS FLAGS EXAMPLE ===\n");
    struct StatusFlags gameObject;
    
    // Set individual flags
    gameObject.isActive = 1;      // true
    gameObject.isVisible = 0;     // false
    gameObject.priority = 5;      // high priority (0-7 scale)
    gameObject.category = 10;     // category 10
    gameObject.reserved = 0;      // unused bits
    
    displayStatus(&gameObject);
    
    // Modify flags
    printf("\nAfter making object visible and changing priority:\n");
    gameObject.isVisible = 1;
    gameObject.priority = 2;
    displayStatus(&gameObject);
    
    // Date example
    printf("\n=== COMPACT DATE EXAMPLE ===\n");
    struct CompactDate dates[3];
    
    // Set some dates
    dates[0] = (struct CompactDate){15, 6, 24};  // June 15, 2024
    dates[1] = (struct CompactDate){25, 12, 23}; // December 25, 2023
    dates[2] = (struct CompactDate){1, 1, 25};   // January 1, 2025
    
    printf("Important dates:\n");
    for (int i = 0; i < 3; i++) {
        printf("Date %d: ", i + 1);
        displayDate(&dates[i]);
    }
    
    // Color example
    printf("\n=== RGB COLOR EXAMPLE ===\n");
    struct RGBColor colors[4];
    
    // Define some colors
    colors[0] = (struct RGBColor){255, 0, 0, 255};     // Red
    colors[1] = (struct RGBColor){0, 255, 0, 255};     // Green
    colors[2] = (struct RGBColor){0, 0, 255, 128};     // Blue (50% transparent)
    colors[3] = (struct RGBColor){128, 64, 192, 255};  // Purple
    
    char *colorNames[] = {"Red", "Green", "Blue", "Purple"};
    
    for (int i = 0; i < 4; i++) {
        printf("%s: ", colorNames[i]);
        displayColor(&colors[i]);
        printf("\n");
    }
    
    // Network packet example
    printf("\n=== NETWORK PACKET HEADER EXAMPLE ===\n");
    struct PacketHeader packet;
    
    // Initialize packet header
    packet.version = 4;           // IPv4
    packet.headerLen = 5;         // 5 * 4 = 20 bytes header
    packet.serviceType = 0;       // Normal service
    packet.totalLen = 1500;       // Total packet size
    packet.id = 12345;           // Packet ID
    packet.flags = 2;            // Don't fragment flag
    packet.fragOffset = 0;       // No fragmentation
    
    displayPacketHeader(&packet);
    
    // Demonstrate bit manipulation
    printf("\n=== BIT MANIPULATION EXAMPLES ===\n");
    
    struct StatusFlags multiFlags = {0}; // Initialize all to 0
    
    printf("Initial state: ");
    displayStatus(&multiFlags);
    
    // Set multiple flags at once using bit operations
    printf("\nSetting multiple flags...\n");
    multiFlags.isActive = 1;
    multiFlags.isVisible = 1;
    multiFlags.priority = 7;      // Maximum priority
    multiFlags.category = 15;     // Maximum category
    
    displayStatus(&multiFlags);
    
    // Show limitations and warnings
    printf("\n=== LIMITATIONS AND WARNINGS ===\n");
    
    // Trying to store values that exceed bit-field capacity
    struct StatusFlags overflow;
    overflow.priority = 15;  // This will be truncated to 7 (3 bits max = 0-7)
    printf("Attempted to set priority to 15, actual value: %u\n", overflow.priority);
    
    overflow.category = 20;  // This will be truncated to 4 (4 bits max = 0-15)
    printf("Attempted to set category to 20, actual value: %u\n", overflow.category);
    
    // Show practical application - configuration register
    printf("\n=== CONFIGURATION REGISTER SIMULATION ===\n");
    
    struct ConfigRegister {
        unsigned int enable      : 1;  // Enable/disable
        unsigned int mode        : 2;  // 0-3 different modes
        unsigned int speed       : 3;  // 0-7 speed levels
        unsigned int direction   : 1;  // 0=forward, 1=reverse
        unsigned int autoStop    : 1;  // Auto-stop feature
        unsigned int reserved    : 8;  // Future use
    } motorConfig;
    
    // Configure motor
    motorConfig.enable = 1;
    motorConfig.mode = 2;        // Mode 2
    motorConfig.speed = 5;       // Speed level 5
    motorConfig.direction = 0;   // Forward
    motorConfig.autoStop = 1;    // Enable auto-stop
    motorConfig.reserved = 0;
    
    printf("Motor Configuration:\n");
    printf("  Enabled: %s\n", motorConfig.enable ? "Yes" : "No");
    printf("  Mode: %u\n", motorConfig.mode);
    printf("  Speed: %u/7\n", motorConfig.speed);
    printf("  Direction: %s\n", motorConfig.direction ? "Reverse" : "Forward");
    printf("  Auto-stop: %s\n", motorConfig.autoStop ? "Enabled" : "Disabled");
    
    // Show total memory usage for all examples
    printf("\n=== MEMORY EFFICIENCY SUMMARY ===\n");
    printf("Without bit-fields, these structures would use:\n");
    printf("  StatusFlags: %zu bytes (vs %zu actual)\n", 
           5 * sizeof(int), sizeof(struct StatusFlags));
    printf("  CompactDate: %zu bytes (vs %zu actual)\n", 
           3 * sizeof(int), sizeof(struct CompactDate));
    printf("  RGBColor: %zu bytes (vs %zu actual)\n", 
           4 * sizeof(int), sizeof(struct RGBColor));
    
    printf("\nTotal memory saved: %zu bytes per set of structures\n",
           (5 + 3 + 4) * sizeof(int) - 
           (sizeof(struct StatusFlags) + sizeof(struct CompactDate) + sizeof(struct RGBColor)));
    
    return 0;
}
```

---

## Chapter Summary and Best Practices

### Key Concepts Learned

In this chapter, we've explored the powerful world of structures in C programming. Here's what we've covered:

1. **Basic Structures**: Creating custom data types to group related data
2. **Functions and Structures**: Passing structures to functions efficiently
3. **Arrays of Structures**: Managing collections of related data
4. **Pointers to Structures**: Dynamic memory management and efficient data access
5. **Self-referential Structures**: Building linked data structures
6. **Table Lookup**: Implementing hash tables for fast data retrieval
7. **Typedef**: Creating cleaner, more maintainable code
8. **Unions**: Memory-efficient storage for mutually exclusive data
9. **Bit-fields**: Precise control over memory usage at the bit level

### Best Practices

**Memory Management:**
- Always free dynamically allocated memory
- Check for NULL pointers before dereferencing
- Initialize structure members before use

**Code Organization:**
- Use typedef to make code more readable
- Group related functions with their data structures
- Use meaningful names for structure members

**Performance Considerations:**
- Pass large structures by pointer, not by value
- Use bit-fields when memory is limited
- Consider memory alignment when designing structures

**Safety Tips:**
- Validate input data before storing in structures
- Be careful with string operations (use strncpy instead of strcpy)
- Don't access union members that weren't the last ones set

### Common Pitfalls to Avoid

1. **Forgetting to free memory** - Always match malloc() with free()
2. **Structure padding** - Be aware that compilers may add padding between members
3. **Pointer confusion** - Remember the difference between `.` and `->` operators
4. **Union misuse** - Only access the union member that was last assigned
5. **Bit-field overflow** - Values that exceed the bit-field size will be truncated

### Moving Forward

Structures are fundamental to C programming and form the foundation for object-oriented concepts in other languages. The concepts you've learned here will be essential when you advance to:

- File handling with structured data
- Advanced data structures (trees, graphs)
- System programming and embedded development
- Understanding how higher-level languages work internally
