const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, b) => {
    return (acc += b.likes);
  }, 0);
};

const favoriteBlog = (blogs) => {
  let result = blogs[0];

  blogs.forEach((b) => {
    if (b.likes > result.likes) {
      result = { ...b };
    }
  });
  return result;
};

const mostBlogs = (blogs) => {
  let res = blogs.reduce((acc, b) => {
    let key = b.author;
    if (acc.hasOwnProperty(key)) {
      acc[key] = ++acc[key];
    } else {
      acc[key] = 1;
    }
    return acc
  }, {});

  let most = {
    author:"",
    blogs:0
  }

  for(author in res){
    if(res[author]>most.blogs){
        most.author = author
        most.blogs = res[author]
    }
  }

  return most;
};


const mostLikes = (blogs)=>{
    let allAuthAndLike = blogs.reduce((acc,curr)=>{
          
        if(acc[curr.author]){
            acc[curr.author] += curr.likes 
        }   
        else{
            acc[curr.author] = curr.likes
        }

        return acc
    },{})


    let res = {
        author:"",
        likes:0
    }

    for(author in allAuthAndLike){
        if(allAuthAndLike[author]>res.likes){
            res.author = author
            res.likes = allAuthAndLike[author]
        }
    }

    return res
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
