---
title: "Linked List in C"
date: 2019-03-08
tags: [Linked List, Data Structure, C, Algorithm]
header:
  image: "/images/ucdsci.JPG"
categories: Programming
---

## Understanding the Linked List:

    Adding new cell
    Pushing new cells to the List
    Popping cells from the List
    Printing cells in the List
    Printing cells in the List in reverse order: Recursion
    Sum the elements in the list
    De-allocate the cells in the list
    Count the number of cells in the list

## Sample Output:


      Pushing new cells with values: 36, 1, 6, 12, 4:

      36
      1	36
      6	1	36
      12	6	1	36
      4	12	6	1	36

      Number of cells: 5
      Iterative Sum of cells: 59
      Recursive Sum of cells: 59

      Reversed List:
      36	1	6	12	4

      Popped last cell: 36

      List after Popping:
      4	12	6	1

      Number of cells: 4
      Iterative Sum of cells: 23
      Recursive Sum of cells: 23
      Reversed List:

      1	6	12	4

      Cells Freed: 4





## Program:

```c
#include<stdio.h>
#include<stdlib.h>

// Please run as follows:
// > gcc -o filename filename.c
// > ./filename

// Function declarations
struct cell* newcell(int n);
struct cell* push(struct cell* c, int n);
int deallocatelist(struct cell* c);
int countcells(struct cell* c);
int pop(struct cell* c);
void printlist(struct cell* c);
void printlistreverse(struct cell* c);
int sumit(struct cell* c);
int sumrec(struct cell* c);

// struct
struct cell
{
	int content; // Integer content
	struct cell *next; // Pointer to next cell
};

int main()
{
	// We will create a new cell and push new cells
	// And print the list at each stage

	printf("\n\nPushing new cells with values: 36, 1, 6, 12, 4:\n\n");

	struct cell* p = newcell(36); // Create new cell

	printlist(p); // Print list

	p = push(p, 1); // Push 1

	printlist(p); // Print list

	p = push(p, 6); // Push 6

	printlist(p); // Print list

	p = push(p, 12); // Push 12

	printlist(p); // Print list

	p = push(p, 4); // Push 4

	printlist(p); // Print list

	printf("\nNumber of cells: %d\n", countcells(p)); // Number of cells in the list
        printf("Iterative Sum of cells: %d\n", sumit(p)); // Sum of all cell contents: Computed by iterating
        printf("Recursive Sum of cells: %d\n", sumrec(p)); // Sum of all cell contents: Computed by recursion
	printf("\nReversed List:\n"); // Reversed List
	printlistreverse(p);

	int popped;
	popped = pop(p); // Pop last cell
	printf("\n\nPopped last cell: %d\n\nList after Popping:\n", popped);

	printlist(p);

	printf("\nNumber of cells: %d\n", countcells(p)); // Number of cells in the list
	printf("Iterative Sum of cells: %d\n", sumit(p)); // Sum of all cell contents: Computed by iterating
	printf("Recursive Sum of cells: %d\n", sumrec(p)); // Sum of all cell contents: Computed by recursion
	printf("Reversed List:\n\n"); // Reversed List
	printlistreverse(p);

	printf("\n\nCells Freed: %d\n\n", deallocatelist(p)); // Deallocate all cells

	return 0;
}

// newcell
// Takes a number n as input and creates a 'cell'.
// Returns the pointer to the cell.
struct cell* newcell(int n)
{
	struct cell *c = (struct cell*)malloc(sizeof(struct cell)); // Allocates memory

	c->content = n; // Assigns content to n
	c->next = NULL; // Assigns next pointer t NULL

	return c;
}

// push
// Takes pointer to existing list and number n as input
// Returns list with added cell
struct cell* push(struct cell* c, int n)
{
	struct cell *new = newcell(n); // Creates new cell
	new->next = c; // New cell points to existing list

	return new;
}

// deallocatelist
// Takes list pointer as input and frees all the cells
// Returns the number of cells freed
int deallocatelist(struct cell* c)
{
	int count = 0; // Initialize count to 0
	struct cell *temp; // Temp cell

	while(c != NULL) // Loop over all cells
	{
		temp = c;
		c = c->next; // Go to next cell
		free(temp); // Deallcate cell
		count++; // Increment count
	}
	return count; // Return count
}

// countcells
// Takes list pointer as input and counts the number of cells
// Returns the number of cells
int countcells(struct cell* c)
{
	int count = 0; // Initialize count to 0
	struct cell* temp = c; // Temp cell

	while(temp != NULL) // Loop over all cells
	{
		count++; // Increment count
		temp = temp->next; // Go to next cell
	}

	return count; // Return count
}

// pop
// Takes list pointer as input and deletes the last cell
// Returns the deleted value
int pop(struct cell* c)
{
	struct cell* temp = c; // Points to list
	struct cell* prev; // Points to the previouse cell of temp

	if(temp->next == NULL) // If only 1 cell in the list
		return temp->content; // Return value

	while(temp != NULL) // Loop over all cells
	{
		if(temp->next == NULL) // Chick for last cell
		{
			prev->next = NULL; // Make prev as the last cell
			return temp->content; // Return deleted value
		}
		prev = temp; // Assign prev
		temp = temp->next; // Increment temp cell
	}
	return -1;
}

// printlist
// Takes list pointer as input
// Prints all the cell contents
void printlist(struct cell* c)
{
	struct cell* temp = c; // Points to list

	while(temp != NULL) // Loop over all cells
	{
		printf("%d\t", temp->content); // Print content
		temp = temp->next; // Increment temp cell
	}
	printf("\n");
}

// printlistreverse
// Takes list pointer as input
// Prints all the cell contents in reverse order using recursion
void printlistreverse(struct cell* c)
{
	if(c == NULL) // Check for null cell
		return;

	printlistreverse(c->next); // Call recursively for next cell

	printf("%d\t", c->content); // Print cell content
}

// sumit : Iterative Sum
// Takes list pointer as input
// Returns the sum of all cells
int sumit(struct cell* c)
{
	int sum = 0; // Initialize sum to 0
	struct cell* temp = c; // Points to list

	while(temp != NULL) // Loop over all cells
	{
		sum += temp->content; // Cululatively sum up cell contents
		temp = temp->next; // Increment temp cell
	}
	return sum; // Return sum
}

// sumrec : Recursive Sum
// Takes list pointer as input
// Returns the sum of all cells
int sumrec(struct cell* c)
{
	if(c == NULL) // Check for null cell
		return 0;

	return c->content + sumrec(c->next); // Return sum of current cell content and recursive sum
}
```
