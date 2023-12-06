function tsp_ls(distance_matrix) {
    path = []
    for(i = 0; i < distance_matrix.length; i++)
    {
        path.push(i)
    }
    shuffleArray(path)



}

function twoOptSwap(route, i, k)
{
    temp = route.splice(i, k)
    route.splice(i, 0, temp.reverse())
    console.log(route)
    route = route.flat(Infinity)
    console.log(route)
}

/*
2optSwap(route, i, k)
  cities 1 to i-1 stay in the order they are
  cities i to k are reversed
  cities k + 1 to n stay in the order they are*/


// Array shuffler, for random starting array
/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
arr = [0,1,2,3,4,5,6]
twoOptSwap(arr, 2, 4)
//arr = arr.flat()
console.log(arr)