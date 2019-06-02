---
title: "Median Sort and Search in C"
date: 2019-03-08
tags: [Median Sort, Sort, Search, C, Algorithm, Benchmark, Chop Search]
header:
  image: "/images/liffey.JPG"
categories: Programming
---

**Understanding the Median Sort:**
* Calculating the median of a given random array
* Sorting the array by recursive median computations
* Searching the sorted array for given element: Naive search
* Searching by chop search
* Benchmarks for naive search and chop search

## Sample Output:
-----------------------------------------------------------------------------------------------
Please enter the number of elements:
10
Please enter the maximum:
50
-----------------------------------------------------------------------------------------------

Random Array:
28	19	5	38	22	44	12	17	35	7

Sorted Array:
5	7	12	17	19	22	28	35	38	44
-----------------------------------------------------------------------------------------------

SEARCH:
Please enter the number to be searched:
22

Naive Search:
	Searched Index:	5
Chop Search:
	Searched Index:	5
-----------------------------------------------------------------------------------------------

Commented the benchmark code since it will take a long time...

-----------------------------------------------------------------------------------------------
Benchmark results from previously executed code:
Naive Search:	benchmark_naive:
-----------------------------------------------------------------------------------------------
Parameters: n=2000, max=10000, s=10, mult=1000000
		Elapsed time in milliseconds: 13960568.000000

Parameters: n=2000, max=10000, s=5000, mult=1000000
		Elapsed time in milliseconds: 14033882.000000

Parameters: n=2000, max=10000, s=9000, mult=1000000
		Elapsed time in milliseconds: 14153901.000000

-----------------------------------------------------------------------------------------------
Chop Search:	benchmark_chop:
-----------------------------------------------------------------------------------------------
Parameters: n=2000, max=10000, s=10, mult=1000000
		Elapsed time in milliseconds: 13872250.000000

Parameters: n=2000, max=10000, s=5000, mult=1000000
		Elapsed time in milliseconds: 13605529.000000

Parameters: n=2000, max=10000, s=9000, mult=1000000
		Elapsed time in milliseconds: 13956548.000000

-----------------------------------------------------------------------------------------------

Comments:
-----------------------------------------------------------------------------------------------
* Comments on Elapsed Time:
Overall, it is expected that chop search (O(log n)) would have better performance than the naive search (O(n)).
This is evident from the elapsed time results.

Naive search: As the search element increases from 10 to 5000 and to 9000, the time taken to execute also increases.
This is expected since for larger search elements, more number of statements have to be executed.

Chop search: Here, the 5000 case performed better compared to 10 and 9000.
This is because, the median was found(or not found) in fewer iterations.

* Time Complexity of sorting:

Since mediansort() is a recursive function, called recursively with decrementing n, the time complexity is linear. O(n).
But median sort calls median() every time which has quadratic time complexity O(n^2)(because of 2 nested for loops).
Therefore, the total time complexity is cubic. O(n * n^2) = O(n^3).
The time complexity is the same for best, worst and average cases, since we iterate though all n elements in all the cases.

* Time Complexity of Naive Search:

Best case: In the best case, the first element is the searched element so that the time complexity is O(1).
Worst case: In the worst case, the last element is the searched element so that the time complexity is O(n).
Average case: In the average case, the middle element is the searched element so that the time complexity is O(n/2).

* Time Complexity of Chop Search:

Best case: In the best case, the searched element is same as the random number x so that the time complexity is O(1).
Worst case: In the worst case, the time complexity is O(log n). This also relies on random number x.
Average case: In the average case, the time complexity is O(log n). This also relies on random number x.

-----------------------------------------------------------------------------------------------


## Program:

