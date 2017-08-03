//https://codereview.stackexchange.com/questions/26125/getting-all-number-from-a-string-like-this-1-2-5-9

var getNumbers = (function () {

    //we create a closure so as not to expose some of our utility functions

    function isNumber(n) {
        //we check isFinite first since it will weed out most of the non-numbers
        //like mixed numbers and strings, which parseFloat happily accepts
        return isFinite(n) && !isNaN(parseFloat(n));
    }

    //let's get this one out as well
    //the simple sort() wouldn't work so instead we provide a sorter
    function sorterFunction(a, b) {
        return a - b;
    }

    //getNumbers should be this function
    return function (stringNumbers) {

        //variable declaration format is personal preference
        //but I prefer having declarations with assignments have individual vars
        //while those that have no assignments as comma separated
        var i, range, low, high, entry;

        //an added bonus, " and ' are the same in JS, but order still applies
        //I prefer to use ' since it's cleaner
        var entries = stringNumbers.split(','); 
        var length = entries.length;
        var nums = [];

        for (i = 0; i < length; ++i) {
            entry = entries[i];

            if (isNumber(entry)) {
                //we check if the entry itself is a number. If it is, then we push it directly.
                //an additinal advantage is that negative numbers are valid
                nums.push(+entry);
            } else {

                //if not a number, probably it had the - and not being a negative number
                //only here do we split after we determined that the entry isn't a number
                range = entry.split('-');

                //check if what we split are both numbers, else skip
                if (!isNumber(range[0]) || !isNumber(range[1])) continue;

                //force both to be numbers
                low = +range[0];
                high = +range[1];

                //since we are dealing with numbers, we could do an XOR swap
                //which is a swap that doesn't need a third variable
                //http://en.wikipedia.org/wiki/XOR_swap_algorithm
                if (high < low) {
                    low = low ^ high;
                    high = low ^ high;
                    low = low ^ high;
                }

                //from low, we push up to high
                while (low <= high) {
                    nums.push(low++);
                }
            }
        }
        return nums.sort(sorterFunction);
    }
}());