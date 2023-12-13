const fs = require('fs');
const jsc = require('jsverify');
const assert = require('assert');

eval(fs.readFileSync('code.js')+'');
temp = Infinity


dm = [[]];
temp = tsp_ls(dm)
//console.log(temp)
assert(temp == 0);

dm = [[0]];
temp = tsp_ls(dm)
//console.log(temp)
assert(temp == 0);

dm = [[0,0,0],
      [0,0,0],
      [0,0,0]];
      temp = tsp_ls(dm)
      //console.log(temp)
assert(temp == 0);

dm = [[0,1,2],
      [1,0,2],
      [2,2,0]];
      temp = tsp_ls(dm)
      //console.log(temp)
assert(temp >= 3);

// https://people.sc.fsu.edu/~jburkardt/datasets/tsp/tsp.html
dm = [[0,3,4,2,7],
      [3,0,4,6,3],
      [4,4,0,5,8],
      [2,6,5,0,6],
      [7,3,8,6,0]];
      temp = tsp_ls(dm)
      //console.log(temp)
assert(temp >= 13);

/*
const test =
    jsc.forall("nat", function(int) {
      graphSize = Math.min(25, int)
      graph = connectedGraph(Math.max(graphSize, 2))
      for(let i = 0; i < graph.length; i++)
      {
      for(let j = 0; j < graph.length; j++)
      {
            if(graph[i][j] == 0)
            {
                  graph[i][j] = 1
            }
            if(graph[i][j] == 1)
            {
                  let weight = Math.max(Math.floor(Math.random()*9),2)
                  graph[i][j] = weight
                  graph[j][i] = weight
            }
      }
      }
      console.log("Test Session: " + graph.length)
      //console.log(graph)
      tempy = tsp_ls(graph)
      console.log(tempy)
      return true
    });
jsc.assert(test, { tests: 10 });
*/


function connectedGraph(v)
{
    graph = []
    for(i=0; i < v; i++)
    {
        graph.push([])
        for(j=0; j < v; j++)
        {
            graph[i].push(0)
        }
    }
    edges = Math.max(Math.floor(v*(Math.random()*(v))),v-1)
    return connectedGraph2(v, edges, graph)
}

function connectedGraph2(v, e, graph, connectedNodes = [0])
{
    while(e > v-connectedNodes.length)
    {
        n1 = randomElementRange(connectedNodes.length)
        n1 = connectedNodes[n1]
        n2 = randomElementRange(v)
        unplaced = true
        while(unplaced)
        {
            if(graph[n1][n2] == 0)
            {
                graph[n1][n2] = 1
                e -=1    
                if(!connectedNodes.includes(n2))
                {
                    connectedNodes.push(n2)
                }
                unplaced = false
            } else if(n2 < graph[n1].length)
            {
                n2 += 1
            } else if(n2 >= graph[n1].length-1)
            {
                if(n1 == graph.length - 1)
                {
                    n1 = 0
                    n2 = 0
                } else
                {
                    n2 = 0
                    n1 += 1
                }
            }
        }
    }
    if(e > 0)
    {
        for(i = 0; i < v; i++)
        {
            if(!connectedNodes.includes(i))
            {
                n1 = Math.max(Math.floor(Math.random()*(connectedNodes.length))-1,0)
                n1 = connectedNodes[n1]
                graph[n1][i] = 1
                e -= 1
                connectedNodes.push(i)
            }   
        }
    }
    return graph
}

function randomElementRange(n) 
{
    return Math.floor(Math.random()*n)
}