``` c
#include<stdio.h>
#include<stdlib.h>
#include <sys/time.h>

//
// Please run as follows:
// > gcc -o mediansortandbenchmarks mediansortandbenchmarks.c
// > ./mediansortandbenchmarks

// Function declarations
int *randomarray(int n, int max);
int median(int n, int *arr);
void mediansort(int n, int *cycle, int *arr, int *sorted);
int search(int i, int n, int *arr);
int chopsearch(int i, int n, int *arr, int amin, int amax);
float benchmark_naive(int n, int max, int s, int mult);
float benchmark_chop(int n, int max, int s, int mult);

int main()
{
	// Declare required variables
	int n, max, i;

	// Take user input for n and max
	printf("-----------------------------------------------------------------------------------------------\n");
	printf("Please enter the number of elements:\n");
	scanf("%d", &n);
	printf("Please enter the maximum:\n");
	scanf("%d", &max);

	// Call randomarray() that returns a randm array arr
	int *arr = randomarray(n, max);

	// Printing the random array
	printf("-----------------------------------------------------------------------------------------------\n");
	printf("\nRandom Array:\n");
	for(i = 0; i < n; i++)
        {
                printf("%d\t", arr[i]);
        }

	// Initializatins for median sort()
	int* sorted = (int*) malloc(n * sizeof(int)); // Memory alloocation
	int cycount = 0;
	int *cycle = &cycount;

	// Initialize all values to -1
	for(i = 0; i < n; i++)
        {
                sorted[i] = -1;
        }

	// call mediansrt(). *sorted will be pointer to sorted array
	mediansort(n, cycle, arr, sorted);

	// Printing sorted array
	printf("\n\nSorted Array:\n");
	for(i = 0; i < n; i++)
        {
                printf("%d\t", sorted[i]);
        }

	sorted[-1] = -1;

	// Searching: Taking user input
	int searchVal, retVal, retValChop;
	printf("\n-----------------------------------------------------------------------------------------------\n");
	printf("\nSEARCH:\nPlease enter the number to be searched:\n");
	scanf("%d", &searchVal);

	// Calling Normal Search:
	retVal = search(searchVal, n, sorted);
	printf("\nNaive Search:\n\tSearched Index:\t%d\n", retVal);

	// Calling Chop Search:
	retValChop = chopsearch(searchVal, n, sorted, 0, n-1);
	printf("Chop Search:\n\tSearched Index:\t%d\n", retValChop);
	printf("-----------------------------------------------------------------------------------------------\n");

	// Commented the benchmark code since it will take a long time...
	printf("\nCommented the benchmark code since it will take a long time...\n\n");

/*	// Benchmark
	float naivetime;
	printf("\nBenchmark Naive:\n");
	naivetime = benchmark_naive(2000, 10000, 10, 1000000);
	printf("Elapsed time in milliseconds:\t%f\n", naivetime);
	naivetime = benchmark_naive(2000, 10000, 5000, 1000000);
        printf("Elapsed time in milliseconds:\t%f\n", naivetime);
	naivetime = benchmark_naive(2000, 10000, 9000, 1000000);
        printf("Elapsed time in milliseconds:\t%f\n\n", naivetime);

	printf("Benchmark Chop:\n");
        naivetime = benchmark_chop(2000, 10000, 10, 1000000);
        printf("Elapsed time in milliseconds:\t%f\n", naivetime);
        naivetime = benchmark_chop(2000, 10000, 5000, 1000000);
        printf("Elapsed time in milliseconds:\t%f\n", naivetime);
        naivetime = benchmark_chop(2000, 10000, 9000, 1000000);
        printf("Elapsed time in milliseconds:\t%f\n\n", naivetime);
*/
	// Benchmark results from previously executed code
	printf("-----------------------------------------------------------------------------------------------\n");
	printf("Benchmark results from previously executed code:\n");
	printf("Naive Search:\tbenchmark_naive:\n");
	printf("-----------------------------------------------------------------------------------------------\n");
	printf("Parameters: n=2000, max=10000, s=10, mult=1000000\n");
	printf("\t\tElapsed time in milliseconds: 13960568.000000\n\n");
	printf("Parameters: n=2000, max=10000, s=5000, mult=1000000\n");
        printf("\t\tElapsed time in milliseconds: 14033882.000000\n\n");
	printf("Parameters: n=2000, max=10000, s=9000, mult=1000000\n");
        printf("\t\tElapsed time in milliseconds: 14153901.000000\n\n");
	printf("-----------------------------------------------------------------------------------------------\n");
	printf("Chop Search:\tbenchmark_chop:\n");
	printf("-----------------------------------------------------------------------------------------------\n");
	printf("Parameters: n=2000, max=10000, s=10, mult=1000000\n");
        printf("\t\tElapsed time in milliseconds: 13872250.000000\n\n");
        printf("Parameters: n=2000, max=10000, s=5000, mult=1000000\n");
        printf("\t\tElapsed time in milliseconds: 13605529.000000\n\n");
        printf("Parameters: n=2000, max=10000, s=9000, mult=1000000\n");
        printf("\t\tElapsed time in milliseconds: 13956548.000000\n\n");
	printf("-----------------------------------------------------------------------------------------------\n");

	//Comments
	printf("\nComments:\n");
	//
	printf("-----------------------------------------------------------------------------------------------\n");
	printf("* Comments on Elapsed Time:\nOverall, it is expected that chop search (O(log n)) would have better performance than the naive search (O(n)).\nThis is evident from the elapsed time results.\n\nNaive search: As the search element increases from 10 to 5000 and to 9000, the time taken to execute also increases.\nThis is expected since for larger search elements, more number of statements have to be executed.\n\n");
	printf("Chop search: Here, the 5000 case performed better compared to 10 and 9000.\nThis is because, the median was found(or not found) in fewer iterations.\n\n");
	printf("* Time Complexity of sorting:\n\nSince mediansort() is a recursive function, called recursively with decrementing n, the time complexity is linear. O(n).\nBut median sort calls median() every time which has quadratic time complexity O(n^2)(because of 2 nested for loops).\nTherefore, the total time complexity is cubic. O(n * n^2) = O(n^3).\nThe time complexity is the same for best, worst and average cases, since we iterate though all n elements in all the cases.\n\n");
	printf("* Time Complexity of Naive Search:\n\nBest case: In the best case, the first element is the searched element so that the time complexity is O(1).\nWorst case: In the worst case, the last element is the searched element so that the time complexity is O(n).\nAverage case: In the average case, the middle element is the searched element so that the time complexity is O(n/2).\n\n");
	printf("* Time Complexity of Chop Search:\n\nBest case: In the best case, the searched element is same as the random number x so that the time complexity is O(1).\nWorst case: In the worst case, the time complexity is O(log n). This also relies on random number x.\nAverage case: In the average case, the time complexity is O(log n). This also relies on random number x.\n\n");
	printf("-----------------------------------------------------------------------------------------------\n");

	return 0; // Return
}

// randomarray
// Takes number of elements 'n' and maximum 'max' as input.
// Returns pointer to the created random array.
int *randomarray(int n, int max)
{
	int* arr = (int*) malloc(n * sizeof(int)); // Memory allocation

	int i;
	//printf("n:%d\tmax:%d\n", n, max); // Commented debug print

	for(i = 0; i < n; i++) // Loop over for n times
	{
		arr[i] = rand() % (max + 1); // Generate random number as assign to array with approopriate index
	}

	return arr; // Return pointer to array
}

// median
// Takes number of elements n and array pointer *arr as input.
// Returns the median of the array and deletes the number from the array (assigned to -1).
int median(int n, int *arr)
{
	// Initialize required variables
	int i, j, nlow, nhigh, diff, temp, medianVal, rep, medianPosition, pten, ppos;
	nlow = 0; // number of numbers LOWER than the current number
	nhigh = 0; // number of numbers HIGHER than the current number
	rep = 0; // Repititions of the current number
	medianVal = -1;
	medianPosition = -1;
	pten = -1; // Potential median
	ppos = -1; // Potential median position

	for(i=0;i<n;i++) // Loop over all elements of the array
	{
		if(arr[i] != -1) // If the current element is not -1
		{
			temp = arr[i]; // Assign current element to temp

			// Calculating nlow, nhigh and repititions of each element
			for(j=0;j<n;j++) // Loop over all elements of the arrayas j
			{
				if(i!=j) // If we have unequal indices, so that we do no consider same elements for nlow and nhigh
				{
					if(arr[j] < temp) nlow++; // Increment nlow
					if(arr[j] > temp) nhigh++; // Increment nhigh
				}
				if(arr[i] == arr[j]) rep++; // If same values are found, increment rep
			}
			//printf("%d\t%d\n", nlow, nhigh); // Commented debug print

			// Calculating difference of nlow and nhigh as positive 'diff'
			if(nlow - nhigh < 0) // If nhigh is higer than nlow
			{
				diff = nhigh - nlow; // take difference
			}
			else // // If nlow is higer than nhigh
			{
				diff = nlow - nhigh; // take difference
			}


			if(n % 2 == 1) // If n is odd
			{
				if(nlow == nhigh) // If equal number of nlow and nhigh, this is our median for sure
				{
					medianVal = arr[i]; // Assign current element to medianVal
					medianPosition = i; // Assign i to medianPosition
					goto label; // Go to label for deletion of this element from the array
				}
				if(diff < rep) // If diff between nlow and nhigh is less than number of repititions
				{
					medianVal = arr[i]; // Assign current element to medianVal
					medianPosition = i; // Assign i to medianPosition
				}
			}
			else // If n is even
			{
				if(diff <= rep) // If diff between nlow and nhigh is less than/equal to number of repititions
				{
					if(nlow <= nhigh) // If nlow is less than / equal to nhigh
					{
						medianVal = arr[i]; // Assign current element to medianVal
						medianPosition = i; // Assign i to medianPosition
					}
					else // Else we hava potential median
					{
						pten = arr[i]; // Assign current element to pten
						ppos = i; // Assign i to ppos
					}
				}
			}

			//printf("\t\tdiff:\t%d\trep:%d\tdiff-rep:%d\tpten:%d\n\n", diff, rep, diff-rep, pten); // Commented debug print

			// Assign all variables to 0 for next iteration
			nlow = 0;
			nhigh = 0;
			rep = 0;
		}
	}

	// If we do nt have median by now, potential meian is the actual median
	if(medianVal == -1)
	{
		medianVal = pten;
		medianPosition = ppos;
	}

	// At the end, we will delete the median from the array
	label:for(i=medianPosition;i<n-1;i++) // Looping from median position to end
        {
		arr[i] = arr[i+1]; // Shift the elements to left
	}
	arr[n-1] = -1; // Assign last element to -1

	return medianVal; // Return -1
}
// mediansort
// Takes number of elements n, pointer cycle, pointer to original array *arr, pointer to sorted array *sorted.
// Sorts the array recursively *sorted
void mediansort(int n, int *cycle, int *arr, int *sorted)
{
	if(n==0) // If no more elements to sort, return
		return;

	//printf("\nCycle: %d\tn:%d\t", *cycle, n); // Commented debug print

	// Declare required variables
	int currentMedian, pos, i;

	currentMedian = median(n, arr); // Compute the median of the array *arr

	if(n % 2 == 1) // If n is odd
        {
                pos = (n / 2) + 1; // Compute position pos as n/2 +1
	}
	else // If n is even
	{
		pos = (n / 2); // Compute position pos as n/2
	}

	i = pos; // Assign pos to i
	if(sorted[pos-1] == -1) // If we have an empty place in the array in positin pos
        {
                sorted[pos-1] = currentMedian; // Fill the position with current median
        }
        else // Current position is not empty
        {
                while(sorted[i] != -1) // Look for next empty places
                {       
                        i++;
                }
                sorted[i] = currentMedian; // Place current median in empty position
        }
	sorted[-1] = -1;
/*
	printf("Unsorted:\t");
        for(i = 0; i < *cycle+n; i++)
        {
                printf("%d\t", arr[i]);
        }
        printf("\n");

        printf("Sorted:\t\t");
        for(i = 0; i < *cycle+n; i++)
        {
                printf("%d\t", sorted[i]);
        }
        printf("\n");
*/
	++*cycle; // Increment cycle pointer

	mediansort(n-1, cycle, arr, sorted); // Recursively call mediansort() with decremented 'n'
}

// search
// Takes search number i, number of elements n and array pointer *arr as input.
// Returns the index of the searched element. -1 if not found.
int search(int i, int n, int *arr)
{
	int j;

	for(j=0;j<n;j++) // Looping over all elements
	{
		if(i == arr[j]) return j; // If element is found, return index
		if(i < arr[j]) return -1; // If we are past the element and element is not found, return -1
	}

	return -1; // Return -1 if not found
}

// chopsearch
// Takes search number i, number of elements n, array pointer *arr, amin and amax  as input.
int chopsearch(int i, int n, int *arr, int amin, int amax)
{
	if(i > arr[amax] || i < arr[amin]) return -1; // If search number is below least and above highest, return -1

	if(amax >= amin) // If we have some numbers between amax and amin
	{
		int x;
		x = (rand() % (amax - amin + 1)) + amin; // Generate a random number between amin and amax

		//printf("--X--%d\tarr[x]:%d\tamin:%d\tamax:%d\n", x, arr[x], amin, amax);

		if(i == arr[x]) // If element is found, we need to go left for possible numbers of same values
		{
			while(1) // Looping indefinitely
			{
				if(i==arr[x-1]) // If same number is found with lesser index, decrement x by 1 and check again
					x--;
				else // Else, return the current number
					return x;
			}
		}

		if(i < arr[x]) // If search number is lesser, recursively call the function with new amax and amin
		{
			return chopsearch(i, n, arr, amin, x-1); // amax is x-1
		}
		if(i > arr[x]) // If search number is higher, recursively call the function with new amax and amin
		{
			return chopsearch(i, n, arr, x+1, n-1); // amin is x+1
		}
	}
	return -1; // Return -1
}

// benchmark_naive
// Takes number of elements n, maximum max, search element s and multiples mult as input.
// Returns time taken as float.
float benchmark_naive(int n, int max, int s, int mult)
{
	// Declare required variables
	struct timeval t0;
   	struct timeval t1;
   	float elapsed;

   	gettimeofday(&t0, 0); // Get current time of day

	// Declarations for median sorting
	int i, j, searchIndex;
	int* sorted = (int*) malloc(n * sizeof(int));
       	int cycount = 0;
       	int *cycle = &cycount;

	for(i=0;i<mult;i++) // Loop mult number of times
	{
		if(i%1000 == 0) // For every 1000 iterations of mult
		{
        		printf("I:%d\n", i); // Printing i
			int *arr = randomarray(n, max); // Generate random array

			for(j = 0; j < n; j++) // Initialize all sorted array elements to 0
        		{
        		        sorted[j] = -1;
        		}

        		mediansort(n, cycle, arr, sorted); // Sort the elements in sorted
		}
		searchIndex = search(s, n, sorted); // Search the s element in sorted array with normal search
	}

	gettimeofday(&t1, 0); // Get current time of day
  	elapsed = (t1.tv_sec - t0.tv_sec) * 1000.0f + (t1.tv_usec - t0.tv_usec) / 1000.0f; // Calculate time difference

	free(sorted); // Free memory of sorted array

	return elapsed; // Return elapsed time
}

// benchmark_chop
// Takes number of elements n, maximum max, search element s and multiples mult as input.
// Returns time taken as float.
float benchmark_chop(int n, int max, int s, int mult)
{
	// Declare required variables
        struct timeval t0;
        struct timeval t1;
        float elapsed;

        gettimeofday(&t0, 0); // Get current time of day

	// Declarations for median sorting
        int i, j, searchIndex;
        int* sorted = (int*) malloc(n * sizeof(int));
        int cycount = 0;
        int *cycle = &cycount;

        for(i=0;i<mult;i++) // Loop mult number of times
        {
                if(i%1000 == 0) // For every 1000 iterations of mult
                {
			printf("I:%d\n", i); // Printing i
                        int *arr = randomarray(n, max); // Generate random array

                        for(j = 0; j < n; j++) // Initialize all sorted array elements to 0
                        {
                                sorted[j] = -1;
                        }

                        mediansort(n, cycle, arr, sorted); // Sort the elements in sorted
		}
                searchIndex = chopsearch(s, n, sorted, 0, n-1); // Search the s element in sorted array with chop search
        }

        gettimeofday(&t1, 0); // Get current time of day
        elapsed = (t1.tv_sec - t0.tv_sec) * 1000.0f + (t1.tv_usec - t0.tv_usec) / 1000.0f; // Calculate time difference

        free(sorted); // Free memory of sorted array

        return elapsed; // Return elapsed time
}

```
