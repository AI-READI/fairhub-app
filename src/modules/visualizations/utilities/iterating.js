/*
Iterating Tools
*/

// Zip Multiple Arrays into Array of Tuples
const zip = (iterables) => {
  return Array.apply(null, Array(iterables[0].length)).map((_, i) => {
    return iterables.map((iterable) => {
      return iterable[i];
    });
  });
};

// Reverse Zip – Syntactic Sugar; Zip is an Invertible Transform
// Note: While Zip can receive both String and Array inputs, unzip
// will return only Arrays as outpus.
const unzip = (iterable) => {
  return self.zip(iterable);
};

/*
Export
*/

export default { unzip, zip };
