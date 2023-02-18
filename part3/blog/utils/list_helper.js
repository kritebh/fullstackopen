const dummy = (blogs)=>{
    return 1
}

const totalLikes = (blogs)=>{
    return blogs.reduce((acc,b)=>{
        return acc+=b.likes
    },0)

}

const favoriteBlog = (blogs)=>{
    let result=blogs[0];

    blogs.forEach((b)=>{
        if(b.likes>result.likes){
            result = {...b};
        }
    })
    return result
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}