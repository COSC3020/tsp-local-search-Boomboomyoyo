[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=13090474&assignment_repo_type=AssignmentRepo)
# Traveling Salesperson Problem -- Local Search

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The 2-opt algorithm for solving the Traveling Salesperson Problem is a
randomized local search algorithm that, at each iteration, reverses part of the
route. It starts with a random route (this is the randomized part), and changes
part of the route in each step (this is the local search part, sprinkled with
more randomness). The pseudocode for one iteration is as follows:

```javascript
2optSwap(route, i, k)
  cities 1 to i-1 stay in the order they are
  cities i to k are reversed
  cities k + 1 to n stay in the order they are
```

For example, if I call the above function with route A--B--C--D--E--F, $i=2$,
$k=4$, the resulting route is A--B--E--D--C--F.

The algorithm starts with a random route; if the new route at the end of an
iteration decreases the total length, it is retained as the current incumbent.
The incumbent after the final iteration is returned as the solution.

Implement the 2-opt algorithm, which repeatedly runs the above steps. Your
implementation needs to fix two design parameters that I have left open. First,
you need to design a stopping criterion -- when would it make sense to stop and
return the shortest route found so far rather than trying another iteration?
Second, design a way to choose $i$ and $k$ -- note that they need to be
different in subsequent iterations, as one iteration would simply undo what
the previous one did otherwise. Start with the template I provided in `code.js`.
Describe in your code how you designed your stopping criterion and ways of
choosing $i$ and $k$ and why.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.


# Response
Got this done now, I think. Conferring with classmates, I settled on my ending condition being to run the randomized path portion of the algorithm a number of times related to the size of the input. I tested values from $|V|^2$ to $|V|^9$, and the algorithm didn't seem to got a relatively better answer with acceptable runtime up to input size 37. I generated weights on my graphs of between 2-8, so the average path length would be about 5. It would be a little more because the the two is three times as heavily weighted as the other numbers, as I'm actually taking a random number from 0-8, and taking a minimum value of 2. I then ran it using the jsverify framework for random input sizes, and compared if the algorithm was getting a better than average path length of 5 times input size. This was a very rough way to do this, but it gave me a general idea. There were small improvements for each power of the input I ran the randomization scheme, and I felt $|V|^4$ ran in a reasonable amount of time, and gave decent benefits, with many of the estimates being about three-quarters the size of the rough average of 5 times graph length. That is what I chose as my final termination condition.

To randomize the indexes being shuffled, I simply picked two random indexes using Math.floor(Math.random() * pathLength), which gives a number ranging from zero to the pathLength, which works perfectly for an index.
## Runtime Analysis
The steps of my implementation are as follows:

1. Create an ordered path from 1 to $|V|$. Takes $|V|$ time.
2. Randomize ordered path, using an implementation of the Durstenfeld Shuffle, which has a linear complexity of $|V|$.
3. Then, for the remainder of the algorithm is in a for loop that runs $|V|^4$ times.
4. Run a two randomizations for the indexes, each of which is constant time.
5. Run array.splice() from one index to the next, which is runtime complexity of up to $O(|V|)$, if the whole list is spliced out.
6. Run array.reverse() for the spliced array, which is runtime complexity of up to $O(|V|)$, if the whole list is spliced out.
7. Run array.splice() from one index to the next, which is runtime complexity of up to $O(|V|)$, if the whole list is spliced out.
8. Go through the path and sum up its value using sumDistance, which is runtime complexity of $\Theta(|V|)$.

So, the overall complexity is ${|V|}^4 * 3O(|V|)+ \Theta(|V|) = O(|V|^5)$

## References
Grabbed a quick array shuffler algorithm from here for the starting path
https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
User profile of contributor:
https://stackoverflow.com/users/8112776/ashleedawg

Classmates, including Justin, Cade, and Clayton, and a few others I don't know the names of